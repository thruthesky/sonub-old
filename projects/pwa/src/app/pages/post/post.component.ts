import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { NgSimpleEditorComponent } from 'ng-simple-editor';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editor: NgSimpleEditorComponent;


  form: ApiPost = <any>{
    post_id: 'blog',
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

  ///
  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    setTimeout(() => this.initView(), 10);

  }
  initView() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.form.post_id = params.get('post_id');
      const idx = params.get('idx');
      if (idx) {
        this.form = this.a.postToEdit;
        this.editor.putContent(this.form.content);
      }
    });
  }

  onSubmit() {

    this.form.content = this.editor.content;

    /**
    * Edit
    */
    if (this.form.idx) {
      this.philgo.postEdit(this.form).subscribe(res => {
        console.log('post view? load?', res);
        this.a.openPostView(this.form.post_id, this.form.idx);
      }, e => {
        this.a.toast(e);
      });
    } else {
      /**
       * Create
       */
      if (!this.form.post_id) {
        this.a.toast(`Forum ID is empty.`);
      }
      this.philgo.postCreate(this.form).subscribe(res => {
        console.log('create res: ', res);
        // this.a.openHome();
        this.a.openForum(this.form.post_id);
      }, e => {
        this.a.toast(e);
      });
    }
  }



  onChangeContent(event: Event) {
    if (!this.subjectChanged) {
      let str = this.a._.stripTags(this.editor.content);
      str = this.a._.htmlDecode(str).trim();
      this.form.subject = str.substr(0, 30);
    }
  }

  onSubjectKeyUp() {
    this.subjectChanged = true;
    console.log('working?');
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
        this.editor.insertImage(res.src, res.name, res.idx);
        this.percentage = 0;
      }
    }, e => {
      console.error(e);
      this.percentage = 0;
      this.a.toast(e);
    });
  }


}
