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

  // domainRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-\s]+[a-zA-Z0-9]+$/;
  notAllowedChar = '`~!@#$%^&*()_=+[]{}\\|;:\'",./<>?';

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

    if (this.loader.submit) {
      return;
    }

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    for (let i = 1; i <= this.a.blogMaxNoOfCategories; i++) {
      if (this.blog[`category${i}`]) {
        this.blog[`category${i}`] = this.blog[`category${i}`].trim();
        data[`category${i}`] = this.blog[`category${i}`];
        if (this.a.hasNotAllowedChars(data[`category${i}`], this.notAllowedChar)) {
          this.a.toast(this.a.t({
            en: `Category No. ${i} should not have special chars except space and hyphen(-).`,
            ko: `카테고리 메뉴 번호 ${i}번에 허용되지 않는 특수 문자있습니다. 특수 문자는 공백과 하이픈(-)만 사용가능합니다.`
          }));
          return;
        }
      }
    }

    this.loader.submit = true;
    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      this.loader.submit = false;
      this.a.blogSettingChecked = false;
      this.a.checkBlogSettings();
    }, e => {
      this.a.error(e);
      this.loader.submit = false;
    });


    return false;
  }

}
