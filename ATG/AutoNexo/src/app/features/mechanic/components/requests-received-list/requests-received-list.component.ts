import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassicButtonComponent } from "../../../../shared/components/buttons/classic-button/classic-button.component";
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { NgForOf } from "@angular/common";
import { DriverService } from '../../../authentication/services/driver.service';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {AssignmentRequestService} from '../../../driver/services/assignment-request.service';
import {VehicleService} from '../../../driver/services/vehicle.service';

@Component({
  selector: 'app-requests-received-list',
  imports: [
    ClassicButtonComponent,
    MatCard,
    MatCardActions,
    MatCardContent,
    NgForOf
  ],
  templateUrl: './requests-received-list.component.html',
  styleUrl: './requests-received-list.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class RequestsReceivedListComponent implements OnInit {
  requests: any[] = [];

  constructor(
    private requestService: AssignmentRequestService,
    private driverService: DriverService,
    private mechanicService: MechanicService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (mechanicId) {
      this.mechanicService.getById(mechanicId).subscribe(mechanic => {
        const requestIds = mechanic.assignment_requests_received || [];

        this.requestService.getByIds(requestIds).subscribe(requests => {
          const drivers$ = this.driverService.getAll();
          const vehicles$ = this.vehicleService.getAll();

          forkJoin([drivers$, vehicles$]).subscribe(([drivers, vehicles]) => {
            this.requests = requests.map(request => {
              const driver = drivers.find(d => d.id === request.driverId);
              const vehicle = vehicles.find(v => v.id === request.vehicleId);

              return {
                id: request.id,
                driver: driver ? `${driver.firstName} ${driver.lastName}` : 'Desconocido',
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
    this.router.navigate(['/mechanic-page/assignment-request']);
  }
}
