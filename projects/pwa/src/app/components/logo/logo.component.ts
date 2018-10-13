import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
