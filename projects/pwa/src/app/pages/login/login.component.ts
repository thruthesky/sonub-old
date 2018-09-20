import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.a.openHome();
  }

}
