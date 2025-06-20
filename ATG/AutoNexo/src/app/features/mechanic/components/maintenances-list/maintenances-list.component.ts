import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {Maintenance} from '../../../driver/models/maintenance.entity';
import {VehicleService} from '../../../driver/services/vehicle.service';
import {MaintenanceService} from '../../../driver/services/maintenance.service';

@Component({
  selector: 'app-maintenances-list',
  standalone: true,
  imports: [CommonModule, ClassicButtonComponent],
  templateUrl: './maintenances-list.component.html',
  styleUrl: './maintenances-list.component.css'
})
export class MaintenancesListComponent implements OnInit {
  maintenances: Maintenance[] = [];

  constructor(
    private vehicleService: VehicleService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    const selectedVehicleId = localStorage.getItem('selectedVehicleId');
    if (!selectedVehicleId) return;

    const vehicleId = Number(selectedVehicleId);
    this.vehicleService.getById(vehicleId).subscribe(vehicle => {
      const maintenanceIds = vehicle.maintenances || [];

      if (maintenanceIds.length > 0) {
        this.maintenanceService.getByIds(maintenanceIds).subscribe({
          next: (data) => this.maintenances = data,
          error: (err) => console.error('Error al obtener mantenimientos:', err)
        });
      }
    });
  }
}
