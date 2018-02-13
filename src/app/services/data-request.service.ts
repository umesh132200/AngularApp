import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()

export class DataRequestService {

  constructor(private httpClient: HttpClient) {}
  
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