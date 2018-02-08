import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, Response,Headers,RequestOptions } from '@angular/Http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { AboutComponent } from './about/about.component';

import { DataRequestService } from './weather/data-request.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    AboutComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([{ path: '',   redirectTo: '/weather', pathMatch: 'full' },
    {path:'weather', component: WeatherComponent},
    {path:'about', component: AboutComponent},]), 
    HttpModule
  ],
  providers: [DataRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
