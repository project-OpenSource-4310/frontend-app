import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {DriverService} from '../../../authentication/services/driver.service';
import {AssignmentRequestService} from '../../services/assignment-request.service';
import {AssignmentRequest} from '../../models/assignment-request.entity';

@Component({
  selector: 'app-send-assignment-request',
    imports: [
        ClassicButtonComponent,
        GobackButtonComponent,
        ReactiveFormsModule
    ],
  templateUrl: './send-assignment-request.component.html',
  styleUrl: './send-assignment-request.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SendAssignmentRequestComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mechanicService: MechanicService,
    private driverService: DriverService,
    private assignmentRequestService: AssignmentRequestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mechanicId: ['', [Validators.required]],
      description: [''] // opcional por ahora
    });
  }

  sendRequest(): void {
    const vehicleId = Number(localStorage.getItem('selectedVehicleId'));
    const mechanicId = Number(this.form.value.mechanicId);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const driverId = user.id;

    if (!vehicleId || !mechanicId || !driverId) {
      this.snackBar.open('Datos inválidos', '', { duration: 2000 });
      return;
    }

    // Verificar si el mecánico existe antes de continuar
    this.mechanicService.getById(mechanicId).subscribe({
      next: (mechanic) => {
        if (!mechanic) {
          this.snackBar.open('Mecánico no encontrado', '', { duration: 2000 });
          return;
        }

        const newRequest = new AssignmentRequest({
          description: this.form.value.description,
          vehicleId,
          driverId,
          mechanicId,
          accepted: false
        });

        this.assignmentRequestService.create(newRequest).subscribe({
          next: (createdRequest: any) => {
            const requestId = createdRequest.id;

            this.driverService.addAssignmentRequestToDriver(driverId, requestId).subscribe();
            this.mechanicService.addAssignmentRequestToMechanic(mechanicId, requestId).subscribe();

            this.snackBar.open('Solicitud enviada correctamente', '', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al enviar solicitud', '', { duration: 2000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Mecánico no válido', '', { duration: 2000 });
      }
    });
  }


}
