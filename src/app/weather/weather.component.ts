import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin'; //used to get multiple response from different url.
import { DataRequestService } from './../services/data-request.service' //this file contaile js promise to get city record.
import * as xml2js from 'xml2js';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  apikey:string = '79cce9d1cd2fb9e584cca5a598f53932';
  form:FormGroup;
  detail1:any;
  cityWeather:any;
  cityData = [];
  msg:string= "";
  
  constructor(private httpClient:HttpClient, private dataRequest:DataRequestService, private router:Router, private route:ActivatedRoute) { }
  

  /**This method is used to get "current weather" data of all city in latitute & longitute circle
   * and getting data from openWeatherMap api. 
   */
  getWeather(toLon:number, toLat:number) {
    this.dataRequest.sendRequest('https://api.openweathermap.org/data/2.5/find?lat='+toLat+'&lon='+toLon+'&cnt=40&appid='+this.apikey)
    .then(
      data => {
        this.cityWeather = data.list;
        this.dtTrigger.next(); 
      },
      error => {this.handleError}
    ).catch(this.handleError);
  }

  /**
   * This method is used to send data weather component
   * to five-day-weather component via service.
   */
  getFiveDayWeather(id) {
    this.dataRequest.getResult(id);
  }
   
  /**This method is used to search city name from local json file 
   * and get detail of the city like id, name, country and coord. 
   */
  searchCity(ct) {
    this.msg = "";
    $('form:nth-child(1)').removeClass('has-error');
    if(ct.cityname) {
      let city:string = this.getCleanString(ct.cityname);
      this.dataRequest.sendRequest('https://api.openweathermap.org/data/2.5/find?q='+city+'&type=accurate&appid='+this.apikey)
      .then(
        data => {
            if(data.list.length == 0) {
              this.msg = "City doesn't found!";
              $('[name=cityname]').val(''); 
            } 
            else { this.cityData = data.list }
          },
        error => {this.handleError})
      .catch(this.handleError);
    } 
    else {
        $('form:nth-child(1)').addClass('has-error');
        this.msg = "Please enter city name!";
      }
    }
  
   //Clean user input
   getCleanString(cityname):string {
     return cityname.trim().replace(/(^|\s)\S/g, l => l.toUpperCase());
   }

   //To get all city id
   getCityIds(data):any[] {
    var arr=[];
    data.forEach(element => {
      arr.push(element.id);
    });
    return arr;
  }
  
  //error handling
  public handleError = (error:Response) => {
    return Observable.throw(error);
  }

  /**This method is used to select city 
   * and request for current weather data from openWeatherMap api 
   */
  onSelect(selectData) {
   let lon:string = parseFloat(selectData.coord.lon).toFixed(4);
   let lat:string = parseFloat(selectData.coord.lat).toFixed(4);
   const toLon = parseFloat(lon);
   const toLat = parseFloat(lat); 

   this.dtElement.dtInstance.then(
    (dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getWeather(toLon, toLat);
    }
   );
   
  }
  
  

  ngOnInit() {  
    const lon:number = 77.2;
    const lat:number = 28.6; 
    this.getWeather(lon, lat); //onLoad current city weather.

    //listing button click for get weather detail
    const self = this;
     $('table').on('click','.btn-info', function(event) {
      self.getFiveDayWeather(event.target.id);
     });

    //For datatable responsive
    this.dtOptions = { 
      retrieve: true,
      responsive: true
    }; 


    //To validate the search box
    this.form = new FormGroup({
      cityname : new FormControl("", Validators.compose([Validators.required])) 
    });
  }
}
