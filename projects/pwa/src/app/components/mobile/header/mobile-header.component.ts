import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
