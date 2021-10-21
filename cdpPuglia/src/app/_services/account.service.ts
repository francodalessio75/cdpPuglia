import { Injectable } from '@angular/core'
import {  HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://virtserver.swaggerhub.com/d.soldo/GUIsonda/1.0.0/';

  private user:User = {username : "", password : "", token : "" };

    private currentUserSource = new ReplaySubject<User>(1);

    /* used by authguard */
    currentUser$ = this.currentUserSource.asObservable();

  constructor( private http:HttpClient) { }

  login( model:any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((token:any) => {
        if(token){
          this.user.username = model.username;
          this.user.password = model.password;
          this.user.token = token;
          this.currentUserSource.next(this.user);
        }
      })
    );
  }

  setCurrentUser( user:User ){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
  }
}
