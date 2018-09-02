import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    public philgo: PhilGoApiService,
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
