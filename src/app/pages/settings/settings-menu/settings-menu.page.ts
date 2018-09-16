import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.page.html',
  styleUrls: ['./settings-menu.page.scss'],
})
export class SettingsMenuPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

