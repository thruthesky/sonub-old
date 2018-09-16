import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService } from '../../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-settings-language',
  templateUrl: './settings-language.page.html',
  styleUrls: ['./settings-language.page.scss'],
})
export class SettingsLanguagePage implements OnInit {

  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }



  onIonSelect(event: Event) {
    const radio: HTMLInputElement = <any>event.target;
    this.a.tr.languageCode = radio.value;
    this.philgo.setLanguage(radio.value).subscribe(res => {
      // console.log(res);
      this.a.tr.languageCode = radio.value;
    }, e => this.a.toast(e));
  }

}
