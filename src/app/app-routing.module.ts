import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesComponent} from "./movies/movies.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: "movies", component: MoviesComponent},
  {path: "register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
