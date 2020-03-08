import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly url = 'https://api.github.com/search/';

  constructor(private http: HttpClient) {}

  searchRepositories(query: string) {
    return this.http.get(this.url + 'repositories?q=' + query);
  }
}
