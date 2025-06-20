import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { VehicleService } from '../../services/vehicle.service';
import { AssignmentRequest } from '../../models/assignment-request.entity';
import {AssignmentRequestService} from '../../services/assignment-request.service';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-assignment-request-sent',
    imports: [
        GobackButtonComponent,
        NgIf
    ],
  templateUrl: './assignment-request-sent.component.html',
  styleUrl: './assignment-request-sent.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AssignmentRequestSentComponent implements OnInit {
  request!: AssignmentRequest;
  mechanicName: string = '';
  vehicleInfo: string = '';

  constructor(
    private requestService: AssignmentRequestService,
    private mechanicService: MechanicService,
    private vehicleService: VehicleService
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
}
