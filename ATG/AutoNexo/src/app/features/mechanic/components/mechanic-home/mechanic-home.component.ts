import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {VehiclesListComponent} from '../vehicles-list/vehicles-list.component';

@Component({
  selector: 'app-mechanic-home',
  imports: [
    RouterOutlet,
    VehiclesListComponent
  ],
  templateUrl: './mechanic-home.component.html',
  styleUrl: './mechanic-home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicHomeComponent {

}
