import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { MapComponent } from './pages/map/map.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { DeskMapComponent } from './pages/desk-map/desk-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AnalysisComponent,
    DeskMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
