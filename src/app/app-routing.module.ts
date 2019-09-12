import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { DeskMapComponent } from './pages/desk-map/desk-map.component';


const routes: Routes = [
  {
    path: 'map',
    component: DeskMapComponent
  }, {
    path: 'analysis',
    component: AnalysisComponent
  }, {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
