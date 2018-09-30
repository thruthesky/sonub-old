import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ApiWeatherMap } from 'share/philgo-api/philgo-api.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  map: ApiWeatherMap;
  constructor(
    public a: AppService
  ) {
    a.philgo.weatherMap().subscribe(m => this.map = m);
  }

  ngOnInit() {
  }

  uvString(): string {
    const n = parseFloat(this.map.uv.value);
    if (n <= 2.9) {
      return 'Low';
    } else if (n <= 5.9) {
      return 'Moderate';
    } else if (n <= 7.9) {
      return 'Hight';
    } else if (n <= 10.9) {
      return 'Very Hight';
    } else {
      return 'Extrem';
    }
  }

}
