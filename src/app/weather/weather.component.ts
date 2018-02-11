import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin'; //used to get multiple response from different url.
import { DataRequestService } from './data-request.service'; //this file contaile js promise to get city record.
import * as xml2js from 'xml2js';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private httpClient:HttpClient, private dataRequest:DataRequestService) {}
  form;
  msg:any= "";
  city:string="";
  arr:any[];
  detail1:any[]=[];
  detail2:any[]=[];
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

  /**This method is used to get "current weather" data of all city in latitute & longitute circle
   * and getting data from openWeatherMap api. 
   */
  getWeather() {
    this.tableData =[];
    this.mulResponse = [];
    this.httpClient.get('https://api.openweathermap.org/data/2.5/find?lat='+this.toLat+'&lon='+this.toLon+'&cnt=40&mode=xml&appid=79cce9d1cd2fb9e584cca5a598f53932',{responseType:"text"})
    .map(response => {
      var jsRes:any;
      xml2js.parseString( response, function (err, result) {
        jsRes = result; 
      });
    return jsRes;
    })
    .subscribe(result => {
      this.weatherData = result;
      this.weatherData.cities.list[0].item.forEach((item, i:number) => {
         this.cityIds = this.weatherData.cities.list[0].item[i].city[0].$.id;
         this.cityName = this.weatherData.cities.list[0].item[i].city[0].$.name;
         this.weatherDes = this.weatherData.cities.list[0].item[i].weather[0].$.value;
         this.sunRise = this.weatherData.cities.list[0].item[i].city[0].sun[0].$.rise;
         this.sunSet = this.weatherData.cities.list[0].item[i].city[0].sun[0].$.set;
         this.temp = this.weatherData.cities.list[0].item[i].temperature[0].$.value;
         this.arr =[this.cityIds, this.cityName, this.weatherDes, this.sunRise, this.sunSet, this.temp];
         this.tableData.push(this.arr);  
      });
      this.detail1= this.tableData;
    }
  )
 }
  /**This method is used to get "5 day/ 3 hour weather" data of selected city
   * and getting data from openWeatherMap api. 
   */
  getDayWise(item){
    this.dataRequest.sendRequest('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?id='+item[0]+'&appid=79cce9d1cd2fb9e584cca5a598f53932') 
    .then(data => {
      this.cityWiseData  = data; 
      this.tdata = []; 
      var time:string[];
      var des:string[];
      var temporature:string[];
      var min_temp:string[];
      var pressure:string[];
      var arr:any[];
      this.cityWiseData.list.forEach((items, j:number)=>{
          time = this.cityWiseData.list[j].dt_txt;
          des = this.cityWiseData.list[j].weather["0"].description; 
          temporature = this.cityWiseData.list[j].main.temp; 
          min_temp = this.cityWiseData.list[j].main.temp_min;
          pressure = this.cityWiseData.list[j].main.pressure;  
          arr = [time, des, temporature,min_temp, pressure];
          this.tdata.push(arr);
        });
      });      
      this.detail2 = this.tdata;      
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
      this.dataRequest.sendRequest("http://api.openweathermap.org/data/2.5/find?q="+city+"&type=accurate&appid=79cce9d1cd2fb9e584cca5a598f53932")
      .then(data => {
        this.results = data.list;
        if(this.results.length == 0) {
         this.msg = "City doesn't found!";
         $('[name=cityname]').val(''); 
        }
        else {
          this.cityData = this.results  
        }
      });
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
   this.selectData = selectData;
   this.cityId = this.selectData[0];
   let lon:string = parseFloat(this.selectData[3]).toFixed(4);
   let lat:string = parseFloat(this.selectData[4]).toFixed(4);
   this.toLon = parseFloat(lon);
   this.toLat = parseFloat(lat);
   this.getWeather();
  }
  
  ngOnInit() { 
    //Load default city to get current weather.
    this.getWeather();

    //Clickable table row to get row description
    $(document).on("click","#getData", function(e) {
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
