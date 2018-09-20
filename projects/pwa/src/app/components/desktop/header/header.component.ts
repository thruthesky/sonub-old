import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DesktopHeaderComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

