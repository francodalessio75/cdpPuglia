import { Injectable, OnInit } from '@angular/core'
import {  HttpClient } from '@angular/common/http';
import {   map } from 'rxjs/operators';
import { User } from '../_models/user';
import {  ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from '../enums/UserRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit{

  //baseUrl = 'http://127.0.0.1:5000/';
  baseUrl = 'http://localhost:5000/';

  private user!:User; 

  private currentUserSource = new ReplaySubject<User>(1);
  /* used by authguard */
  currentUser$ = this.currentUserSource.asObservable();

  constructor( 
    private http:HttpClient, 
    private router:Router) {}

  ngOnInit(){
  }

  getToken$(user:User){
    return this.http.post<{token:string}>(this.baseUrl + 'login',{ username:user.username,password:user.password})
      .pipe(
        map( tokenData => {
          if(tokenData){
            this.user = {username:'',password:''};
            this.user.username = user.username;
            this.user.password = user.password;
            this.user.token = tokenData.token;
            this.setCurrentUser(this.user);
            this.currentUserSource.next(this.user);
          }
        })
      );
  }

  getRole$(){ 
    return this.http.get<{role:string,user:string}>(this.baseUrl + 'user')
      .pipe(
        map( userData => {
          if(userData){
            this.user.role = this.checkRole(userData.role);
            this.setCurrentUser(this.user);
            this.currentUserSource.next(this.user);
          }
        }
      )
    )
  }

  private checkRole(roleString:string):UserRole{
    switch (roleString){
      case 'viewer':
        return UserRole.viewer;
        break;
      case 'admin':
        return UserRole.admin;
        break;
      default:
        return UserRole.viewer;
    }
  }

changePassword$(currentPassword: string, newPassword: string, repeatPassword: string){ 
  return this.http.put<{message:string,messageId:string}>(this.baseUrl + 'user/update-password', 
  {
    currentPassword: currentPassword,
    newPassword: newPassword,
    repeatPassword: repeatPassword
  })
    .pipe(
      map( responseMessage => {
        if(responseMessage){
          console.log(responseMessage)
        }
      })
    )
  }

  changeProfile$(email: string){ 
    return this.http.put<{message:string,messageId:string}>(this.baseUrl + 'user', 
    {
      email: email
    })
      .pipe(
        map( responseMessage => {
          if(responseMessage){
            console.log(responseMessage)
          }
        })
      )
    }

  setCurrentUser( user:User ){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(this.user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.router.navigateByUrl('login');
  }
}
