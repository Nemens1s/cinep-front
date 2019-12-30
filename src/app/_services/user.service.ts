import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../_models/user';
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  register(user: User): Observable<User> {
    return this.http.post<User>(`/api/profile/register`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`/api/profile/login`, user);
  }

  logout(user: User): Observable<User>{
    return this.http.post<User>(`/api/logout`, user);
  }

  getBookmarks(): Observable<String[]>{
    console.log("In service");
    return this.http.get<String[]>("/api/profile/bookmarks/show")
      .pipe(catchError(this.handleError<String[]>('getBookmarks', [])));
  }

  addToBookmarks(title: String): Observable<String>{
    console.log("service " + title);
    return this.http.post<String>("/api/profile/bookmarks/add", title)
      .pipe(catchError(this.handleError<String>('addToBookmarks', "fail")));
  }
  deleteBookmark(title: String){
    return this.http.delete<String>(`/api/profile/bookmarks/delete/${title}`).pipe(catchError(this.handleError<String>('deleteBookmark')));
  }

  deleteUser(username: String){
    return this.http.delete<String>(`/api/profile/delete/${username}`).pipe(catchError(this.handleError<String>('deleteUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
