import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../services/app.service';

@Component({
  selector: 'app-sonub-intro',
  templateUrl: './sonub-intro.component.html',
  styleUrls: ['./sonub-intro.component.scss']
})
export class SonubIntroComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
