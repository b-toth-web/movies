import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { sortBy } from 'src/app/interfaces/pagination';
import { SetYear, SetPage, SetSortBy } from 'src/app/store/actions/movie.actions';
import { MovieState } from 'src/app/store/reducers/movie.reducer';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  public sortBySelect: sortBy[] = [
    {
      id: 'popularity.asc',
      label: 'Popularity - Asc'
    },
    {
      id: 'popularity.desc',
      label: 'Popularity - Desc'
    },
    {
      id: 'release_date.asc',
      label: 'Release Date - Asc'
    },
    {
      id: 'release_date.desc',
      label: 'Release Date - Desc'
    },
    {
      id: 'revenue.asc',
      label: 'Revenue - Asc'
    },
    {
      id: 'revenue.desc',
      label: 'Revenue - Desc'
    },
    {
      id: 'primary_release_date.asc',
      label: 'Primary Release Date - Asc'
    },
    {
      id: 'primary_release_date.desc',
      label: 'Primary Release Date - Desc'
    },
    {
      id: 'original_title.asc',
      label: 'Original Title - Asc'
    },
    {
      id: 'original_title.desc',
      label: 'Original Title - Desc'
    },
    {
      id: 'vote_average.asc',
      label: 'Vote Average - Asc'
    },
    {
      id: 'vote_average.desc',
      label: 'Vote Average - Desc'
    },
    {
      id: 'vote_count.asc',
      label: 'Vote Count - Asc'
    },
    {
      id: 'vote_count.desc',
      label: 'Vote Count - Desc'
    },
  ];
  public yearSelect: number[] = [];
  public pageSelect: number[] = [];
  private state$: Observable<MovieState>;
  public selectedYear: number = 0;
  public selectedPage: number = 0;
  public selectedSortBy: string = '';

  constructor( private _store: Store<{ movie: MovieState }> ) {
    this.state$ = _store.select( state => state.movie );
   }

  ngOnInit(): void {
    this.createYearArray();
    this.createPageArray();
    this.state$
      .pipe( take( 1 ) )
      .subscribe( ( state: MovieState ) => {
        this.selectedYear = state.year;
        this.selectedPage = state.page;
        this.selectedSortBy = state.sort_by;
    } );
  }

  private createYearArray(): void {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 20;
    for ( let i = currentYear; i >= minYear; i-- ) {
      this.yearSelect.push( i );
    }
  }

  private createPageArray(): void {
    this.pageSelect = Array.from( { length: 20 }, ( _, i ) => i + 1 );
  }

  public onSetYear( event: MatSelectChange ): void {
    const year: number = event.value;
    this._store.dispatch( SetYear( year ) );
    this.selectedPage = 1;
  }

  public onSetPage( event: MatSelectChange ): void {
    const page: number = event.value;
    this._store.dispatch( SetPage( page ) );
  }

  public onSetSortBy( event: MatSelectChange ): void {
    const sortBy: string = event.value;
    this._store.dispatch( SetSortBy( sortBy ) );
    this.selectedPage = 1;
  }

}
