import { Component } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../services/app.service';
import { SimpleLibrary as _ } from 'ng-simple-library';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  res;
  _ = _;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    philgo.app('sonub.frontPage').subscribe(res => {
      console.log('sonub.frontPage()', res);
      this.res = res;
    }, e => this.a.toast(e));
  }

}
