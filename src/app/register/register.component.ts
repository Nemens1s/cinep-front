import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {first} from "rxjs/operators";

import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    if(this.authService.currentUserValue){
      this.router.navigate(['/'])
    }
  }

  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first()).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error => {
        this.loading = false;
      }

  );
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  get f() {
    return this.registerForm.controls;
  };

}
