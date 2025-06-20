import {Component, ViewEncapsulation} from '@angular/core';
import {AddButtonComponent} from '../../../../shared/components/buttons/add-button/add-button.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {VehiclesListComponent} from '../vehicles-list/vehicles-list.component';

@Component({
  selector: 'app-driver-home',
  imports: [
    AddButtonComponent,
    RouterLink,
    RouterOutlet,
    VehiclesListComponent
  ],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverHomeComponent {

}
