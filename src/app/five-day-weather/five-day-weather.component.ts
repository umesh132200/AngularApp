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
  fiveDayWeather:any;
  cn:string;
  fd:any;
  constructor(private requestData:DataRequestService, private router:Router) { 
    let data = JSON.parse(localStorage.getItem('data'));
    this.cityname = data.city.name;
    this.fiveDayWeather = data.list;
  }
  
  public showData(){
    this.requestData.data1.subscribe(data => {
      this.cityname = data.city.name;
      this.fiveDayWeather = data.list; 
    })
  }


  ngOnInit() {
   
      // if(data === undefined || data === null){
      //  this.router.navigate(['/weather']);
      // }
      // else{
     
      //}        
    
  }
  
}
