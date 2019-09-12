import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  floor;
  quadrant;
  cubes;
  deskTotal = 0;
  takenSeats = [];
  deskLeft = 0;

  pieColors = (function () {
      let colors = [],
          base = Highcharts.getOptions().colors[2],
          i;

      for (i = 0; i < 10; i += 1) {
          colors.push(new Highcharts.Color(base).brighten((i - 3) / 7).get());
      }
      return colors;
  }());

  // Business Units Taken Charts
  public businessTakenContainerOptions: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '<p style="color:#bdc3c7;">Seats Taken by Business Units</p>'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: this.pieColors,
            colors: ['#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6'],
            dataLabels: {
                enabled: true,
                format: '<b style="color:#2ecc71;">{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Seats Taken',
        colorByPoint: true,
        data: [{
            name: 'Developer',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Business Analysis',
            y: 11.84
        }, {
            name: 'Tech Support',
            y: 10.85
        }, {
            name: 'Others',
            y: 4.67
        }, {
            name: 'Banker',
            y: 4.18
        }]
    }]
  }

  // Roles Taken Charts
  public rolesContainerOptions: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '<p style="color:#bdc3c7;">Seats Taken by Roles</p>'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: this.pieColors,
            colors: ['#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6'],
            dataLabels: {
                enabled: true,
                format: '<b style="color:#2ecc71;">{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Seats Taken',
        colorByPoint: true,
        data: [{
            name: 'Squad Member',
            y: 71.41,
            sliced: true,
            selected: true
        }, {
            name: 'Project Manager',
            y: 5.84
        }, {
            name: 'Chapter Lead',
            y: 10.85
        }, {
            name: 'Chapter Area Lead',
            y: 3.67
        }, {
            name: 'Tribe Lead',
            y: 4.18
        }]
    }]
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.floor = '3rd';
    this.quadrant = 'B'
    this.fetchSeats();
    this.fetchSeatsStatus();

    setInterval(() => {
      this.fetchSeatsStatus();
    }, 5000)

    Highcharts.chart('businessTakenContainer', this.businessTakenContainerOptions);
    Highcharts.chart('rolesContainer', this.rolesContainerOptions);
  }

  fetchSeats() {
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

  fetchSeatsStatus() {
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
