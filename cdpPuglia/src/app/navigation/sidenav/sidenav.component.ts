import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';

interface MenuItem {
  name: string;
  icon?: string;
  children?: MenuItem[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icon?: string;
}
const TREE_DATA: MenuItem[] = [
  { name:'Dashboard',
  icon:'dashboard_customize',
  children: [{name:'Configure Dashboard'}]
},
  { name:'Threats',
    icon: 'flash_on'}, 
  {name:'Administration'},
  { name:'Network Group and Assets',
icon:'people_outline'}, 
  {name:'Network Addresses',
icon:'dns'},
  {name:'System C&C',
  icon:'compass_calibration'
},
  {name:'External Servicies'},
  {name:'Technical Configuration'},
  {name:'IDS/IPS'},
  {name:'User Administration'},
  {name:'System C&C'},
  {name:'Activity Tracking',
  children: [{name:'figlio1'}]},
];
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  activeNode:any;
  private _transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
    
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,   
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
