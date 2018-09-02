import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.a.open('/');
  }

}
