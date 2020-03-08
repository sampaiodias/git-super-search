import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import { GithubService } from '../shared/github/github.service';
import { Repository } from '../shared/github/models/repository';
import { Page } from '../shared/github/models/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements AfterViewInit {
  @Input()
  query: string = 'unity';

  results: Array<Repository>;
  displayedColumns: string[] = [
    'name',
    'owner',
    'language',
    'forks',
    'stars',
    'updated_at'
  ];
  dataSource = new MatTableDataSource(this.results);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private githubService: GithubService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.githubService.searchRepositories(
            this.query,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex + 1
          );
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data: Array<Repository>) => {
        this.dataSource.data = data;
      });
  }
}
