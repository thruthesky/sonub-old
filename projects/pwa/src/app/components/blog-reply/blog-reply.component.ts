import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { PhilGoApiService, ApiPost } from 'share/philgo-api/philgo-api.service';
import { ComponentService } from 'share/philgo-api-components/service/component.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-blog-reply',
  templateUrl: './blog-reply.component.html',
  styleUrls: ['./blog-reply.component.scss']
})
export class BlogReplyComponent implements OnInit, AfterViewInit {

  @Input() root: ApiPost;
  @Input() post: ApiPost;
  form: ApiPost = <any>{
    gid: _.randomString(19, this.philgo.myIdx())
  };
  percentage = 0;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.post['edit']) {
        this.form = this.post;
      } else {
        this.form.idx_parent = this.post.idx;
      }
    }, 10);
  }

  onSubmit() {
    console.log('this.form: ', this.form);

    /**
     * Edit
     */
    if (this.post['edit']) {
      this.form.idx = this.post.idx;
      this.philgo.postEdit(this.form).subscribe(res => {
        console.log('edited: ', res);
        Object.assign(this.post, res);
        this.post['edit'] = false;
      }, e => this.a.error(e));
    } else {

      console.log('create');
      /**
       * Reply
       */
      this.philgo.postCreate(this.form).subscribe(res => {
        console.log('created: ', res);

        if (this.root.comments && this.root.comments.length) {

        } else {
          this.root.comments = [];
        }
        console.log('post, root, res', this.post, this.root, res);

        /**
         * Find parent position
         */
        const pos = this.root.comments.findIndex(comment => comment.idx === this.post.idx);
        if (pos !== -1) { // if found
          this.root.comments.splice(pos + 1, 0, <any>res);
        } else { // if not found
          this.root.comments.push(<any>res);
        }
        // clear
        this.post['reply'] = false; // being used in template to show to reply form under comment.
        this.form.content = '';
        this.form.files = [];
        this.form.gid = _.randomString(19, this.philgo.myIdx());
      }, e => this.a.error(e));
    }
  }



  onChangeFile(event: Event) {
    this.uploadFile(<any>event.target['files']);
  }

  uploadFile(files: FileList) {

    console.log('files: ', files);
    if (files === void 0 || !files.length || files[0] === void 0) {
      const e = { code: -1, message: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
      return;
    }

    this.philgo.fileUpload(files, { gid: this.form.gid, user_password: this.form.user_password }).subscribe(res => {
      if (typeof res === 'number') {
        console.log('percentage: ', res);
        this.percentage = res;
      } else {
        console.log('file upload success: ', res);
        if (!this.form.files || !this.form.files.length) {
          this.form.files = [];
        }
        this.form.files.push(res);
        this.percentage = 0;
      }
    }, e => {
      console.error(e);
      this.percentage = 0;
      this.a.error(e);
    });
  }


}

