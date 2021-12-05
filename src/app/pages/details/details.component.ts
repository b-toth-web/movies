import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { MovieState } from 'src/app/store/reducers/movie.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public imgUrl: string = environment.imgUrl;
  movie: Movie | undefined;
  movieState$: Observable<MovieState>;

  constructor( private _store: Store<{ movie: MovieState}>,
               private _router: Router ) {
    this.movieState$ = _store.select( state => state.movie );
  }

  ngOnInit(): void {
    this.movieState$.pipe( take( 1 ) ).subscribe( ( state: MovieState ) => {
      this.movie = state.list.results.find( ( movie: Movie ) => movie.id === state.selectedMovieId );
      if ( !this.movie ) {
        this._router.navigate( [ '' ] );
      }
    } )
  }

}
