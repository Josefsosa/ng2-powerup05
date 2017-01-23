import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherComponent } from './index';

@NgModule({
declarations: [
    WeatherComponent
    ],
imports: [
    BrowserModule
    ],
exports: [
    WeatherComponent
    ]
    })
export class WeatherModule {
}
