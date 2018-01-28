import { Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { DataFinder } from './datafinder';


declare var $:any;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private httpClient:HttpClient, private dataFinder:DataFinder) { }
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
  id = [];
  name = [];
  country = [];
  coord = [];
  x2js = new X2JS();
  results = [];
  cityData = [];
  arrData =[];
  searchCity(){
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
    console.log(this.cityData);  
    });
  }

  ngOnInit() {
   
    let cityWeather = this.httpClient.get('http://api.openweathermap.org/data/2.5/find?lat=22.0&lon=82.6&cnt=40&mode=xml&appid=79cce9d1cd2fb9e584cca5a598f53932',{responseType:"text"});
    let dayWeather = this.httpClient.get('https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/forecast?id=1274837&appid=79cce9d1cd2fb9e584cca5a598f53932');
   
    forkJoin([cityWeather,dayWeather]).subscribe(
    (response =>{
      //Convert Xml string to JSON
      this.weatherData = this.x2js.xml_str2json(response[0]);  
    
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
        //console.log(this.tdata);
    })  
    );

  //To get table row description
  $(document).on("click","tr#getData", function(e){
    //alert(e.target.innerHTML);
    $(this).siblings().slideToggle(20);
 });
  }

}
