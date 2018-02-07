import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class DataRequestService {
  constructor(private httpClient: HttpClient) {
  }
  
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
  // return new Promise((resolve, reject) => {
    //   this.httpClient.get(filePath)
    //     .subscribe(
    //       res => {
    //         if (!res) {
    //           reject("Failed with status: " + res  + "\nTrying to find fil at " + filePath);
    //         }
    //         var jsonRes = res.toString();
    //         resolve(res);
    //       }
    //     );
    // }).catch((reason) => console.log(reason));
}