import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin'; //used to get multiple response from different url.
import { DataRequestService } from './../services/data-request.service' //this file contaile js promise to get city record.
import * as xml2js from 'xml2js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

//declare var $:any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private httpClient:HttpClient, private dataRequest:DataRequestService) {}
  apikey:string = '79cce9d1cd2fb9e584cca5a598f53932';
  form;
  msg:any= "";
  city:string="";
  arr:any[];
  detail1:any;
  cityWeather:any;
  detail2:any[];
  cityName:any[];
  cityIds:any[];
  weatherDes:any[];
  sunRise:any[];
  sunSet:any[];
  temp:any[];
  tableData:any[] = new Array();
  mulResponse:any[] = new Array();
  tdata:any[] = new Array();  
  weatherData:any='';
  cityWiseData:any=''; 
  id = [];
  name = [];
  country = [];
  coord = [];
  results = [];
  cityData = [];
  arrData =[];
  selectData = [];
  toLon:number = 77.2;
  toLat:number = 28.6;
  cityId:number = 1261481;
  order:boolean = false;
  field:any;
  fiveDayWeather:any;

  /**This method is used to get "current weather" data of all city in latitute & longitute circle
   * and getting data from openWeatherMap api. 
   */
  getWeather() {
    this.mulResponse = [];
    this.dataRequest.sendRequest('https://api.openweathermap.org/data/2.5/find?lat='+this.toLat+'&lon='+this.toLon+'&cnt=40&appid='+this.apikey)
    .then(data => {
      this.cityWeather = data.list;
      this.getDayWise(this.cityWeather);
    },
    error => {}
  ).catch
 }

  /**This method is used to get "5 day/ 3 hour weather" data of selected city
   * and getting data from openWeatherMap api. 
   */
  getDayWise(cityweather){
    var arr=[];
    cityweather.forEach(element => {
      arr.push(element.id);
    });

    this.dataRequest.getResult(arr) 
    .subscribe(data => { 
      this.detail1 = data;
    },
  error => {});        
  }
  
  getFiveDayWeather(id){
    var data:any;
    this.detail1.forEach(element => {
      if(element.city.id === id){
        data = element;
        this.dataRequest.dataCast(data);
      }
    });
    
  }
  
  /**This method is used to search city name from local json file 
   * and get detail of the city like id, name, country and coord. 
   */
  searchCity(ct) {
    this.msg = "";
    $('form:nth-child(1)').removeClass('has-error');//remove error class
    if(ct.cityname) {
      this.results=[];
      let city:string = ct.cityname.trim().replace(/(^|\s)\S/g, l => l.toUpperCase());
      this.dataRequest.sendRequest('https://api.openweathermap.org/data/2.5/find?q='+city+'&type=accurate&appid='+this.apikey)
      .then(data => {
        this.results = data.list;
        if(this.results.length == 0) {
         this.msg = "City doesn't found!";
         $('[name=cityname]').val(''); 
        }
        else {
          this.cityData = this.results  
        }
      },
    error => {});
    }
    else{
      $('form:nth-child(1)').addClass('has-error');
      this.msg = "Please enter city name!";
    }
   
  }

  /**This method is used to select city 
   * and request for current weather data from openWeatherMap api 
   */
  onSelect(selectData){
   this.cityId = selectData.id;
   let lon:string = parseFloat(selectData.coord.lon).toFixed(4);
   let lat:string = parseFloat(selectData.coord.lat).toFixed(4);
   this.toLon = parseFloat(lon);
   this.toLat = parseFloat(lat);
   this.getWeather();
  }
  
  ngOnInit() { 
    //Load default city to get current weather.
    this.getWeather();

    //Clickable table row to get row description
    $(document).on("click","#slidetoggle", function(e) {
      $(this).siblings().slideToggle('slow');
    });
    
    //To validate the search box
    this.form = new FormGroup({
      cityname : new FormControl("", Validators.compose([
        Validators.required
      ])) 
    });
  }

}
