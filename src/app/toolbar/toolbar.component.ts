import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private query = '';
  searchForm = new FormControl('');

  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  startSearch() {
    this.query = this.searchForm.value;
    this.search.emit(this.query);
  }
}
