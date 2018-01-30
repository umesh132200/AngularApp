import { Injectable } from '@angular/core';
import xml2js from 'xml2js';

@Injectable()
export class TransformProvider {

  public convertToJson(data: string): Object {

    let res;

    // setting the explicitArray option prevents an array structure
    xml2js.parseString(data, { explicitArray: false }, (error, result) => {
      
      if (error) {
        throw new Error(error);
      } else {
        res = result;
      }

    });

    return res;

  }

}