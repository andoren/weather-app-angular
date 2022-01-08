import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/Models/WeatherData';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-currentlocation',
  templateUrl: './currentlocation.component.html',
  styleUrls: ['./currentlocation.component.css'], animations: [
    trigger('animateFromTop', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)', offset: 0 }),
        animate(800, style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('animateFromRight', [
      transition('void => *', [
        style({ transform: 'translateX(100%)', offset: 0 }),
        animate(500, style({ transform: 'translateX(0)' }))
      ])]),
    trigger('animateFromLeft', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)', offset: 0 }),
        animate(500, style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('animateFromBottom', [
      transition('void => *', [
        style({ transform: 'translateY(100%)', offset: 0 }),
        animate(500, style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CurrentlocationComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  constructor(private weatherService: WeatherService) { }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  currentWeatherData: WeatherData | undefined;
  ngOnInit(): void {
    this.sub = this.weatherService.weatherSubject.subscribe({
      next: (w) => {
        this.currentWeatherData = undefined;
        setTimeout(()=>{
          this.currentWeatherData = w;
        },100);

      },
      error: (e) => {
        console.log(e);
      },
      complete: () => { }
    });
  }
  capitalizeFirstLetter(word: string) {
    if (word == null || word == undefined) {
      return "";
    }
    return word = word[0].toUpperCase() + word.slice(1);
  }
  getFormatedTimeFromTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
  }
  getWindTextBySpeed(speed: number) {

    if (speed <= 1) {
      return "Szélcsend";
    }
    else if (speed <= 6) {
      return "Gyenge szellő, fuvallat";
    }
    else if (speed <= 11) {
      return "Enyhe szél";
    }
    else if (speed <= 19) {
      return "Gyenge szél";
    }
    else if (speed <= 29) {
      return "Mérsékelt szél";
    }
    else if (speed <= 39) {
      return "Élénk szél";
    }
    else if (speed <= 49) {
      return "Erős szél";
    }
    else if (speed <= 60) {
      return "Viharos szél";
    }
    else if (speed <= 72) {
      return "Élénk viharos szél, vihar";
    }
    else if (speed <= 85) {
      return "Heves vihar";
    }
    else if (speed <= 100) {
      return "Dühöngő vihar, szélvész";
    }
    else if (speed <= 115) {
      return "Heves szélvész";
    }
    else if (speed <= 120) {
      return "Orkán";
    }
    else {
      return "Nem definiált sebesség";
    }

  }
}
