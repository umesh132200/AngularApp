import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
//import {parseString} from "xml2js";
//import * as x2js  from 'xml2js';
declare var $:any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }
  arr:any[];
  detail1:any[]=[];
  detail2:any[]=[];
  cityName:any[];
  weatherDes:any[];
  sunRise:any[];
  sunSet:any[];
  temp:any[];
  tableData:any[] = new Array();
  tdata:any[] = new Array();  
  weatherData:any='';
  cityWiseData:any='';

  ngOnInit() {
    let x2js = new X2JS();
    let cityWeather = this.httpClient.get('http://api.openweathermap.org/data/2.5/find?lat=27.5&lon=77.5&cnt=5&mode=xml&appid=a71be9c0523a5505e58265eb91dbca4f',{responseType:"text"});
    let dayWeather = this.httpClient.get('https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22');
   
    forkJoin([cityWeather,dayWeather]).subscribe(
    (response =>{
      //Convert Xml string to JSON
      this.weatherData = x2js.xml_str2json(response[0]);  
     
      //To access all array item for city weather
      this.weatherData.cities.list.item.forEach((item, i:number) => {
         this.cityName = this.weatherData.cities.list.item[i].city._name;
         this.weatherDes = this.weatherData.cities.list.item[i].weather._value;
         this.sunRise = this.weatherData.cities.list.item[i].city.sun._rise;
         this.sunSet = this.weatherData.cities.list.item[i].city.sun._set;
         this.temp = this.weatherData.cities.list.item[i].temperature._value;
         this.arr =[this.cityName,this.weatherDes,this.sunRise,this.sunSet,this.temp];
         this.tableData.push(this.arr);  
        });
      this.detail1= this.tableData;

      //To access all array item for day wise weather
      this.cityWiseData = response[1];
      this.cityWiseData.list.forEach((items, j:number)=>{
        let time:string[] = this.cityWiseData.list[j].dt_txt;
        let des:string[] = this.cityWiseData.list[j].weather["0"].description; 
        let temporature:string[] = this.cityWiseData.list[j].main.temp; 
        let min_temp:string[] = this.cityWiseData.list[j].main.temp_min;
        let pressure:string[] = this.cityWiseData.list[j].main.pressure;  
        let arr = [time, des, temporature,min_temp, pressure];
        this.tdata.push(arr);
      });
       this.detail2 = this.tdata;
        console.log(this.tdata);
        //console.log(this.weatherData);
        //console.log(this.cityWiseData);
    })  
    );

  //To get table row description
  $(document).on("click","tr#getData", function(e){
    //alert(e.target.innerHTML);
      $(this).siblings().slideToggle(20);
 });
  }

}
