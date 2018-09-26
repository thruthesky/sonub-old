import { Component, OnInit } from '@angular/core';
import { FrontPage, AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-desktop-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class DesktopRightComponent implements OnInit {


  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

