import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/UserRoleEnum';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  role!:UserRole;

  menuItems:string[] = ['dashboard', 'sales', 'orders', 'customers', 'products'];

  constructor(
    private accountService:AccountService
  ) {
    this.accountService.currentUser$.subscribe(
      user => this.role = user.role!
    )
   }

  ngOnInit(){
    this.role = this.accountService.getCurrentUser().role!;
  }

}
