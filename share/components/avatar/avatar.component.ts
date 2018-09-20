import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
