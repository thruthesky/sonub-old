import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService, ApiPostSearch, ApiPostQueryOptions } from 'share/philgo-api/philgo-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  post_id;
  page_no = 1;
  res: ApiPostSearch;
  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe(params => {

      this.post_id = params.get('post_id');
      const options: ApiPostQueryOptions = {};
      if (this.page_no === 1) {
        options.cache = true;
        options.cacheId = `cache-first-list-of-${this.post_id}`;
      }
      philgo.postSearch({ post_id: this.post_id }, options).subscribe(res => {
        console.log('res: ', res);
        this.res = res;
      }, e => {
        console.log(e);
      });

    });
  }

  ngOnInit() {
  }

}
