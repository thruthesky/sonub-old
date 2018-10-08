import { Component, OnInit } from '@angular/core';
import { ApiPost, ApiPushMessage, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-push-notifications',
  templateUrl: './blog-push-notifications.component.html',
  styleUrls: ['./blog-push-notifications.component.scss']
})
export class BlogPushNotificationsComponent implements OnInit {

  idx;
  noOfTokens = 0;
  post: ApiPost;
  form: ApiPushMessage = <any>{};
  blog: ApiBlogSettings;
  constructor(
    activatedRoute: ActivatedRoute,
    public a: AppService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.idx = params.get('idx');

      if (this.idx) {

        this.a.philgo.postGet(this.idx).subscribe(p => {
          this.post = p;
          this.form.title = this.a._.stripTags(this.post.subject).substr(0, 60);
          this.form.body = this.a._.stripTags(this.post.content).substr(0, 60);
        }, e => this.a.error(e));

      }


    });

    this.a.philgo.blogChange.subscribe(blog => {
      console.log('blog: ', blog);
      this.blog = blog;
      this.a.philgo.countTokens(this.a.pushDomain).subscribe(res => {
        this.noOfTokens = res.count;
      });
    });


  }

  ngOnInit() {
  }


  onSubmit() {

    this.form.topic = this.a.pushDomain;
    this.form.icon = this.blog.url_favicon;
    this.form.click_action = this.a.getBlogViewUrl( this.post, true );
    // console.log(this.form);

    this.a.philgo.sendPushMessage(this.form).subscribe(res => {
      console.log('sendPushMessage: ', res);
    });

    return false;
  }


}
