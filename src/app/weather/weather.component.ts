import { Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin'; //used to get multiple response from different url.
import { DataFinder } from './datafinder'; //this file contaile js promise to get city record.

declare var $:any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private httpClient:HttpClient, private dataFinder:DataFinder) {}
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
  x2js = new X2JS();
  results = [];
  cityData = [];
  arrData =[];
  selectData = [];
  toLon:number = 77.2;
  toLat:number = 28.6;
  cityId:number = 1261481;

  /**This method is used to get "current weather" data of all city in latitute & longitute circle
   * and getting data from openWeatherMap api. 
   */
  getWeather() {
    this.tableData =[];
    this.mulResponse = [];
    let cityWeather = this.httpClient.get('http://api.openweathermap.org/data/2.5/find?lat='+this.toLat+'&lon='+this.toLon+'&cnt=20&mode=xml&appid=79cce9d1cd2fb9e584cca5a598f53932',{responseType:"text"});
    forkJoin([cityWeather])
    .subscribe((response =>{
      this.weatherData = this.x2js.xml_str2json(response[0]);
      this.weatherData.cities.list.item.forEach((item, i:number) => {
         this.cityIds = this.weatherData.cities.list.item[i].city._id;
         this.cityName = this.weatherData.cities.list.item[i].city._name;
         this.weatherDes = this.weatherData.cities.list.item[i].weather._value;
         this.sunRise = this.weatherData.cities.list.item[i].city.sun._rise;
         this.sunSet = this.weatherData.cities.list.item[i].city.sun._set;
         this.temp = this.weatherData.cities.list.item[i].temperature._value;
         this.arr =[this.cityIds, this.cityName, this.weatherDes, this.sunRise, this.sunSet, this.temp];
         this.tableData.push(this.arr);  
      });
      this.detail1= this.tableData;
    }) 
  )
 };
  /**This method is used to get "5 day/ 3 hour weather" data of selected city
   * and getting data from openWeatherMap api. 
   */
  getDayWise(item){
    this.httpClient.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?id='+item[0]+'&appid=79cce9d1cd2fb9e584cca5a598f53932') 
    .subscribe(data => {
      this.cityWiseData  = data;  
      this.cityWiseData.list.forEach((items, j:number)=>{
          let time:string[] = this.cityWiseData.list[j].dt_txt;
          let des:string[] = this.cityWiseData.list[j].weather["0"].description; 
          let temporature:string[] = this.cityWiseData.list[j].main.temp; 
          let min_temp:string[] = this.cityWiseData.list[j].main.temp_min;
          let pressure:string[] = this.cityWiseData.list[j].main.pressure;  
          let arr = [time, des, temporature,min_temp, pressure];
          this.tdata.push(arr);
        });
      });     
      this.detail2 = this.tdata;      
  }

  /**This method is used to search city name from local json file 
   * and get detail of the city like id, name, country and coord. 
   */
  searchCity(){
    this.results=[];
    let city:string = $('#city').val();
    var searchField = "name";
    this.dataFinder.getJSONDataAsync("./assets/data/city.list.json").then(data => {
    for (var i=0 ; i < data.length ; i++) {
        if (data[i]['name'] == city) {
            if(data[i].id && data[i].name && data[i].country && data[i].coord.lon && data[i].coord.lat) {
              let id = data[i].id;
              let name = data[i].name;
              let country = data[i].country;
              let lon = data[i].coord.lon;
              let lat = data[i].coord.lat;
              this.arrData = [id, name, country, lon, lat];
              this.results.push(this.arrData);
          }           
       }      
    }
    this.cityData = this.results  
    });
  }

  /**This method is used to select city 
   * and request for current weather data from openWeatherMap api 
   */
  onSelect(selectData){
   this.selectData = selectData;
   this.cityId = this.selectData[0];
   this.toLon = this.selectData[3].toFixed(1);
   this.toLat = this.selectData[4].toFixed(1);
   this.getWeather();

  }
  
   

  ngOnInit() { 
    //Load default city to get current weather.
    this.getWeather();

    //Clickable table row to get row description
    $(document).on("click","tr#getData", function(e) {
      $(this).siblings().slideToggle('slow');
    });
  }

}
