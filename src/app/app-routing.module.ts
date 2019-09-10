import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';


const routes: Routes = [
  {
    path: 'map',
    component: MapComponent
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
