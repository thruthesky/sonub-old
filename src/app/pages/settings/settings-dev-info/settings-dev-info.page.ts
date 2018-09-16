import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService } from '../../../modules/philgo-api/philgo-api.service';
import { AngularLibrary } from '../../../modules/angular-library/angular-library';

@Component({
  selector: 'app-settings-dev-info',
  templateUrl: './settings-dev-info.page.html',
  styleUrls: ['./settings-dev-info.page.scss'],
})
export class SettingsDevInfoPage implements OnInit {


  isCordova = AngularLibrary.isCordova();
  protocol = location.protocol;

  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}
