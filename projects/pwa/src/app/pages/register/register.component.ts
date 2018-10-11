import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService, ApiRegisterRequest } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: ApiRegisterRequest = <any>{};
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {


  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.philgo.register(this.form).subscribe(res => {
      console.log('register: ', res);
    }, e => {
      console.error(e);
    });

    return false;
  }

}
