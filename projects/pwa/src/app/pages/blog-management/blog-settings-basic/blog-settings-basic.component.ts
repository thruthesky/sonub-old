import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { PhilGoApiService, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-settings-basic',
  templateUrl: './blog-settings-basic.component.html',
  styleUrls: ['./blog-settings-basic.component.scss']
})
export class BlogSettingsBasicComponent implements OnInit {


  percentage = 0;
  code = '';
  blog: ApiBlogSettings = <any>{};

  loader = {
    submit: false
  };
  constructor(

    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    philgo.blogLoadSettings(philgo.myBlogDomain()).subscribe(res => {
      console.log('res: ', res);
      this.blog = Object.assign({}, res);
    }, e => this.a.error(e));
  }

  ngOnInit() {
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    if ( this.loader.submit ) {
      return;
    }
    this.loader.submit = true;

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.name = this.blog.name;
    data.description = this.blog.description;
    data.keywords = this.blog.keywords;
    data.author = this.blog.author;
    data.copyright = this.blog.copyright;

    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      this.loader.submit = false;
      // this.philgo.profile().subscribe(r => {
      //   console.log('blog save => user local storage updated to restore blog domain: ', r);
      // });
    }, e => {
      this.a.error(e);
      this.loader.submit = false;
    });


    return false;
  }


  onChangeFile(event: Event, code: string) {
    const files = <any>event.target['files'];

    this.code = code;
    if (files === void 0 || !files.length || files[0] === void 0) {
      const e = { code: -1, content: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
      // this.componentService.alert(e);
      return;
    }

    this.philgo.fileUpload(files, { gid: this.a.philgo.myIdx(), code: code, finish: '1' }).subscribe(res => {
      if (typeof res === 'number') {
        console.log('percentage: ', res);
        this.percentage = res;
      } else {
        console.log('file success: ', res);
        if ( this.code === 'blog_favicon' ) {
          this.blog['url_favicon'] = res.src;
        } else {
          this.blog['url_seo_image'] = res.src;
        }
        this.percentage = 0;
      }
    }, e => {
      console.error(e);
      this.a.error(e);
      this.percentage = 0;
    });
  }

}
