import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from '../../../shared/services/base.service';
import {AssignmentRequest} from '../models/assignment-request.entity';
import {map, Observable} from 'rxjs';

const assignmentRequestsResourceEndpointPath = environment.assignmentRequestsEndpointPath;
@Injectable({
  providedIn: 'root'
})
export class AssignmentRequestService extends BaseService<AssignmentRequest> {
  constructor() {
    super();
    this.resourceEndpoint=assignmentRequestsResourceEndpointPath;
  }
  getByIds(ids: number[]): Observable<AssignmentRequest[]> {
    return this.getAll().pipe(
      map(requests => requests.filter(r => r.id !== undefined && ids.includes(r.id!)))
    );
  }
}
