import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css']
})
export class ProductgridComponent implements OnInit {
  columns = 4;
  tiles = [
      {text: 'One', header: 'demo', color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
  constructor() { }

  ngOnInit() {
  }

}
