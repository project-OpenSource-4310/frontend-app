import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DriverService } from '../../../authentication/services/driver.service';
import { NgIf } from '@angular/common';
import { DecisionsButtonComponent } from '../../../../shared/components/buttons/decisions-button/decisions-button.component';
import { HistoryButtonComponent } from '../../../../shared/components/buttons/history-button/history-button.component';
import {AssignmentRequest} from '../../../driver/models/assignment-request.entity';
import {AssignmentRequestService} from '../../../driver/services/assignment-request.service';
import {VehicleService} from '../../../driver/services/vehicle.service';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {MechanicService} from '../../../authentication/services/mechanic.service';

@Component({
  selector: 'app-assignment-request-received',
    imports: [
        DecisionsButtonComponent,
        GobackButtonComponent,
        HistoryButtonComponent,
        NgIf
    ],
  templateUrl: './assignment-request-received.component.html',
  styleUrl: './assignment-request-received.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AssignmentRequestReceivedComponent implements OnInit {
  request!: AssignmentRequest;
  driverName: string = '';
  vehicleInfo: string = '';

  constructor(
    private requestService: AssignmentRequestService,
    private driverService: DriverService,
    private mechanicService: MechanicService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedRequestId');
    if (id) {
      const numericId = Number(id);

      this.requestService.getById(numericId).subscribe(request => {
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

  acceptRequest() {
    if (!this.request) return;

    const updatedRequest = { ...this.request, accepted: true };
    this.requestService.update(updatedRequest.id, updatedRequest).subscribe(() => {
      this.request.accepted = true;
    });


    // Primero actualizamos el estado del request
    this.requestService.update(updatedRequest.id, updatedRequest).subscribe({
      next: () => {
        // Luego añadimos el vehículo al mecánico
        this.mechanicService
          .addVehicleToMechanic(updatedRequest.mechanicId, updatedRequest.vehicleId)
          .subscribe({
            next: () => {
              console.log('Vehículo asignado correctamente al mecánico');
              this.vehicleService.getById(updatedRequest.vehicleId).subscribe(vehicle => {
                const updatedVehicle = {
                  ...vehicle,
                  mechanicId: updatedRequest.mechanicId
                };

                this.vehicleService.update(updatedRequest.vehicleId, updatedVehicle).subscribe({
                  next: () => {
                    console.log('Vehículo actualizado con mechanicId');
                  },
                  error: err => {
                    console.error('Error actualizando vehicle:', err);
                  }
                });
              });

            },
            error: (err) => {
              console.error('Error al asignar vehículo al mecánico', err);
            }
          });
      },
      error: (err) => {
        console.error('Error al aceptar la solicitud', err);
      }
    });
  }


  denyRequest(): void {
    if (!this.request) return;

    const updatedRequest = { ...this.request, accepted: false };

    this.requestService.update(updatedRequest.id, updatedRequest).subscribe({
      next: () => {
        this.request.accepted = false;

        this.mechanicService
          .removeVehicleFromMechanic(updatedRequest.mechanicId, updatedRequest.vehicleId)
          .subscribe({
            next: () => {
              console.log('Vehículo removido del mecánico');

              this.vehicleService.getById(updatedRequest.vehicleId).subscribe(vehicle => {
                const updatedVehicle = {
                  ...vehicle,
                  mechanicId: 0
                };

                this.vehicleService.update(updatedRequest.vehicleId, updatedVehicle).subscribe({
                  next: () => {
                    console.log('Vehículo actualizado sin mechanicId');
                  },
                  error: err => {
                    console.error('Error limpiando mechanicId:', err);
                  }
                });
              });

            },
            error: (err) => {
              console.error('Error al remover vehículo:', err);
            }
          });
      },
      error: (err) => {
        console.error('Error al denegar solicitud:', err);
      }
    });
  }



}
