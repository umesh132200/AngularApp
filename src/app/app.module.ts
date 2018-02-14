import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { AboutComponent } from './about/about.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';

import { DataRequestService } from './services/data-request.service';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    AboutComponent,
    FiveDayWeatherComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([{ path: '',   redirectTo: '/weather', pathMatch: 'full' },
    {path:'weather', component: WeatherComponent},
    {path:'about', component: AboutComponent},
    {path:'five-day-weather', component: FiveDayWeatherComponent}])
  ],
  providers: [DataRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
