import { Component } from '@angular/core';
import { PhilGoApiService, ApiPost } from '../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../services/app.service';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  _ = _;
  constructor(
    private router: Router,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

  }

  ionViewDidEnter() {
    console.log('HomePage::ionViewDidEnter()');
  }



  urlView(post: ApiPost): string {
    if (!post) {
      return '';
    }
    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return post.link.trim();
      } else {
        return `/${post.post_id}/${post.idx}`;
      }
    } else {
      return `/forum/${post.post_id}/${post.idx}`;
    }
  }

  urlTarget(post: ApiPost): string {

    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return '_blank';
      }
    }
    return '_self';
  }

  onClickPhoto(event: Event, post: ApiPost) {
    event.preventDefault();
    event.stopPropagation();
    if (this.urlTarget(post) === '_blank') {
      window.open(this.urlView(post));
    } else {
      this.router.navigateByUrl(this.urlView(post));
    }
  }


}
