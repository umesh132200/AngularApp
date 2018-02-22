import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataRequestService {
  
  data:any;
  constructor(private httpClient: HttpClient, private router:Router, private route:ActivatedRoute) { }
  
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
  public getResult(id) {
      this.httpClient.get('https://api.openweathermap.org/data/2.5/forecast?id='+id+'&appid=79cce9d1cd2fb9e584cca5a598f53932')
      .subscribe(
        res => {
          this.data = res;
          this.router.navigate(['/five-day-weather']);
        },
        error => {}
      );
    
 }

 }