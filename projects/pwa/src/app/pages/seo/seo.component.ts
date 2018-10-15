import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';
import { ApiBlogSettings, PhilGoApiService } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  loader = {
    setting: false,
    submit: false
  };
  blog: ApiBlogSettings = <any>{};
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    this.loader.setting = true;
    philgo.blogLoadSettings(philgo.myBlogDomain()).subscribe(res => {
      console.log('res: ', res);
      this.blog = Object.assign({}, res);
      this.loader.setting = false;
    }, e => {
      this.a.error(e);
      this.loader.setting = false;
    });
  }

  onSubmit() {
    this.loader.submit = true;
    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.head = this.blog.head;

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
  ngOnInit() {
  }

}
