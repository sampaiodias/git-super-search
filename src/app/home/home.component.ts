import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(SearchResultsComponent) searchResults: SearchResultsComponent;

  constructor() {}

  ngOnInit(): void {}

  search(query: string) {
    this.searchResults.search(query);
  }
}
