import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/UserRoleEnum';
import { AccountService } from 'src/app/_services/account.service';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';

interface MenuItem {
  name: string;
  icon?: string;
  link?:string;
  children?: MenuItem[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icon?: string;
}
const TREE_DATA: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: 'dashboard_customize',
    children: [{ name: 'Configure Dashboard' }],
  },
  { name: 'Threats', icon: 'flash_on' },
  { name: 'Administration' },
  { name: 'Network Group and Assets', icon: 'people_outline' },
  { name: 'Network Addresses', icon: 'dns' },
  { name: 'System C&C', icon: 'compass_calibration' },
  { name: 'External Servicies' },
  { name: 'Technical Configuration' },
  { name: 'IDS/IPS' },
  { name: 'User Administration' },
  { name: 'System C&C' },
  { name: 'Activity Tracking', children: [{ name: 'figlio1' }] },
];
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  activeNode: any;
  role!: String;

  private _transformer = (node: MenuItem, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private accountService:AccountService
  ) {
    this.accountService.currentUser$.subscribe(
      user => this.role = user.role!
    );
    this.dataSource.data = TREE_DATA;
   }

  ngOnInit(){
    this.role = this.accountService.getCurrentUser().role!;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
