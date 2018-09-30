import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-lazy-loader',
  templateUrl: './lazy-loader.component.html',
  styleUrls: ['./lazy-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LazyLoaderComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
