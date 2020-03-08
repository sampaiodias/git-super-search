import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from '../shared/github/github.service';
import { Repository } from '../shared/github/models/repository';
import { Page } from '../shared/github/models/page';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.githubService
      .searchRepositories('unity')
      .toPromise()
      .then((resultsPage: Page<Repository>) => {
        console.log(resultsPage);
        this.results = resultsPage.items;
        this.dataSource.data = this.results;
      });
  }
}
