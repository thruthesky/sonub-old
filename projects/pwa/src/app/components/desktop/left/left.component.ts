import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';



@Component({
  selector: 'app-desktop-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class DesktopLeftComponent implements OnInit {

  // blogCheckContent = '';

  constructor(
    public a: AppService
  ) {

  }

  ngOnInit() {
  }

}


