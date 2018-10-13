import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { PhilGoApiService, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-settings-category',
  templateUrl: './blog-settings-category.component.html',
  styleUrls: ['./blog-settings-category.component.scss']
})
export class BlogSettingsCategoryComponent implements OnInit {

  blog: ApiBlogSettings = <any>{};
  domainRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-\s]+[a-zA-Z0-9]+$/;

  loader = {
    setting: true,
    submit: false
  };
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

  ngOnInit() {
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    if ( this.loader.submit ) {
      return;
    }

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    for (let i = 1; i <= this.a.blogMaxNoOfCategories; i++) {
      data[`category${i}`] = this.blog[`category${i}`];

      if ( this.blog[`category${i}`] &&  !this.domainRegex.test( this.blog[`category${i}`] ) ) {
        this.a.toast( this.a.t({ en: `category${i} should not have special chars except space and hyphen(-).`,
          ko: 'category${i} 하이픈 (-) 또는 공백 ()을 제외하고는 특수 문자가 없어야합니다.' }));
        return;
      }
    }

    this.loader.submit = true;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      this.loader.submit = false;
    }, e => {
      this.a.error(e);
      this.loader.submit = false;
    });


    return false;
  }

}
