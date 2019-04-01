import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  The RemoteProvider provider is responsible for fetching data using HTTP request.
*/
@Injectable()
export class RemoteProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RemoteProvider Provider');
  }

  // Gets Daily Quote from http://quotes.rest/qod.json 
  getQuote(): Observable<any> {
    return this.http.get("http://quotes.rest/qod.json");
  }

  // Gets Reuters news from https://newsapi.org/
  getReuters(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=a7f843a2ce9e4ec39583ff773b08b148");
  }

  // Gets National Geographic news from https://newsapi.org/
  getNationalGeographic(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=a7f843a2ce9e4ec39583ff773b08b148");
  }

  // Gets BBCSport news from https://newsapi.org/
  getBBCSport(): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=a7f843a2ce9e4ec39583ff773b08b148");
  }

}
