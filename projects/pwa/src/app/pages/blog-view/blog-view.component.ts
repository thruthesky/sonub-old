import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  post: ApiPost;
  constructor(
    public activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idx = params.get('idx');
      this.a.philgo.postLoad(idx).subscribe(post => {
        console.log('post', post);
        this.post = post;
      }, e => this.a.toast(e));
    });
  }

  onVote(post: ApiPost, mode: 'good' | 'bad') {
    this.philgo.postLike({ idx: post.idx, mode: mode }).subscribe(res => {
      console.log('res: ', res);
      post[mode] = res.result;
    }, e => this.a.error(e));
  }
  onEdit(post: ApiPost) {
    alert('edit');
  }

  onDelete(post: ApiPost) {
    this.philgo.postDelete({ idx: post.idx }).subscribe(res => {
      console.log('delete success: ', res);
      post.subject = this.philgo.textDeleted();
      post.content = this.philgo.textDeleted();
    }, e => this.a.error(e));
  }

  onReport(post: ApiPost) {

    this.philgo.postReport(post.idx).subscribe(res => {
      this.a.toast({
        content: this.philgo.t({ en: 'This post has been reported.', ko: '본 글은 신고되었습니다.' })
      });
    }, e => this.a.error(e));

  }
}
