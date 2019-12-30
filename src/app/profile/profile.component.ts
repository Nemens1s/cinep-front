import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  bookmarks: String[] = [];
  authService: AuthenticationService;
  userService: UserService;
  nameToDelete: string;
  constructor(userService: UserService, authService: AuthenticationService) {
    this.authService = authService;
    this.userService = userService;
    this.user = authService.currentUserValue;
    this.user.username = AuthenticationService.currentUsername;
  }

  ngOnInit() {
    this.getBookMarks();
  }

  getBookMarks(){
    return this.userService.getBookmarks().subscribe(s => this.bookmarks = s);
  }

  hasBookmarks(){
    return this.bookmarks.length!=0;
  }
  deleteUser(){
    return this.userService.deleteUser(this.nameToDelete).subscribe();
  }

  deleteBookmark(bookmarkToDelete: string){
    this.userService.deleteBookmark(bookmarkToDelete).subscribe();
    return this.getBookMarks();
  }
}
