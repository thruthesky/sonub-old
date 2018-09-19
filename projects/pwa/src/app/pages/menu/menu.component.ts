import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}
