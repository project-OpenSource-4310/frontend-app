import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule, NgFor} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {Router} from '@angular/router';
import {Vehicle} from '../../../driver/models/vehicle.entity';
import {VehicleService} from '../../../driver/services/vehicle.service';
import {MechanicService} from '../../../authentication/services/mechanic.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatCardModule,
    MatGridListModule,
    NgFor,
    CommonModule,
    MatProgressSpinnerModule,
    ClassicButtonComponent
  ]
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private mechanicService: MechanicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    console.log("USUARIO LOGUEADO:", user); // ← agrega esto

    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (mechanicId) {
      this.mechanicService.getById(mechanicId).subscribe(mechanic => {
        console.log("VEHÍCULOS ASIGNADOS:", mechanic.vehicles_assigned); // ← agrega esto

        const vehicleIds = mechanic.vehicles_assigned || [];

        this.vehicleService.getByIds(vehicleIds).subscribe(vehicles => {
          console.log("VEHÍCULOS FILTRADOS:", vehicles); // ← agrega esto
          this.vehicles = vehicles;
        });
      });
    }
  }

  viewVehicle(id: number): void {
    localStorage.setItem('selectedVehicleId', id.toString());
    this.router.navigate(['/mechanic-page/vehicle']);
  }
}
