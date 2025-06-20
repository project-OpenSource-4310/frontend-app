import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { DriverService } from '../../../authentication/services/driver.service';
import { MaintenanceRequestService } from '../../services/maintenance-request.service';
import { MaintenanceRequest } from '../../models/maintenance-request.entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GobackButtonComponent } from '../../../../shared/components/buttons/goback-button/goback-button.component';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { VehicleService } from '../../../driver/services/vehicle.service'; // Asegúrate de tener esto

@Component({
  selector: 'app-send-maintenance-request',
  templateUrl: './send-maintenance-request.component.html',
  styleUrl: './send-maintenance-request.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ClassicButtonComponent,
    GobackButtonComponent,
    ReactiveFormsModule
  ]
})
export class SendMaintenanceRequestComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mechanicService: MechanicService,
    private driverService: DriverService,
    private maintenanceRequestService: MaintenanceRequestService,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]]
    });
  }

  sendRequest(): void {
    const vehicleId = Number(localStorage.getItem('selectedVehicleId'));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const mechanicId = user.id;

    if (!vehicleId || !mechanicId) {
      this.snackBar.open('Datos inválidos', '', { duration: 2000 });
      return;
    }

    // Obtenemos el conductor dueño del vehículo
    this.vehicleService.getById(vehicleId).subscribe({
      next: (vehicle) => {
        const driverId = vehicle.driverId; // Asegúrate que el vehículo tiene esta propiedad

        const newRequest = new MaintenanceRequest({
          title:this.form.value.title,
          description: this.form.value.description,
          budget: this.form.value.budget,
          vehicleId,
          driverId,
          mechanicId,
          accepted: false
        });

        this.maintenanceRequestService.create(newRequest).subscribe({
          next: (createdRequest: any) => {
            const requestId = createdRequest.id;

            this.mechanicService.addMaintenanceRequestToMechanic(mechanicId, requestId).subscribe();
            this.driverService.addMaintenanceRequestToDriver(driverId, requestId).subscribe();

            this.snackBar.open('Solicitud de mantenimiento enviada', '', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al enviar solicitud', '', { duration: 2000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('No se pudo obtener el dueño del vehículo', '', { duration: 2000 });
      }
    });
  }
}
