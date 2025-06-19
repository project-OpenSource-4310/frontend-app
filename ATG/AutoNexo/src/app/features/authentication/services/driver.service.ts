import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {Driver} from '../models/driver.entity';
import {catchError, switchMap} from 'rxjs';

const driversResourceEndpointPath = environment.driversEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class DriverService extends BaseService<Driver> {
  constructor() {
    super();
    this.resourceEndpoint=driversResourceEndpointPath;
  }
  addVehicleToDriver(driverId: number, vehicleId: number) {
    const url = `${this.resourcePath()}/${driverId}`;

    return this.getById(driverId).pipe(
      switchMap((driver) => {
        const updatedVehicles = Array.isArray(driver.vehicles_owned)
          ? [...driver.vehicles_owned, vehicleId]
          : [vehicleId];

        const updatedDriver = {
          ...driver,
          vehicles_owned: [...new Set(updatedVehicles)] // evita duplicados
        };

        return this.http.put(url, JSON.stringify(updatedDriver), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  addAssignmentRequestToDriver(driverId: number, requestId: number) {
    const url = `${this.resourcePath()}/${driverId}`;

    return this.getById(driverId).pipe(
      switchMap((driver) => {
        const updatedRequests = Array.isArray(driver.assignment_requests_sent)
          ? [...driver.assignment_requests_sent, requestId]
          : [requestId];

        const updatedDriver = {
          ...driver,
          assignment_requests_sent: [...new Set(updatedRequests)]
        };

        return this.http.put(url, JSON.stringify(updatedDriver), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }

  addMaintenanceRequestToDriver(driverId: number, requestId: number) {
    const url = `${this.resourcePath()}/${driverId}`;

    return this.getById(driverId).pipe(
      switchMap((driver) => {
        const updatedRequests = Array.isArray(driver.maintenance_requests_received)
          ? [...driver.maintenance_requests_received, requestId]
          : [requestId];

        const updatedDriver = {
          ...driver,
          maintenance_requests_received: [...new Set(updatedRequests)]
        };

        return this.http.put(url, JSON.stringify(updatedDriver), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }

}
