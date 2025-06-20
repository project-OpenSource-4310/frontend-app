import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { DriverService } from '../../../authentication/services/driver.service';
import { MaintenanceRequest } from '../../models/maintenance-request.entity';
import { GobackButtonComponent } from '../../../../shared/components/buttons/goback-button/goback-button.component';
import { NgIf } from '@angular/common';
import {VehicleService} from '../../../driver/services/vehicle.service';

@Component({
  selector: 'app-maintenance-request-sent',
  templateUrl: './maintenance-request-sent.component.html',
  styleUrl: './maintenance-request-sent.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    GobackButtonComponent,
    NgIf
  ]
})
export class MaintenanceRequestSentComponent implements OnInit {
  request!: MaintenanceRequest;
  driverName: string = '';
  vehicleInfo: string = '';

  constructor(
    private maintenanceRequestService: MaintenanceRequestService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedMaintenanceRequestId');
    if (id) {
      const numericId = Number(id);

      this.maintenanceRequestService.getById(numericId).subscribe(request => {
        this.request = request;

        this.driverService.getById(request.driverId).subscribe(driver => {
          this.driverName = `${driver.firstName} ${driver.lastName}`;
        });

        this.vehicleService.getById(request.vehicleId).subscribe(vehicle => {
          this.vehicleInfo = `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
        });
      });
    }
  }
}
