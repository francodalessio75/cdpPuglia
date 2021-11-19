import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  user!:User;
  
  constructor(
    private accountService:AccountService
  ) {
    this.accountService.currentUser$.subscribe(
      user => this.user = user 
    );
   }

  ngOnInit(): void {
  }

  onClose(){
    this.closeSideNav.emit();
  }

}
