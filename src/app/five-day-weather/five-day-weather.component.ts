import { Component, OnInit } from '@angular/core';
import { DataRequestService } from './../services/data-request.service';

@Component({
  selector: 'app-five-day-weather',
  templateUrl: './five-day-weather.component.html',
  styleUrls: ['./five-day-weather.component.css']
})
export class FiveDayWeatherComponent implements OnInit {

  constructor(private requestData:DataRequestService) { }
  fiveDayWeather:any;
  ngOnInit() {
    this.requestData.data1.subscribe(data => {
      this.fiveDayWeather = data
    })
  }

}
