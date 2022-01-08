import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherappbodyComponent } from './components/weatherappbody/weatherappbody.component';
import { LocationchooserComponent } from './components/locationchooser/locationchooser.component';
import { CurrentlocationComponent } from './components/currentlocation/currentlocation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeeklyweatherComponent } from './components/weeklyweather/weeklyweather.component';
import { MindailyweatherComponent } from './components/mindailyweather/mindailyweather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherappbodyComponent,
    LocationchooserComponent,
    CurrentlocationComponent,
    WeeklyweatherComponent,
    MindailyweatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
