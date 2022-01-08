import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/Models/WeatherData';
import { WeatherService } from 'src/app/services/weather.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-weeklyweather',
  templateUrl: './weeklyweather.component.html',
  styleUrls: ['./weeklyweather.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('void => *', [
          query(':enter', 
              style({ opacity: 0 }), {optional:true}),
          query(':enter',stagger('300ms',[
            animate('1s ease-in',keyframes([
              style({opacity:0, transform:'translateY(-75px)',offset:0}),
              style({opacity:.5, transform:'translateY(30px)',offset:0.3}),
              style({opacity:1, transform:'translateY(0)',offset:1})
            ]))
          ]),{optional:true})    
            
      ])
  ])
  ]
})
export class WeeklyweatherComponent implements OnInit, OnDestroy,AfterViewInit {

  sub!:Subscription;
  weathers:WeatherData[] = [];
  constructor(private weatherService:WeatherService, private cdr:ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.sub = this.weatherService.weatherForecastSubject.subscribe(
      {
        next:(v)=>{
   
          
          this.weathers= [];
          setTimeout(()=>{this.weathers = v;},100) ;
          
        },
        error:(e)=>{
          console.log(e);
        },
        complete:()=>{

        }
      }
    );
  }
 
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }   
  }

  ngOnInit(): void {
    
  }

}
