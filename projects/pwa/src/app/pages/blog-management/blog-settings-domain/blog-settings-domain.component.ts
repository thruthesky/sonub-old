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
  domainRegex = /^[a-z][a-z0-9-]+[a-z0-9]$/;
  loader = {
    domainSettings: true,
    submit: false
  };
  constructor(

    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.loader.domainSettings = true;
    philgo.blogLoadSettings(philgo.myBlogDomain()).subscribe(res => {
      console.log('res: ', res);
      this.blog = Object.assign({}, res);
      this.loader.domainSettings = false;
    }, e => {
      this.a.error(e),
      this.loader.domainSettings = false;
    } );
  }

  ngOnInit() {
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    if (this.loader.submit) {
      return;
    }

    if ( !this.domainRegex.test(this.blog.domain)) {
      this.a.toast( this.a.t({ en: 'Domain should not have special chars except hyphen(-).', ko: '도메인에는 하이픈 (-)을 제외한 특수 문자가 없어야합니다.' }));
      return;
    }


    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.domain = this.blog.domain;
    this.loader.submit = true;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog domain settings have successfully updated.', ko: '블로그 도메인 설정을 저장하였습니다.' }));
      this.loader.submit = false;
      this.philgo.profile().subscribe(r => {
        console.log('blog save => user local storage updated to restore blog domain: ', r);
        this.a.openMyBlog();
      });
    }, e => {
      this.a.error(e);
      this.loader.submit = false;
    });

    return false;
  }

}
