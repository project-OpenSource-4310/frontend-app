import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Item } from '../models/item.entity';
import { map, Observable } from 'rxjs';

const itemsEndpointPath = environment.itemsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  constructor() {
    super();
    this.resourceEndpoint = itemsEndpointPath;
  }

  getByIds(ids: number[]): Observable<Item[]> {
    return this.getAll().pipe(
      map(items => items.filter(m => m.id !== undefined && ids.includes(m.id!)))
    );
  }
}
