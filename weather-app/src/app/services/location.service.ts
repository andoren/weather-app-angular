import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  apiKey:string = "AIzaSyDMSjfc5eHKvEc43j9KU8zitOWci__UvD4";

  getCurrentCityByPosition(position:any):Observable<any>{
     return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude}%2C${position.coords.longitude}&language=en&key=${this.apiKey}`);
  }
}
