import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  user:User = {};
  title='';
  description='';

  constructor(public accountService:AccountService, public headerService:HeaderService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    );
    this.headerService.titleDescription$.subscribe(
      ({title, description }) => {
        this.title = title;
        this.description = description;
      }
    )
  }

  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  logout(){
    this.accountService.logout();
  }
}
