import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-locationchooser',
  templateUrl: './locationchooser.component.html',
  styleUrls: ['./locationchooser.component.css']
})
export class LocationchooserComponent implements OnInit {

  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.locationService.getCurrentCityByPosition(position).subscribe(
        {
          next: (v) => {
            let location = v.results[0].address_components[2].long_name
            this.getDataByCityName(location);
            this.location = location;
          },
          error: (e) => console.error(e),
          complete: () => { }
        }
      );
    }, (err) => {
      console.log(err);
    });
  }
  location = 'Szarvas';
  description = '';
  getDataByCityName(city: String) {
    this.weatherService.getWeatherByCityName(city).subscribe({
      next: (v) => {
        this.weatherService.changeWeather(v);

        this.getFiveDaysForecastDataByLocation(v.coord.lat,v.coord.lon);
      },
      error: (e) => console.error(e),
      complete: () => {}
    })
  }
  getFiveDaysForecastDataByLocation(lat: string,lon:string) {
    this.weatherService.getWeatherForecastByLocation(lat,lon).subscribe({
      next: (v) => {
        this.weatherService.changeForecast(v);

      },
      error: (e) => console.error(e),
      complete: () => {}
    })
  }
  locationChanged(e:any):void{
   
    this.getDataByCityName(e.target.value);
  
  }
}
