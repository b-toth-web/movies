import { createAction, props } from "@ngrx/store";
import { MovieResults } from "src/app/interfaces/movie";

export const LoadMovies = createAction(
    '[Movie] - Load movies',
    ( page?: number, year?: number, sort_by?: string ) => ( { page, year, sort_by } )
);

export const SetMovieResults = createAction(
    '[Movie] - Set movie results in store',
    props<{
        list: MovieResults
    }>()
);

export const SetYear = createAction(
    '[Movie] - Set year',
    ( year: number ) => ( { year } )
);

export const SetPage = createAction(
    '[Movie] - Set page',
    ( page: number ) => ( { page } )
);

export const SetSortBy = createAction(
    '[Movie] - Set sort by',
    ( sort_by: string ) => ( { sort_by } )
);

export const SetSelectedMovieId = createAction(
    '[Movie] - Set selected movie id',
    ( selectedMovieId: number ) => ( { selectedMovieId } )
);
