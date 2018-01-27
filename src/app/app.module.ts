import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {Http, HttpModule, Response,Headers,RequestOptions} from '@angular/Http'

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { DataFinder } from './weather/datafinder';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([{path:'weather', component: WeatherComponent}]), 
    HttpModule
  ],
  providers: [DataFinder],
  bootstrap: [AppComponent]
})
export class AppModule { }
