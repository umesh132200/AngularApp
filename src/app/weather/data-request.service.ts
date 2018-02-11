import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
  
  //To search data from file
  // getCitiesName(url: string){
  // return this.httpClient.get(url);
  // }
  //     private extractData(res: Response) {
  //             console.log(res);
  //         }
  //         private handleError (error: Response | any) {
  //       console.error(error.message || error);
  //       return Observable.throw(error.message || error);
  //         }

}