import { Component, OnInit } from '@angular/core';

import movieQuotes from "movie-quotes";

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  movieQuotes = movieQuotes;
  oneQuote: String;
  constructor() { }

  ngOnInit() {
    this.oneQuote = this.movieQuotes.random();
    console.log(this.oneQuote);
  }

}
