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
      return "Sz??lcsend";
    }
    else if (speed <= 6) {
      return "Gyenge szell??, fuvallat";
    }
    else if (speed <= 11) {
      return "Enyhe sz??l";
    }
    else if (speed <= 19) {
      return "Gyenge sz??l";
    }
    else if (speed <= 29) {
      return "M??rs??kelt sz??l";
    }
    else if (speed <= 39) {
      return "??l??nk sz??l";
    }
    else if (speed <= 49) {
      return "Er??s sz??l";
    }
    else if (speed <= 60) {
      return "Viharos sz??l";
    }
    else if (speed <= 72) {
      return "??l??nk viharos sz??l, vihar";
    }
    else if (speed <= 85) {
      return "Heves vihar";
    }
    else if (speed <= 100) {
      return "D??h??ng?? vihar, sz??lv??sz";
    }
    else if (speed <= 115) {
      return "Heves sz??lv??sz";
    }
    else if (speed <= 120) {
      return "Ork??n";
    }
    else {
      return "Nem defini??lt sebess??g";
    }

  }
}
