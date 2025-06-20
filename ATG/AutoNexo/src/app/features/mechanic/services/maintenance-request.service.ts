import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {MaintenanceRequest} from '../models/maintenance-request.entity';
import {map, Observable} from 'rxjs';

const maintenanceRequestsResourceEndpointPath = environment.maintenanceRequestsEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService extends BaseService<MaintenanceRequest> {
  constructor() {
    super();
    this.resourceEndpoint=maintenanceRequestsResourceEndpointPath;
  }
  getByIds(ids: number[]): Observable<MaintenanceRequest[]> {
    return this.getAll().pipe(
      map(requests => requests.filter(r => r.id !== undefined && ids.includes(r.id!)))
    );
  }
}
