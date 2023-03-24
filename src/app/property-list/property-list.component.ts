import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {

  properties: Array<any> = [
    {
    "Id":1,
    "Name":"Zelzah Court",
    "Type":"House",
    "Price": 12000
    },
    {
      "Id":2,
      "Name":"Maravilla",
      "Type":"House",
      "Price": 19000
    },
    {
      "Id":3,
      "Name":"Candlewood",
      "Type":"House",
      "Price": 71000
    },
    {
      "Id":4,
      "Name":"Meridian Pointee",
      "Type":"House",
      "Price": 21000
    },
    {
      "Id":5,
      "Name":"Meridian Place",
      "Type":"House",
      "Price": 10000
    },
    {
      "Id":6,
      "Name":"Parc ridge",
      "Type":"House",
      "Price": 18000
    }
]

}
