import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  user:User = {};

  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    )
  }

  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  logout(){
    this.accountService.logout();
  }
}
