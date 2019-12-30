import {Component, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;
  authService: AuthenticationService;
  userSerive: UserService;

  constructor(authService: AuthenticationService, userService: UserService, public dialog: MatDialog,  private  router: Router) {
    this.user = authService.currentUserValue;
    this.userSerive = userService;
    this.authService = authService;
  }

  ngOnInit() {
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: "Confirm logout"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.router.navigate(['/']);
        this.onLogOut()
      }
    });
  }

  onLogOut(){
    this.userSerive.logout(this.user);
    this.authService.logout();
  }
}
