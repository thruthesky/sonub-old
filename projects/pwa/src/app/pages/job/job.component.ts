import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhilGoApiService } from '../../../../../../share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  category;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log(this.category);
    });
  }

  ngOnInit() {
  }

}
