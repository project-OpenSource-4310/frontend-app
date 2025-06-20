import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Maintenance } from '../models/maintenance.entity';
import { map, Observable } from 'rxjs';

const maintenancesEndpointPath = environment.maintenancesEndpointPath;

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService extends BaseService<Maintenance> {
    constructor() {
        super();
        this.resourceEndpoint = maintenancesEndpointPath;
    }

    getByIds(ids: number[]): Observable<Maintenance[]> {
        return this.getAll().pipe(
            map(maintenances => maintenances.filter(m => m.id !== undefined && ids.includes(m.id!)))
        );
    }
}
