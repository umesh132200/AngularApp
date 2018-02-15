import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataRequestService {
  dt:any;
  private data = new BehaviorSubject<any>(this.dt);
  data1 = this.data.asObservable();

  constructor(private httpClient: HttpClient) {  }
  
  public getLocalStorageData() {
    let weatherData = JSON.parse(localStorage.getItem('data'));
    return weatherData;
  }

  //Data cast method
  dataCast(data){
    if(typeof(Storage) !== 'undefined'){
      localStorage.setItem('data',JSON.stringify(data)); 
      this.data.next(data);
    }
    else{
      console.log("local storage not supported by browser");
    }
    
  }

  //simple url without options
  public sendRequest(urlPath: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(urlPath)
      .subscribe(
        res => {
          if(!res){
            reject("error occured "+res );
          }
          resolve(res);
        }
      )
    } ).catch((reason) => {});  
  }
  
  //simple url without options
  public getResult(item:string[]) {
      let allData = item.map(item => {
        return this.httpClient.get('https://api.openweathermap.org/data/2.5/forecast?id='+item+'&appid=79cce9d1cd2fb9e584cca5a598f53932')
        .map(res => {return res});
      });
      return Observable.forkJoin(allData);
  }
}