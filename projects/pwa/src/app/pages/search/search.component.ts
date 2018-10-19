import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/pwa/src/environments/environment';
import { AppService } from '../../../services/app.service';
import { AlertData } from '../../../../../../share/components/dialog/dialog-interfaces';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  q: string;
  res;
  results = null;

  loader = {
    search: false
  };
  constructor(
    public a: AppService,
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

    this.loader.search = true;
    this.http.get(environment.sonubSearchServerUrl + `?q=${this.q}`).subscribe(res => {
      console.log('search result: ', res);
      this.res = res;
      this.results = res['data'];
      this.loader.search = false;
    }, e => {
      this.a.toast(e);
      this.loader.search = false;
    });
  }


  onClickOpenDetail( post ) {
      console.log('onClickOpenDetail', post);
      const data: AlertData = {
        title: post.title,
        content: ''
      };
      let content = '';
      if ( post.link ) {
        content += `<div style="color: darkgreen">${post.link}</div>`;
      }
      if ( post.author ) {
        content += `<div style="display: inline-block; margin: 1.5rem 3rem 1.5rem 0">Author: ${post.author}</div>`;
      }
      if ( post.stamp ) {
        content += `<div style="display: inline-block; margin: 1.5rem 4rem 1.5rem 0">Date: ${this.a.philgo.shortDate(post.stamp)}</div>`;
      }
      if ( post.content ) {
        content += `<div style="margin-bottom:  1.5rem; line-height: 1.45">${post.content}</div>`;
      }

      let image = '';

      if ( post.image_1 ) {
        image += `<img src="${post.image_1}" style="max-width: 100%" onerror="this.remove()">`;
      }
      if ( post.image_2 ) {
        image += `<img src="${post.image_2}" style="max-width: 100%" onerror="this.remove()">`;
      }
      if ( post.image_3 ) {
        image += `<img src="${post.image_3}" style="max-width: 100%" onerror="this.remove()">`;
      }
      if ( post.image_4 ) {
        image += `<img src="${post.image_4}" style="max-width: 100%" onerror="this.remove()">`;
      }
      if ( image ) {
        content += `<div class="files">${image}</div>`;
      }
      data['content'] = content;
      this.a.alert(data);

  }
}
