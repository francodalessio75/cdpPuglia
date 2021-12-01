import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import * as usersData from '../users.json';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  //TEST DATA COLLECTION
  usersJSONData: any = (usersData as any).default;
  usersData: User[] = this.usersJSONData.data;

  currentUsers:User[] = [usersData as User];

  private currentUsersSource = new ReplaySubject<User[]>(1);
  currentUsers$ = this.currentUsersSource.asObservable();

  constructor() { }

  getUsers(){
    this.currentUsersSource.next(this.currentUsers);
  }

  getUser(id:string):User | undefined {
    return this.currentUsers.find((user) => {
      user.id === id;
    });
  }

  signupUser(newUser:User){
    this.currentUsers.push(newUser);
    this.currentUsersSource.next(this.currentUsers);
  }

  updateUser(user:User){
    let userToUpdate :User | undefined =  this.currentUsers.find((user) => {
      user.id === user.id;
    });

    let index:number;

    if(userToUpdate){ 
      index = this.currentUsers.indexOf(userToUpdate);
      this.currentUsers[index] = user;
    }
    
  }
}
