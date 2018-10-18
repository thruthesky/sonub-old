import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobComponent implements OnInit {

  category = '';
  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
