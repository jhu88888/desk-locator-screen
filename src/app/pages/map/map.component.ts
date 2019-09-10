import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
    this.fetchSeats();
    this.fetchSeatsStatus();

    setInterval(() => {
      this.fetchSeatsStatus();
    }, 10000)
    
  }

  fetchSeats() {
    this.http.get('/assets/mocks/seats.json').subscribe(
      data => {
        this.cubes = data;
      }
    )
  }

  fetchSeatsStatus() {
    this.http.get(environment.aws_endpoint).subscribe(
      seats => {
        if (seats) {
          seats['body'].reservedDesks.forEach(seat => {
            this.cubes.forEach(cube => {
              cube.desks.forEach(desk => {
                if(desk.id === seat.deskId.S) {
                  console.log(desk)
                  desk.reserved = true;
                }
              });
            })
          });
        }
      }
    )
  }

  toggleMapView() {
    this.showMapView = !this.showMapView;
  }

}
