import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassicButtonComponent } from "../../../../shared/components/buttons/classic-button/classic-button.component";
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import { DriverService } from '../../../authentication/services/driver.service';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {MaintenanceRequestService} from '../../../mechanic/services/maintenance-request.service';

@Component({
  selector: 'app-requests-received-list',
  standalone: true,
  imports: [
    ClassicButtonComponent,
    MatCard,
    MatCardActions,
    MatCardContent,
    NgForOf,
    NgIf
  ],
  templateUrl: './requests-received-list.component.html',
  styleUrl: './requests-received-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RequestsReceivedListComponent implements OnInit{
  requests: any[] = [];

  constructor(
    private requestService: MaintenanceRequestService,
    private driverService: DriverService,
    private mechanicService: MechanicService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const driverId = user ? Number(JSON.parse(user).id) : null;

    if (driverId) {
      this.driverService.getById(driverId).subscribe(driver => {
        const requestIds = driver.maintenance_requests_received || [];

        this.requestService.getByIds(requestIds).subscribe(requests => {
          const mechanics$ = this.mechanicService.getAll();
          const vehicles$ = this.vehicleService.getAll();

          forkJoin([mechanics$, vehicles$]).subscribe(([mechanics, vehicles]) => {
            this.requests = requests.map(request => {
              const mechanic = mechanics.find(m => m.id === request.mechanicId);
              const vehicle = vehicles.find(v => v.id === request.vehicleId);

              return {
                id: request.id,
                mechanic: mechanic ? `${mechanic.firstName} ${mechanic.lastName}` : 'Desconocido',
                vehicle: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : 'Desconocido'
              };
            });
          });
        });
      });
    }
  }

  viewRequest(id: number): void {
    localStorage.setItem('selectedRequestId', id.toString());
    this.router.navigate(['/driver-page/maintenance-request']);
  }
}
