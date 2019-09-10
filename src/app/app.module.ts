import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';
import { MapComponent } from './pages/map/map.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
