import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService, ApiLoginRequest } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: ApiLoginRequest = <any>{};
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }



  onSubmit(event: Event) {
    event.preventDefault();

    this.philgo.login(this.form).subscribe(res => {
      console.log('login: ', res);
    }, e => {
      console.error(e);
    });

    return false;
  }

}
