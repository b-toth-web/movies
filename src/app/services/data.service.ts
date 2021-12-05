import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieResults, Movie } from '../interfaces/movie';
import { Store } from '@ngrx/store';
import { MovieState } from '../store/reducers/movie.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKey: string = environment.apiKey;
  private apiUrl: string = environment.apiUrl;
  private pageState$: Observable<number>;
  private yearState$: Observable<number>;
  private sortByState$: Observable<string>;

  constructor( private _http: HttpClient,
               private _store: Store<{ movie: MovieState }> ) {
                this.pageState$ = this._store.select( state => state.movie.page );
                this.yearState$ = this._store.select( state => state.movie.year );
                this.sortByState$ = this._store.select( state => state.movie.sort_by );
               }

  public getMovies( page?: number, year?: number, sort_by?: string ): Observable<MovieResults> {
    page = page ? page : 1;
    this.yearState$.pipe( take( 1 ) ).subscribe( yearValue => {
      year = yearValue;
    } );
    this.sortByState$.pipe( take( 1 ) ).subscribe( sortByValue => {
      sort_by = sortByValue
    } );
    return this._http.get<MovieResults>( `${this.apiUrl}discover/movie?api_key=${this.apiKey}&page=${page}&year=${year}&sort_by=${sort_by}` )
  }
}
