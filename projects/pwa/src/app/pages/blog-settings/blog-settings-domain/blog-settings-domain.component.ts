import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { PhilGoApiService, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-settings-domain',
  templateUrl: './blog-settings-domain.component.html',
  styleUrls: ['./blog-settings-domain.component.scss']
})
export class BlogSettingsDomainComponent implements OnInit {


  blog: ApiBlogSettings = <any>{};
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

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.domain = this.blog.domain;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog domain settings have successfully updated.', ko: '블로그 도메인 설정을 저장하였습니다.' }));
      this.philgo.profile().subscribe(r => {
        console.log('blog save => user local storage updated to restore blog domain: ', r);
      });
    }, e => this.a.error(e));


    return false;
  }

}
