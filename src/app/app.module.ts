import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { MoviesComponent } from "./movies/movies.component";
import { AppRoutingModule } from "./app-routing.module";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatCardModule, MatButtonModule} from "@angular/material";
import { MatInputModule } from "@angular/material";
import { MatDialogModule} from "@angular/material/dialog"
import { ProfileComponent } from './profile/profile.component';
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import {IgxTimePickerModule} from "igniteui-angular";
import { QuoteComponent } from './quote/quote.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    ProfileComponent,
    QuoteComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    IgxTimePickerModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class AppModule {
}
