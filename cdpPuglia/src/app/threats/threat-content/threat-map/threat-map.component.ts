import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/_models/threat';
import { ThreatsService } from 'src/app/_services/threats.service';
import * as am5 from "@amcharts/amcharts5/index";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

@Component({
  selector: 'app-threat-map',
  templateUrl: './threat-map.component.html',
  styleUrls: ['./threat-map.component.css']
})
export class ThreatMapComponent implements OnInit {
  ipSrcLatitude!:  number | undefined;
  ipSrcLongitude!: number | undefined;
  ipDstLatitude!:  number | undefined;
  ipDstLongitude!: number | undefined;
  //const root! :am5.Root | undefined;
  
  @Input() threat!: Threat;
  
  constructor(
    private threatsService: ThreatsService,
  ) {
      this.threatsService.currentThreat$.subscribe(threat => {
      this.threat=threat;
      this.ipSrcLatitude=threat.ipSrcLatitude;
      this.ipSrcLongitude=threat.ipSrcLongitude;
      this.ipDstLatitude=threat.ipDstLatitude;
      this.ipDstLongitude=threat.ipDstLongitude;
    });
    
   }
   ngAfterViewInit(){
   
   }
  ngOnInit(): void {
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
      interactive: true
    });
    
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935)
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
  strokeOpacity: 0.3
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
    let planeDataItem = planeSeries.pushDataItem({
      lineDataItem: lineDataItem,
      positionOnLine: 0,
      autoRotate: true
    });
    arrowSeries.pushDataItem({
      lineDataItem: lineDataItem,
      positionOnLine: 0.5,
      autoRotate: true
    });
    arrowSeries.pushDataItem({
      lineDataItem: lineDataItem2,
      positionOnLine: 0.9,
      autoRotate: true
    });
    planeDataItem.animate({
      key: "positionOnLine",
      from:0,
      to: 1,
      duration: 10000,
      loops: Infinity,
      easing: am5.ease.yoyo(am5.ease.linear)
    });
    planeDataItem.on("positionOnLine", function(value) {
      if (<number>value >= 0.99) {
        arrow1.set("stateAnimationDuration",1)
      } else if (<number>value <= 0.01) {
        arrow1.set("rotation", 0);
      }
    
    });
    // Create line series
//     let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
// lineSeries.mapLines.template.setAll({
//   stroke: root.interfaceColors.get("alternativeBackground"),
//   strokeOpacity: 0.3
// });
    
    // let route=lineSeries.pushDataItem({
    //   pointsToConnect: [london, london2]
    // });
      
//     lineSeries.mapLines.template.setAll({
//       stroke: am5.color(0xffba00),
//       strokeWidth: 2,
//       strokeOpacity: 1
//     });
//     pointSeries.bullets.push(function() {
//       return am5.Bullet.new(root, {
//         sprite: am5.Circle.new(root, {
//           radius: 5,
//           fill: am5.color(0xff0000)
//         })
//       });
//     });
//     pointSeries.bullets.push(function() {
//       var container = am5.Container.new(root, {});
//       container.children.push(am5.Graphics.new(root, {
//         svgPath: "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
//         scale: 0.06,
//         centerY: am5.p50,
//         centerX: am5.p50,
//         fill: am5.color(0x000000)
//       }));
//       return am5.Bullet.new(root, { sprite: container });
//     });

chart.appear(1000, 100);
    
    // var plane = pointSeries.pushDataItem({
    //   lineDataItem: route,
    //   positionOnLine: 0.7,
    //   autoRotate: true
    // });
  }
}
