import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { DriverService } from '../../../authentication/services/driver.service';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {VehicleService} from '../../../driver/services/vehicle.service';

@Component({
  selector: 'app-requests-sent-list',
  imports: [
    ClassicButtonComponent,
    MatCard,
    MatCardActions,
    MatCardContent,
    NgForOf,
    NgIf
  ],
  templateUrl: './requests-sent-list.component.html',
  styleUrl: './requests-sent-list.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class RequestsSentListComponent implements OnInit{
  requests: any[] = [];

  constructor(
    private mechanicService: MechanicService,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private maintenanceRequestService: MaintenanceRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (mechanicId) {
      this.mechanicService.getById(mechanicId).subscribe(mechanic => {
        const requestIds = mechanic.maintenance_requests_sent || [];

        this.maintenanceRequestService.getByIds(requestIds).subscribe(requests => {
          const drivers$ = this.driverService.getAll();
          const vehicles$ = this.vehicleService.getAll();

          forkJoin([drivers$, vehicles$]).subscribe(([drivers, vehicles]) => {
            this.requests = requests.map(request => {
              const vehicle = vehicles.find(v => v.id === request.vehicleId);
              const driver = drivers.find(d => d.id === request.driverId);

              return {
                id: request.id,
                budget: request.budget,
                vehicle: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : 'Desconocido',
                driver: driver ? `${driver.firstName} ${driver.lastName}` : 'Desconocido'
              };
            });
          });
        });
      });
    }
  }

  viewRequest(id: number): void {
    localStorage.setItem('selectedMaintenanceRequestId', id.toString());
    this.router.navigate(['/mechanic-page/maintenance-request']);
  }
}
