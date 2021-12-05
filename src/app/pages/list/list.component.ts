import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { LoadMovies, SetSelectedMovieId } from 'src/app/store/actions/movie.actions';
import { MovieState } from 'src/app/store/reducers/movie.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public imgUrl: string = environment.imgUrl;
  movieResults$: Observable<Movie[]>;

  constructor( private _store: Store<{ movie: MovieState }>,
               private _router: Router ) {
      _store.dispatch( LoadMovies() );
      this.movieResults$ = _store.select( state => state.movie.list.results );
    }

  ngOnInit(): void {}

  public onSelectMovie( id: number ) {
    this._store.dispatch( SetSelectedMovieId( id ) );
    this._router.navigate( [ 'details' ] );
  }

}
