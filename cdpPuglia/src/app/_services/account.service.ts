import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from '../enums/UserRoleEnum';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://127.0.0.1:5000/';
  //baseUrl = 'http://localhost:5000/';

  private user!: User;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getToken$(user: User) {
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
     // #region   JUST IN CASE OF MIDDLEWARE NOT WOKING
    // this.user = { username: '', password: '' };
    // this.user.username = 'admin';
    // this.user.password = 'adminadmin';
    // this.user.token =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzNzkzOTY2NiwianRpIjoiNjI5MWJjM2YtODdmZi00NzY2LTllOWMtN2IyNTdmNmZjMTAwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0sIm5iZiI6MTYzNzkzOTY2NiwiZXhwIjoxNjY5NDc1NjY2fQ.R7yTVONWEEr4-VoBvECUBWF8BkNZPjrESUswEj-FRpI';
    // this.setCurrentUser(this.user);
    // this.currentUserSource.next(this.user);
    // // return new Observable<{ token: string }>();
    // #endregion
  }

  getRole$() {
    return this.http.get<{role:string,user:string}>(this.baseUrl + 'user')
      .pipe(
        map( userData => {

          if(userData){

            if(userData.role)
              this.user.role = userData.role as UserRole;

            this.setCurrentUser(this.user);

            this.currentUserSource.next(this.user);

          }
        }
      )
    )

    /*  #region JUST IN CASE OF MIDDLEWARE NOT WOKING */
    // this.user.role = this.checkRole('admin');
    // this.setCurrentUser(this.user);
    // this.currentUserSource.next(this.user);
    /* #endregion */
  }

  getCurrentUser(): User {
    return this.user;
  }

  changePassword$(
    currentPassword: string,
    newPassword: string,
    repeatPassword: string
  ) {
    return this.http
      .put<{ message: string; messageId: string }>(
        this.baseUrl + 'user/update-password',
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          repeatPassword: repeatPassword,
        }
      )
      .pipe(
        map((responseMessage) => {
          if (responseMessage) {
            console.log(responseMessage);
          }
        })
      );
  }

  changeProfile$(email: string) {
    return this.http
      .put<{ message: string; messageId: string }>(this.baseUrl + 'user', {
        email: email,
      })
      .pipe(
        map((responseMessage) => {
          if (responseMessage) {
            console.log(responseMessage);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(this.user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.router.navigateByUrl('login');
  }
}
