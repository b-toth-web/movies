import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, of } from "rxjs";
import { MovieResults } from "src/app/interfaces/movie";
import { DataService } from "src/app/services/data.service";
import { LoadMovies, SetMovieResults, SetPage, SetSortBy, SetYear } from "../actions/movie.actions";

@Injectable()
export class MovieEffects {

    loadMovies$: Observable<Action> = createEffect( () => {
        return this.actions$.pipe(
            ofType( 
                LoadMovies,
                SetYear,
                SetPage,
                SetSortBy
            ),
            exhaustMap( ( action: any ) => this.dataService.getMovies( action.page, action.year, action.sort_by )
                .pipe(
                    map( ( movies: MovieResults ) => ( SetMovieResults( { list: movies } ) ) ),
                    catchError( ( error: any ) => { return of( error ) } )
                ) )
        );
    } );

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) {}
}