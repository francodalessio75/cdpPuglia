import { Injectable } from '@angular/core'
import {  HttpClient } from '@angular/common/http';
import {  concatMap, map } from 'rxjs/operators';
import { User } from '../_models/user';
import { of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://127.0.0.1:5000/';

  private user:User = {
    role:'viewer'
  };

  private currentUserSource = new ReplaySubject<User>(1);

  /* used by authguard */
  currentUser$ = this.currentUserSource.asObservable();

  constructor( private http:HttpClient, private router:Router) { }

  getToken$(model:{username:string, password:string}){
    return this.http.post<{token:string}>(this.baseUrl + 'login',{ username:model.username,password:model.password})
      .pipe(
        map( tokenData => {
          if(tokenData){
            this.user.username = model.username;
            this.user.password = model.password;
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
              this.user.role = userData.role;
              this.setCurrentUser(this.user);
              this.currentUserSource.next(this.user);
            }
          })
        )
    }

    login(model:{username:string, password:string}){
      this.user.username = model.username; 
      this.user.password = model.password; 
      return this.getToken$(model);
    }

    getRole(){
      return this.getRole$();
    }

  // login( model:any){
  //   return this.http.post<{token:string}>(this.baseUrl + 'login', model)
  //     .pipe(
  //       map( token  => {
  //         if(token){
  //           this.user.username = model.username;
  //           this.user.password = model.password;
  //           this.user.token = token.token;
  //           this.setCurrentUser(this.user);
  //           this.currentUserSource.next(this.user);
  //           this.http.get<{role:string, user:string}>(this.baseUrl + 'user').subscribe(
  //             userData => {

  //             }
  //           )
  //         }
  //       }
  //     )
  //   )
  // }

  // login( model:any){
  //   return this.http.post<{token:string}>(this.baseUrl + 'login', model)
  //     .pipe(
  //         this.user.token = token.token;
  //         this.http.get<{user:string,role:string}>(this.baseUrl + 'user').pipe(
  //           map( userData =>{
  //             this.user.role = userData.role 
  //             this.setCurrentUser(this.user);
  //             this.currentUserSource.next(this.user);
  //           })
  //         )
  //       })
  //     )
  // }

  // login( model:any){
  //   return this.http.post(this.baseUrl + 'login', model)
  //     .pipe(
  //       concatMap( token => this.http.get( this.baseUrl + 'user').pipe(
  //         map(userData => {
  //           if(token){
  //             this.user.username = model.username;
  //             this.user.password = model.password;
  //             this.user.token = token.toString();
  //             if(userData){
  //               this.user.role = userData.toString()
  //             }
  //           }
  //           this.setCurrentUser(this.user);
  //           this.currentUserSource.next(this.user);
  //         })
  //       )
  //     )
  //   )
  // }
      //   if(token){
      //     this.user.username = model.username;
      //     this.user.password = model.password;
      //     this.user.token = token;
      //     this.setCurrentUser(this.user);
      //     this.currentUserSource.next(this.user);
      //   }
      // })
      // map((token:any) => {
      //   if(token){
      //     this.user.username = model.username;
      //     this.user.password = model.password;
      //     this.user.token = token;
      //     this.setCurrentUser(this.user);
      //     this.currentUserSource.next(this.user);
      //   }
      // })
    //);
 // }

  setCurrentUser( user:User ){
    ;localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.router.navigateByUrl('login');
  }
}
