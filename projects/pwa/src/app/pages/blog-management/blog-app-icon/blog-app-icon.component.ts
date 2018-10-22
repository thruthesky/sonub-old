import { Component, OnInit } from '@angular/core';
import { ApiBlogSettings, PhilGoApiService, ApiThumbnailGenerate } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-app-icon',
  templateUrl: './blog-app-icon.component.html',
  styleUrls: ['./blog-app-icon.component.scss']
})
export class BlogAppIconComponent implements OnInit {

  blog: ApiBlogSettings = <any>{};
  percentage = 0;
  loader = {
    appIcon: true,
    submit: false
  };
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.loader.appIcon = true;
    philgo.blogLoadSettings(philgo.myBlogDomain()).subscribe(res => {
      console.log('res: ', res);
      this.blog = Object.assign({}, res);
      this.loader.appIcon = false;
    }, e => {
      this.a.error(e),
      this.loader.appIcon = false;
    });


  }

  ngOnInit() {
  }


  onSubmit($event: Event) {
    $event.preventDefault();

    if ( this.loader.submit ) {
      return;
    }

    if ( this.blog.app_name && this.blog.app_name.length > 32 ) {
      this.a.toast(this.a.t({ en: 'App name is too long. Please shorten it.', ko: '앱 이름이 너무 깁니다.' }));
      return;
    }
    if ( this.blog.app_short_name && this.blog.app_short_name.length > 16 ) {
      this.a.toast(this.a.t({ en: 'App short name is too long. Please shorten it.', ko: 'Short name 이 너무 깁니다.' }));
      return;
    }

    this.loader.submit = true;

    console.log('req: ', this.blog);
    const data: ApiBlogSettings = <any>{};
    data.app_name = this.blog.app_name;
    data.app_short_name = this.blog.app_short_name;
    data.app_theme_color = this.blog.app_theme_color;
    data.app_url_icons_src_72 = this.blog.app_url_icons_src_72;
    data.app_url_icons_src_96 = this.blog.app_url_icons_src_96;
    data.app_url_icons_src_128 = this.blog.app_url_icons_src_128;
    data.app_url_icons_src_144 = this.blog.app_url_icons_src_144;
    data.app_url_icons_src_152 = this.blog.app_url_icons_src_152;
    data.app_url_icons_src_192 = this.blog.app_url_icons_src_192;
    data.app_url_icons_src_384 = this.blog.app_url_icons_src_384;
    data.app_url_icons_src_512 = this.blog.app_url_icons_src_512;

    this.philgo.blogSaveSettings(data).subscribe(res => {
      console.log('blog saved: ', res);
      this.a.toast(this.a.t({ en: 'Blog settings have successfully updated.', ko: '블로그 설정이 저장되었습니다.' }));
      // this.philgo.profile().subscribe(r => {
      //   console.log('blog save => user local storage updated to restore blog domain: ', r);
      // });
      this.loader.submit = false;
      this.a.blogSettingChecked = false;
      this.a.checkBlogSettings();
    }, e => {
      this.a.error(e);
      this.loader.submit = false;
    });


    return false;
  }


  onChangeFile(event: Event, code: string) {
    const files = <any>event.target['files'];

    if (files === void 0 || !files.length || files[0] === void 0) {
      const e = { code: -1, content: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
      return;
    }

    this.philgo.fileUpload(files, { gid: this.a.philgo.myIdx(), code: code }).subscribe(res => {
      if (typeof res === 'number') {
        console.log('percentage: ', res);
        this.percentage = res;
      } else {
        console.log('file success: ', res);
        this.blog.app_url_icons_src_512 = res.src;
        this.percentage = 0;
        this.generateAppIconThumbnails(res.path, 0);
      }
    }, e => {
      console.error(e);
      this.a.error(e);
      this.percentage = 0;
    });
  }

  /**
   * Generate thumbnails
   * @param path uploaded file's data path
   * @param count number to generate thumbnails
   */
  generateAppIconThumbnails(path: string, count: number) {
    const sizes = [
      { width: 72, height: 72 },
      { width: 96, height: 96 },
      { width: 128, height: 128 },
      { width: 144, height: 144 },
      { width: 152, height: 152 },
      { width: 192, height: 192 },
      { width: 384, height: 384 },
      { width: 512, height: 512 },
    ];
    const options: ApiThumbnailGenerate = {
      path: path,
      prefix: 'icons-' + this.philgo.myIdx(),
      width: sizes[count].width,
      height: sizes[count].height,
      mode: 'adaptive',
      ext: 'png',
    };
    this.philgo.generateThumbnail(options).subscribe(thumb => {
      console.log('thumbnail generate', thumb);
      if (options.width === 72) {
        this.blog.app_url_icons_src_72 = thumb['path'];
      } else if (options.width === 96) {
        this.blog.app_url_icons_src_96 = thumb['path'];
      } else if (options.width === 128) {
        this.blog.app_url_icons_src_128 = thumb['path'];
      } else if (options.width === 144) {
        this.blog.app_url_icons_src_144 = thumb['path'];
      } else if (options.width === 152) {
        this.blog.app_url_icons_src_152 = thumb['path'];
      } else if (options.width === 192) {
        this.blog.app_url_icons_src_192 = thumb['path'];
      } else if (options.width === 384) {
        this.blog.app_url_icons_src_384 = thumb['path'];
      } else if (options.width === 512) {
        this.blog.app_url_icons_src_512 = thumb['path'];
      }
      if (count >= 7) {
        return;
      } else {
        count++;
        this.generateAppIconThumbnails(path, count);
      }
    }, e => this.a.error(e));
  }


}
