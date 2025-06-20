import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { DriverService } from '../../../authentication/services/driver.service';
import { VehicleService } from '../../services/vehicle.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { Maintenance } from '../../models/maintenance.entity';
import { DecisionsButtonComponent } from '../../../../shared/components/buttons/decisions-button/decisions-button.component';
import { GobackButtonComponent } from '../../../../shared/components/buttons/goback-button/goback-button.component';
import { HistoryButtonComponent } from '../../../../shared/components/buttons/history-button/history-button.component';
import {MaintenanceRequest} from '../../../mechanic/models/maintenance-request.entity';
import {MaintenanceRequestService} from '../../../mechanic/services/maintenance-request.service';

@Component({
  selector: 'app-maintenance-request-received',
  templateUrl: './maintenance-request-received.component.html',
  styleUrl: './maintenance-request-received.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgIf,
    GobackButtonComponent,
    DecisionsButtonComponent,
    HistoryButtonComponent
  ]
})
export class MaintenanceRequestReceivedComponent implements OnInit {
  request!: MaintenanceRequest;
  mechanicName = '';
  vehicleInfo = '';

  constructor(
    private requestService: MaintenanceRequestService,
    private mechanicService: MechanicService,
    private vehicleService: VehicleService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedRequestId');
    if (id) {
      const numericId = Number(id);

      this.requestService.getById(numericId).subscribe(request => {
        this.request = request;

        this.mechanicService.getById(request.mechanicId).subscribe(mechanic => {
          this.mechanicName = `${mechanic.firstName} ${mechanic.lastName}`;
        });

        this.vehicleService.getById(request.vehicleId).subscribe(vehicle => {
          this.vehicleInfo = `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
        });
      });
    }
  }

  acceptRequest(): void {
    if (!this.request || this.request.accepted) return; //  Ya aceptada, no hacer nada

    const updatedRequest = { ...this.request, accepted: true };

    this.requestService.update(updatedRequest.id, updatedRequest).subscribe({
      next: () => {
        this.request.accepted = true;

        const newMaintenance = new Maintenance({
          title:this.request.title,
          description: this.request.description,
          budget: this.request.budget,
          vehicleId: this.request.vehicleId,
          mechanicId: this.request.mechanicId,
          driverId: this.request.driverId,
          requestId: this.request.id,
          completed: false
        });

        this.maintenanceService.create(newMaintenance).subscribe({
          next: (createdMaintenance) => {
            console.log('Mantenimiento creado:', createdMaintenance);

            this.vehicleService.addMaintenanceToVehicle(
              createdMaintenance.vehicleId,
              createdMaintenance.id
            ).subscribe({
              next: () => {
                console.log('Mantenimiento vinculado al vehículo');
              },
              error: err => {
                console.error('Error al vincular mantenimiento al vehículo:', err);
              }
            });
          },
          error: err => {
            console.error('Error al crear mantenimiento:', err);
          }
        });
      },
      error: err => {
        console.error('Error al aceptar la solicitud:', err);
      }
    });
  }


  denyRequest(): void {
    // No hace nada por ahora
  }
}
