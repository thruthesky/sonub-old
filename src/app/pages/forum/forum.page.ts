import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhilGoApiService, ApiPostSearch } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  post_id;
  title;
  show = {
    loader: true
  };

  constructor(

    private activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService
  ) {

    activatedRoute.paramMap.subscribe(params => {
      this.post_id = params.get('post_id');
      if (this.post_id) {
        this.title = this.philgo.forumName(this.post_id);
      }
    });
  }

  ngOnInit() {
  }

  onLoad(res: ApiPostSearch) {
    this.show.loader = false;
  }

}
