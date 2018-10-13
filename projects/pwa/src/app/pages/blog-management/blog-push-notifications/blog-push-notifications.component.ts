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

  loader = {
    submit: false
  };
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
    if ( this.loader.submit ) {
      return;
    }
    if ( !this.blog.url_favicon ) {
      this.a.toast(this.a.t({ en: 'Please upload Favicon first before sending notification.', ko: '먼저 Favicon을 업로드 한 후 알림을 보내주십시오.' }));
      return;
    }
    if ( this.form.title && this.form.title.length > 60 ) {
      this.a.toast(this.a.t({ en: 'Title is too long. Please shorten it.', ko: '제목이 너무 깁니다. 그것을 줄이십시오.' }));
      return;
    }
    if ( this.form.body && this.form.body.length > 60 ) {
      this.a.toast(this.a.t({ en: 'Content is too long. Please shorten it.', ko: '내용이 너무 깁니다. 그것을 줄이십시오.' }));
      return;
    }


    this.form.topic = this.a.pushDomain;
    this.form.icon = this.blog.url_favicon;
    this.form.click_action = this.a.getBlogViewUrl( this.post, true );
    // console.log(this.form);
    this.loader.submit = true;
    this.a.philgo.sendPushMessage(this.form).subscribe(res => {
      console.log('sendPushMessage: ', res);
      this.loader.submit = false;
    }, e => {
      this.loader.submit = false;
    });

    return false;
  }


}
