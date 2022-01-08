import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/Models/WeatherData';

@Component({
  selector: 'app-mindailyweather',
  templateUrl: './mindailyweather.component.html',
  styleUrls: ['./mindailyweather.component.css']
})
export class MindailyweatherComponent implements OnInit {
  @Input() weatherData!:WeatherData;
  constructor() { }

  ngOnInit(): void {

  }
  getDay():string{

      const day = new Date(this.weatherData.dt*1000)
      return this.dayToStringDate(day.getDay());
  }
  private dayToStringDate(day:number){
    switch(day){
      case 0: return "V";
      case 1:return 'H';
      case 2: return "K";
      case 3:return "Sz";
      case 4 :return "Cs";
      case 5: return "P";
      case 6: return "Szo";
      default: return "Nincs ilyen nap";
    }
  }
  capitalizeFirstLetter(word: string) {
    if (word == null || word == undefined) {
      return "";
    }
    return word = word[0].toUpperCase() + word.slice(1);
  }
}
