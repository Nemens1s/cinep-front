import {Component,OnInit} from '@angular/core';
import {Movie} from "../_models/movie";
import {Subscription} from "rxjs";
import {MovieService} from "../_services/movie.service";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  title: string = '';
  theatre: string = "Select cinema";
  user = this.authService.currentUserValue;
  date = new Date(Date.now());
  timeNow = this.date;
  constructor(private movieService: MovieService, private authService: AuthenticationService, private userService: UserService) {

  }
  ngOnInit() {

  }

  showMovies(): Subscription{
    if (this.title != ''){
      return this.getMoviesByTitle()
    } else if(this.theatre != 'Select cinema'){
      return this.getMoviesByTheatre()
    }
    if(this.date != this.timeNow){
      console.log(this.date);
      console.log(this.timeNow);
      return this.getMoviesByTime();
    }
    return this.movieService.getAllMovies().subscribe(movies => this.movies = movies);

  }
  clearMovies(){
    this.movies = [];
    this.theatre = "Select cinema";
    this.title = '';
  }
  getMoviesByTitle(): Subscription{
    return this.movieService.searchTitle(this.title).subscribe(movies => this.movies = movies);

  }
  getMoviesByTheatre(): Subscription{
    return this.movieService.searchTheatre(this.theatre).subscribe(movies => this.movies = movies);
  }

  getMoviesByTime(): Subscription{
    let hours = this.date.getHours().toLocaleString();
    let minutes = this.date.getMinutes().toLocaleString();
    if(minutes.length == 1){
      minutes = "0"+minutes;
    }
    return this.movieService.searchTime(hours +":"+minutes).subscribe(movies => this.movies = movies);
  }

  addToBookMarks(title: String){
    console.log("here");
    return this.userService.addToBookmarks(title).subscribe();
  }


}
