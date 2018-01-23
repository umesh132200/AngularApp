import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }
  arr:any[];
  detail:any[]=[];
  cityName:any[];
  weatherDes:any[];
  sunRise:any[];
  sunSet:any[];
  temp:any[];
  tableData:any[] = new Array();  
  weatherData:any='';

  ngOnInit() {
    let x2js = new X2JS();
    this.httpClient.get('http://api.openweathermap.org/data/2.5/find?lat=27.5&lon=77.5&cnt=5&mode=xml&appid=a71be9c0523a5505e58265eb91dbca4f',{responseType:"text"})
    .subscribe(
    (res =>{
      //Convert Xml string to JSON
      this.weatherData = x2js.xml_str2json(res);  
     
      //To access all array item
      this.weatherData.cities.list.item.forEach((item, i:number) => {
         this.cityName = this.weatherData.cities.list.item[i].city._name;
         this.weatherDes = this.weatherData.cities.list.item[i].weather._value;
         this.sunRise = this.weatherData.cities.list.item[i].city.sun._rise;
         this.sunSet = this.weatherData.cities.list.item[i].city.sun._set;
         this.temp = this.weatherData.cities.list.item[i].temperature._value;
         this.arr =[this.cityName,this.weatherDes,this.sunRise,this.sunSet,this.temp];
         this.tableData.push(this.arr);  
        });
        this.detail= this.tableData;
    })  
    );

  //To get table row description
  $(document).on("click","tr#getData", function(e){
    //alert(e.target.innerHTML);
      $(this).siblings().slideToggle(20);
 });
  }

}
