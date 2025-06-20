import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { DriverService } from '../../../authentication/services/driver.service';
import { Vehicle } from '../../models/vehicle.entity';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule, NgFor} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatCardModule,
    MatGridListModule,
    NgFor,
    CommonModule,
    MatProgressSpinnerModule,
    ClassicButtonComponent
  ]
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const driverId = user ? Number(JSON.parse(user).id) : null;

    if (driverId) {
      this.driverService.getById(driverId).subscribe(driver => {
        const vehicleIds = driver.vehicles_owned || [];

        this.vehicleService.getByIds(vehicleIds).subscribe(vehicles => {
          this.vehicles = vehicles;
        });
      });
    }
  }
  viewVehicle(id: number): void {
    localStorage.setItem('selectedVehicleId', id.toString());
    this.router.navigate(['/driver-page/vehicle']);
  }
}
