import { ActionReducer, createReducer, on, } from "@ngrx/store";
import { MovieResults } from "src/app/interfaces/movie";
import { SetMovieResults, SetPage, SetSortBy, SetYear, SetSelectedMovieId } from "../actions/movie.actions";

export interface MovieState {
    list: MovieResults;
    page: number;
    year: number;
    sort_by: string;
    selectedMovieId: number;
}

export const initialState: MovieState = {
    list: {
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: []
    },
    page: 1,
    year: new Date().getFullYear(),
    sort_by: 'popularity.desc',
    selectedMovieId: 0
}

export const reducer: ActionReducer<{ list: MovieResults, page: number, year: number, sort_by: string, selectedMovieId: number }> = createReducer(
    initialState,

    on( SetMovieResults, ( state: MovieState, { list } ) => ( {
        ...state,
        list: list
    } ) ),

    on( SetYear, ( state: MovieState, { year } ) => ( {
        ...state,
        year: year
    } ) ),

    on( SetPage, ( state: MovieState, { page } ) => ( {
        ...state,
        page: page
    } ) ),

    on( SetSortBy, ( state: MovieState, { sort_by } ) => ( {
        ...state,
        sort_by: sort_by
    } ) ),

    on( SetSelectedMovieId, ( state: MovieState, { selectedMovieId } ) => ( {
        ...state,
        selectedMovieId: selectedMovieId
    } ) )
)
