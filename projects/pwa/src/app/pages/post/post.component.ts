import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';
import { ActivatedRoute } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewInit {

  @ViewChild('ckeditor') ckeditor;
  public Editor = ClassicEditor;
  // public editorContent = '<p>Hello Editor!</p>';


  form: ApiPost = <any>{
    post_id: '',
    category: '',
    subject: '',
    content: '',
    gid: _.randomString(19, this.philgo.myIdx())
  };


  /**
   * Subject will be updated from content only if it is not touched by user.
   */
  subjectChanged = false;


  /**
   * File upload progress percentage
   */
  percentage = 0;


  isPostEdit = false;

  loader = {
    submit: false
  };

  ///
  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    window['comp'] = this;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => this.initView(), 10);
  }
  get isForumPostCreate(): boolean {
    return !this.isBlogPostCreate;
  }
  get isBlogPostCreate(): boolean {
    return this.form.post_id === 'blog';
  }
  initView() {



    this.activatedRoute.paramMap.subscribe(params => {

      if (params.get('post_id')) {
        this.form.post_id = params.get('post_id');
        console.log('got post id: ', this.form.post_id);
      } else if (params.get('blog_category')) {
        this.form.post_id = 'blog';
        this.form.category = params.get('blog_category');
        console.log('got category: ', this.form.category);
      } else if (params.get('idx')) {
        this.isPostEdit = true;
        const idx = params.get('idx');

        console.log('got post idx: ', this.form.idx);
        const post = this.a.postInMemory;
        if (post) {
          console.log(`Got post from memory`);
          this.form = post;
        } else {
          console.log('No post in memory. Going to get it from server');
          this.philgo.postLoad(idx).subscribe(p => this.form = p, e => this.a.toast(e));
        }
      } else {
        console.log('Got no param');
        if (this.a.inMyBlog) {
          this.form.post_id = 'blog';
          this.form.category = '';
        }
      }

    });

  }


  async onSubmit() {
    if ( this.loader.submit ) {
      return;
    }
    // this.philgo.debug = true;
    if (!this.philgo.isLoggedIn()) {
      const re = await this.philgo.loginOrRegister(<any>this.form).toPromise()
        .catch(e => {
          if (e.code === -270) {
            e.message = this.a.t({
              en: 'You have already registered with the email but the password is incorrect. Please input correct password.',
              ko: '입력하신 메일 주소로 회원 가입이 되어져 있지만, 비밀번호가 틀립니다. 올바른 비밀번호를 입력해주세요.'
            });
          }
          this.a.toast(e);
          return e;
        });
      if (this.philgo.isError(re)) {
        console.log('error on loginOrRegister()', re);
        return;
      }
    }

    this.loader.submit = true;
    /**
    * Edit
    */
    if (this.form.idx) {
      this.philgo.postEdit(this.form).subscribe(res => {
        console.log('post view? load?', res);
        this.a.openPostView(res);
        this.loader.submit = false;
      }, e => {
        this.a.toast(e);
        this.loader.submit = false;
      });
    } else {
      /**
       * Create
       */
      if (!this.form.post_id) {
        return this.a.toast(`Forum ID is empty.`);
      }
      if (this.form.post_id === 'blog' && !this.form.category) {
        return this.a.toast(this.a.t({ en: 'Please select category', ko: '카테고리를 선택하세요.' }));
      }
      this.form.group_id = this.a.groupId;
      console.log('post create from: ', this.form);
      this.philgo.postCreate(this.form).subscribe(res => {
        this.loader.submit = false;
        console.log('create res: ', res);
        // this.a.openHome();
        if (this.isForumPostCreate) {
          this.a.openForum(this.form.post_id);
        } else if (this.isBlogPostCreate) {
          this.a.openBlogView(res);
        } else {
          console.log('What? is it not blog or forum posting?');
        }
      }, e => {
        this.a.toast(e);
        this.loader.submit = false;
      });
    }
  }


  onChangeContent(event: Event) {
    // const { editor: ckeditor }: { editor: any } = <any>event;
    // console.log(ckeditor, ckeditor.config);

    // console.log(this.form.content);
    if (this.form.subject === void 0) {
      this.form.subject = '';
    }
    if (!this.form.idx && !this.subjectChanged) {
      // let str = this.a._.stripTags(this.editor.content);
      let str = this.a._.stripTags(this.form.content);
      str = this.a._.htmlDecode(str).trim();
      this.form.subject = str.substr(0, 30);
    }
  }

  onSubjectKeyUp() {
    this.subjectChanged = true;
    // console.log('working?');
  }



  onChangeFile(event: Event) {
    this.uploadFile(<any>event.target['files']);
  }

  uploadFile(files: FileList) {

    console.log('files: ', files);
    if (files === void 0 || !files.length || files[0] === void 0) {
      const e = { code: -1, message: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
      // this.componentService.alert(e);
      return;
    }

    this.percentage = 10;

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
        // this.editor.insertImage(res.src, res.name, res.idx);
        console.log( 'data', this.ckeditor , this.ckeditor.data );
        // alert('do something for file upload');
        console.log('content: ', this.form.content);
        this.form.content = this.form.content + `<img src="${ res.src }">` + `<p></p>`;
        this.percentage = 0;
      }
    }, e => {
      console.error(e);
      this.percentage = 0;
      this.a.toast(e);
    });
  }


}
