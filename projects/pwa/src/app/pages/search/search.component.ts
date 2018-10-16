import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/pwa/src/environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  q: string;
  res;
  constructor(
    activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {

    activatedRoute.queryParamMap.subscribe(params => {
      this.q = params.get('q');
      this.doSearch();
    });

  }

  ngOnInit() {
  }


  doSearch() {

    this.http.get(environment.sonubSearchServerUrl + `?q=${this.q}`).subscribe(res => {
      console.log('search result: ', res);
      this.res = res;
    });
  }
}
