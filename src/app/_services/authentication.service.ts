import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../_models/user';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,
              private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined;
  }

  public static get currentUsername(){
    return JSON.parse(localStorage.getItem('currentUser'))['userName'];
  }
  public static get currentUserRoles(){
    return JSON.parse(localStorage.getItem('currentUser'))['roles'];
  }

  login(username, password) {
    return this.userService.login({username, password} as User)
      .pipe(map((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
