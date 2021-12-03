import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import * as am5 from "@amcharts/amcharts5/index";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { TranslationService } from 'src/app/_services/translation.service';
import { Translatable } from 'src/app/interfaces/translatable';
import { LanguageData } from 'src/app/_models/languageData';

@Component({
  selector: 'app-threat-map',
  templateUrl: './threat-map.component.html',
  styleUrls: ['./threat-map.component.css']
})
export class ThreatMapComponent implements OnInit, Translatable {
  ipSrcLatitude!:  number | undefined;
  ipSrcLongitude!: number | undefined;
  ipDstLatitude!:  number | undefined;
  ipDstLongitude!: number | undefined;
  //const root! :am5.Root | undefined;
  
  @Input() threat!: Threat;

  languageData!:LanguageData;
  
  constructor(
    private threatsService: ThreatsService,
    private translationService:TranslationService
  ) {
      this.threatsService.currentThreat$.subscribe(threat => {
      this.threat=threat;
      this.ipSrcLatitude=threat.ipSrcLatitude;
      this.ipSrcLongitude=threat.ipSrcLongitude;
      this.ipDstLatitude=threat.ipDstLatitude;
      this.ipDstLongitude=threat.ipDstLongitude;
      this.translationService.currentLanguage$.subscribe((language)=>{
        this.languageData = this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);
      });
    });
    
   }
  
  ngOnInit(): void {

    this.languageData = this.translationService.getCurrentLanguageData();
        this.setLanguageData(this.languageData);

    console.log(this.threat);
    var root = am5.Root.new("chartdiv"); 

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        homeGeoPoint: { latitude: 2, longitude: 2 }
       // projection: am5map.geoNaturalEarth1()
      })
    );
    
    
    // Create polygon series
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xffffff),
      stroke: am5.color(0x000000),
      strokeWidth : 0.3
    });
    
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x1111)
    });
    
    // Create point series
    var pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );
    
    pointSeries.bullets.push(function() {
      let circle = am5.Circle.new(root, {
        radius: 7,
        tooltipY: 0,
        fill: am5.color(0xffba00),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
        tooltipText: "latitude: {latitude}\nlongitude: {longitude}"
      });
    
      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.9
});
var arrowSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);
let arrow1 = am5.Graphics.new(root, {
  fill: am5.color(0x000000),
  stroke: am5.color(0x000000),
  draw: function (display) {
    display.moveTo(0, -3);
    display.lineTo(8, 0);
    display.lineTo(0, 3);
    display.lineTo(0, -3);
  }});
arrowSeries.bullets.push(function(){
  let arrow = am5.Graphics.new(root, {
    fill: am5.color(0x000000),
    stroke: am5.color(0x000000),
    draw: function (display) {
      display.moveTo(0, -3);
      display.lineTo(8, 0);
      display.lineTo(0, 3);
      display.lineTo(0, -3);
    }
  });
  return am5.Bullet.new(root, {
    sprite: arrow
  });
});

    var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
    var london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
    var london2 = pointSeries.pushDataItem({ latitude: 50.470020, longitude: -1.454296 });
    var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });
    var src = pointSeries.pushDataItem({ latitude: this.ipSrcLatitude, longitude: this.ipSrcLongitude });
    var dst = pointSeries.pushDataItem({ latitude: this.ipDstLatitude, longitude: this.ipDstLongitude });
    let lineDataItem2 = lineSeries.pushDataItem({
      pointsToConnect: [dst,nyc]
    });
    let lineDataItem = lineSeries.pushDataItem({
      pointsToConnect: [london,beijing]
    });
    
    let planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    let plane = am5.Graphics.new(root, {
      svgPath:
        "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
      scale: 0.06,
      centerY: am5.p50,
      centerX: am5.p50,
      fill: am5.color(0x000000)
    });
    planeSeries.bullets.push(function() {
      let container = am5.Container.new(root, {});
      container.children.push(arrow1);
      return am5.Bullet.new(root, { sprite: container });
    });
    
    arrowSeries.pushDataItem({
      lineDataItem: lineDataItem,
      positionOnLine: 0.5,
      autoRotate: true
    });
    arrowSeries.pushDataItem({
      lineDataItem: lineDataItem2,
      positionOnLine: 0.5,
      autoRotate: true
    });
   
    
chart.appear(1000, 100);
    
    // var plane = pointSeries.pushDataItem({
    //   lineDataItem: route,
    //   positionOnLine: 0.7,
    //   autoRotate: true
    // });
  }

  setLanguageData(languageData:LanguageData){
    
  }
}