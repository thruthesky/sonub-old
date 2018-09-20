import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService, ApiPostSearch } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  res: ApiPostSearch;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.philgo.postSearch({
      post_id: 'blog',
      uid: this.philgo.myIdx(),
      page_no: 1,
      limit: 10,
      deleted: 0
    }).subscribe(search => {
      console.log('search: ', search);
      this.res = search;
    });
  }

  ngOnInit() {
  }

}
