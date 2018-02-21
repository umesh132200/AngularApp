import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataRequestService {
  dt:any;
  private data = new BehaviorSubject<any>(this.dt);
  dataFromWeather = this.data.asObservable();

  constructor(private httpClient: HttpClient) {  }
  
  public getLocalStorageData() {
    return JSON.parse(localStorage.getItem('data'));
  }

  //Data cast method
  dataCast(data) {
    if(typeof(Storage) !== 'undefined') {
      localStorage.setItem('data',JSON.stringify(data)); 
      this.data.next(data);
    }
    else {
      document.write('Browser not supported web storage!');
    }
    
  }

  //simple url without options
  public sendRequest(urlPath: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(urlPath)
      .subscribe(
        res => {
          if(!res){
            reject(res);
          }
          resolve(res);
        },
        error => {}
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