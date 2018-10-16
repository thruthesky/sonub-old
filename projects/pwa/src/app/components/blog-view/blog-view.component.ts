import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit, AfterViewInit {

  @Input() post: ApiPost;
  content;
  constructor(
    public activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    window['showImage'] = this.showImage.bind(this);
  }

  ngOnInit() {

  }

  showImage(img) {
    console.log('popup this image:', img);
    this.a.openImageModal(img);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let content = this.post.content;
      if (content) {
        content = content.replace(/<img/ig, `<img class="pointer" onclick="showImage(this.src)"`);
        this.content = content;
      }
    }, 100);
  }


  onVote(post: ApiPost, mode: 'good' | 'bad') {
    this.philgo.postLike({ idx: post.idx, mode: mode }).subscribe(res => {
      console.log('res: ', res);
      post[mode] = res.result;
    }, e => this.a.error(e));
  }
  onEdit(post: ApiPost) {
    this.a.openPostEdit(post);
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
      this.a.toast(
        this.a.t({ en: 'This post has been reported.', ko: '본 글은 신고되었습니다.' })
      );
    }, e => this.a.error(e));
  }

  onClickFeature(n) {
    this.philgo.postUpdateAccessCodeByMember(this.post.idx, 'blog_featured_' + n).subscribe(post => {
      console.log('postUpdateAccessCodeByMember:', post);
    });
  }
  onClickChangeCategory(post: ApiPost, category: string) {
    console.log('going to change category: ', post.idx, category);
    this.philgo.postEdit({ idx: post.idx, category: category }).subscribe(up => {
      console.log('updated post: ', up);
      this.a.alert({
        content: this.a.t({
          en: 'Category hsa been changed',
          ko: '카테고리가 변경되었습니다.'
        })
      });
    }, e => this.a.error(e));
  }

}
