import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { WeatherData } from '../Models/WeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {

  }
  weatherSubject:Subject<WeatherData> = new Subject<WeatherData>();
  weatherForecastSubject:Subject<WeatherData[]> = new Subject<WeatherData[]>();
  changeWeather(newWeather:WeatherData){
    this.weatherSubject.next(newWeather);
  }
  changeForecast(weathers:WeatherData[]){
    this.weatherForecastSubject.next(weathers);
  }
  getWeatherByCityName(name: String): Observable<WeatherData> {
    return this.http.get<WeatherData>(`https://localhost:49153/weather/${name}`);
  }
  getWeatherForecastByLocation(lat:string,lon:string): Observable<WeatherData[]> {

    return this.http.get<WeatherData[]>(`https://localhost:49153/weather/forecast/${lat}/${lon}`).pipe(
      map((data:any)=>{
        return data.daily.filter((e:any,i:number)=>{
          if(i != 0 && i <=5){
            return true;  
          }else return false;
        });
      })
    );
  }
}
