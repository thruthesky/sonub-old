import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ApiCurrency } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currency: ApiCurrency;
  constructor(
    public a: AppService
  ) {
    a.philgo.currency().subscribe(c => this.currency = c);
  }

  ngOnInit() {
  }

}
