import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-desk-map',
  templateUrl: './desk-map.component.html',
  styleUrls: ['./desk-map.component.scss']
})
export class DeskMapComponent implements OnInit {

  floor;
  quadrant;
  cubes;
  startPoint;
  deskTotal = 0;
  takenSeats = [];
  deskLeft = 0;
  showMore;
  quadrants;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.floor = '3rd';
    this.quadrant = 'B'
    this.startPoint = 2;
    this.showMore = false;

    this.fetchDesks();
    this.fetchDesksStatus();
    this.fetchQuadrants();
    
    setInterval(() => {
      this.fetchDesksStatus();
    }, 5000)
    
  }

  fetchDesks() {
    this.http.get('/assets/mocks/seats.json').subscribe(
      data => {
        this.cubes = data;
        this.cubes.forEach(cube => {
          this.deskTotal += cube.desks.length;
          this.deskLeft = this.deskTotal;
        })
      }
    )
  }

  fetchDesksStatus() {
    this.http.get(environment.aws_endpoint).subscribe(
      seats => {
        if (seats) {
          seats['body'].reservedDesks.forEach(seat => {
            this.cubes.forEach(cube => {
              cube.desks.forEach(desk => {
                if(desk.id === seat.deskId.S) {
                  if (!this.takenSeats.includes(desk.id)) {
                    this.takenSeats.push(desk.id);
                  }
                  desk.reserved = true;
                }
              });
            })
          });
        }
      }
    )
  }

  fetchQuadrants() {
    this.http.get('/assets/mocks/3rd-floor-quadrants.json').subscribe(
      data => {
        console.log(data);
        this.quadrants = data;
      }
    )
  }

  fetchQuadrantsStatus() {
    this.http.get(environment.aws_endpoint).subscribe(
      seats => {
        if (seats) {
          seats['body'].reservedDesks.forEach(seat => {
            this.cubes.forEach(cube => {
              cube.desks.forEach(desk => {
                if(desk.id === seat.deskId.S) {
                  if (!this.takenSeats.includes(desk.id)) {
                    this.takenSeats.push(desk.id);
                  }
                  desk.reserved = true;
                }
              });
            })
          });
        }
      }
    )
  }
}
