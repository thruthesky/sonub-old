import { Component, OnInit } from '@angular/core';
import { ApiPost } from '../../../../../../share/philgo-api/philgo-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {

  data: ApiPost;
  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

}
