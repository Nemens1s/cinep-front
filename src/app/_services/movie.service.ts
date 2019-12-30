import {Injectable} from "@angular/core";
import {Movie} from "../_models/movie";
import {Observable, of} from "rxjs";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': "application/json"})
  };
  constructor(private http: HttpClient){}


  getAllMovies(): Observable<Movie[]>{

    return this.http.get<Movie[]>("/api/movies/all")
      .pipe(catchError(this.handleError<Movie[]>("getMovies", [])));
  }


  searchTitle(movieTitle: string): Observable<Movie[]>{
    console.log(movieTitle);
    if(!movieTitle.trim()){
      return of([])
    }
    console.log(movieTitle);
    return  this.http.get<Movie[]>("/api/movies/title", {params :{title : movieTitle}
    })
      .pipe(catchError(this.handleError<Movie[]>('searchTitle', [])));
  }

  searchTheatre(theatreName: string): Observable<Movie[]>{
    if(!theatreName.trim()){
      return of([])
    }
    return  this.http.get<Movie[]>("/api/movies/theatre", {params: {theatre: theatreName}})
      .pipe(catchError(this.handleError<Movie[]>('searchTheatre', [])));
  }
  searchTime(time: string): Observable<Movie[]>{
    return  this.http.get<Movie[]>("/api/movies/time", {params: {time: time}})
      .pipe(catchError(this.handleError<Movie[]>('searchTime', [])));
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}

