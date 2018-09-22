import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService, ApiBlogSettings } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-blog-settings',
  templateUrl: './blog-settings.component.html',
  styleUrls: ['./blog-settings.component.scss']
})
export class BlogSettingsComponent implements OnInit {

  blog: ApiBlogSettings = <any>{};
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    philgo.blogSettings().subscribe(res => {
      console.log('res: ', res);
      this.blog = res;
    }, e => this.a.toast(e));
  }

  ngOnInit() {

  }

}
