import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Vehicle } from '../models/vehicle.entity';
import { map, Observable, catchError, switchMap } from 'rxjs';

const vehiclesResourceEndpointPath = environment.vehiclesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super();
    this.resourceEndpoint = vehiclesResourceEndpointPath;
  }

  getByIds(ids: number[]): Observable<Vehicle[]> {
    return this.getAll().pipe(
      map(vehicles => vehicles.filter(v => v.id !== undefined && ids.includes(v.id!)))
    );
  }

  addMaintenanceToVehicle(vehicleId: number, maintenanceId: number) {
    const url = `${this.resourcePath()}/${vehicleId}`;

    return this.getById(vehicleId).pipe(
      switchMap(vehicle => {
        const updatedMaintenances = Array.isArray(vehicle.maintenances)
          ? [...vehicle.maintenances, maintenanceId]
          : [maintenanceId];

        const updatedVehicle: Vehicle = {
          ...vehicle,
          maintenances: [...new Set(updatedMaintenances)]
        };

        return this.http.put(url, JSON.stringify(updatedVehicle), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }
}
