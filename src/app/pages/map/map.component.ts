import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Chart } from 'angular-highcharts';
 
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  cubes;
  showMapView;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.showMapView = true;
    this.fetchSeatsStatus();

    setInterval(() => {
      this.fetchSeatsStatus();
    }, 10000)
    
  }

  fetchSeatsStatus() {
    this.http.get('/assets/mocks/seats.json').subscribe(
      data => {
        this.cubes = data;
      }
    )
  }

  toggleMapView() {
    this.showMapView = !this.showMapView;
  }

}
