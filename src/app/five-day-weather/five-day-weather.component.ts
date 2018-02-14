import { Component, OnInit } from '@angular/core';
import { DataRequestService } from './../services/data-request.service';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-five-day-weather',
  templateUrl: './five-day-weather.component.html',
  styleUrls: ['./five-day-weather.component.css']
})
export class FiveDayWeatherComponent implements OnInit {
  cityname:string;
  constructor(private requestData:DataRequestService, private router:Router) { }
  fiveDayWeather:any;
  ngOnInit() {
    this.requestData.data1.subscribe(data => {
      if(data === undefined){
       this.router.navigate(['/weather']);
      }
      else{
      this.cityname = data.city.name;
      this.fiveDayWeather = data.list;
      }  
    })
  }

}
