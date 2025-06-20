import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {Mechanic} from '../models/mechanic.entity';
import {catchError, switchMap} from 'rxjs';

const mechanicsResourceEndpointPath = environment.mechanicsEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class MechanicService extends BaseService<Mechanic> {
  constructor() {
    super();
    this.resourceEndpoint=mechanicsResourceEndpointPath;
  }
  addVehicleToMechanic(mechanicId: number, vehicleId: number) {
    const url = `${this.resourcePath()}/${mechanicId}`;

    return this.getById(mechanicId).pipe(
      switchMap((mechanic) => {
        const updatedVehicles = Array.isArray(mechanic.vehicles_assigned)
          ? [...mechanic.vehicles_assigned, vehicleId]
          : [vehicleId];

        const updatedMechanic = {
          ...mechanic,
          vehicles_assigned: [...new Set(updatedVehicles)] // evita duplicados
        };

        return this.http.put(url, JSON.stringify(updatedMechanic), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  addInventoryToMechanic(mechanicId: number, inventoryId: number) {
    const url = `${this.resourcePath()}/${mechanicId}`;

    return this.getById(mechanicId).pipe(
      switchMap((mechanic) => {
        const updatedInventories = Array.isArray(mechanic.inventories)
          ? [...mechanic.inventories, inventoryId]
          : [inventoryId];

        const updatedMechanic = {
          ...mechanic,
          inventories: [...new Set(updatedInventories)] // evita duplicados
        };

        return this.http.put(url, JSON.stringify(updatedMechanic), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  removeVehicleFromMechanic(mechanicId: number, vehicleId: number) {
    const url = `${this.resourcePath()}/${mechanicId}`;

    return this.getById(mechanicId).pipe(
      switchMap((mechanic) => {
        const updatedVehicles = (mechanic.vehicles_assigned || []).filter(id => id !== vehicleId);

        const updatedMechanic = {
          ...mechanic,
          vehicles_assigned: updatedVehicles
        };

        return this.http.put(url, JSON.stringify(updatedMechanic), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }

  addAssignmentRequestToMechanic(mechanicId: number, requestId: number) {
    const url = `${this.resourcePath()}/${mechanicId}`;

    return this.getById(mechanicId).pipe(
      switchMap((mechanic) => {
        const updatedRequests = Array.isArray(mechanic.assignment_requests_received)
          ? [...mechanic.assignment_requests_received, requestId]
          : [requestId];

        const updatedMechanic = {
          ...mechanic,
          assignment_requests_received: [...new Set(updatedRequests)]
        };

        return this.http.put(url, JSON.stringify(updatedMechanic), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }

  addMaintenanceRequestToMechanic(mechanicId: number, requestId: number) {
    const url = `${this.resourcePath()}/${mechanicId}`;

    return this.getById(mechanicId).pipe(
      switchMap((mechanic) => {
        const updatedRequests = Array.isArray(mechanic.maintenance_requests_sent)
          ? [...mechanic.maintenance_requests_sent, requestId]
          : [requestId];

        const updatedMechanic = {
          ...mechanic,
          maintenance_requests_sent: [...new Set(updatedRequests)]
        };

        return this.http.put(url, JSON.stringify(updatedMechanic), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }


}
