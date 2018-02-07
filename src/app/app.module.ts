import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response,Headers,RequestOptions } from '@angular/Http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

import { DataRequestService } from './weather/data-request.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([{path:'weather', component: WeatherComponent}]), 
    HttpModule
  ],
  providers: [DataRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
