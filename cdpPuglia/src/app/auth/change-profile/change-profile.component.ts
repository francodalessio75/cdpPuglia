import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent {
  model:any = {};
  loggedIn : boolean = false;

  constructor(
    private accountService : AccountService,
    private toastr:ToastrService) { }


  changeProfile(){
    // this.accountService.login(this.model).subscribe(response => {
    //   console.log(response);
    //   this.router.navigateByUrl('/threats')
    //   this.loggedIn = true;
    // },
    //  error => {
    //    console.log(error);
    //    this.toastr.error("Autenticazione Fallita");
    //  });
    console.log(this.model);
  }
}
