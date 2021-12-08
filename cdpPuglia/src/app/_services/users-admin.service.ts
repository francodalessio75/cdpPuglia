import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import * as usersData from '../users.json';
import { Observable, of, ReplaySubject } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsersAdministrationService {
  //TEST DATA COLLECTION
  usersJSONData: any = (usersData as any).default;
  usersData: User[] = this.usersJSONData.data;
  
  currentUsers: User[] = this.usersData;
  currentUser!: User;

  private currentUsersSource = new ReplaySubject<User[]>(1);
  currentUsers$ = this.currentUsersSource.asObservable();

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private userDeletedSource = new ReplaySubject<boolean>();
  public userDeleted$ = this.userDeletedSource.asObservable();

  private userUpdatedSource = new ReplaySubject<boolean>();
  public userUpdated$ = this.userUpdatedSource.asObservable();

  constructor( ) {}

  getUsers() {
      this.currentUsersSource.next(this.currentUsers);
  }

  setUser(id: string){
    console.log(this.currentUsers);
    const user: User | undefined = this.currentUsers
    .find(user => user.id === id);

    if(user){
      this.currentUser = user;
    }
  }

  getUser(){
    this.currentUserSource.next(this.currentUser);
  }

  signupUser(newUser: User) {
    this.currentUsers.push(newUser);
    this.currentUsersSource.next(this.currentUsers);
  }

  updateUser(modifiedUser: User) {
    const users = this.currentUsers.slice();
    const userToUpdate = users.find( user => user.id === modifiedUser.id);
    let index:number = -1;
    if(userToUpdate){
      index = users.indexOf(userToUpdate);
    }
    if( index !== -1 ){
      users[index] = modifiedUser;
      this.currentUsers = users;
      this.currentUsersSource.next(this.currentUsers);
      this.userUpdatedSource.next(true);
    }else{
      this.userUpdatedSource.next(false);
    }
  }

  deleteUser(userId:string){
    const users = this.currentUsers.slice();
    const userToDelete = users.find(user => user.id === userId );
    if(userToDelete){
      users.splice(users.indexOf(userToDelete), 1);
      this.currentUsers = users;
      this.userDeletedSource.next(true);
      this.currentUsersSource.next(this.currentUsers);
    }else{
      this.userDeletedSource.next(false);
    }
  }
}
