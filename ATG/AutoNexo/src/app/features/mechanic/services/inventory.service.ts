import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Inventory } from '../models/inventory.entity';
import {catchError, map, Observable, switchMap} from 'rxjs';

const inventoriesResourceEndpointPath = environment.inventoriesEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory> {
  constructor() {
    super();
    this.resourceEndpoint = inventoriesResourceEndpointPath;
  }

  getByIds(ids: number[]): Observable<Inventory[]> {
    return this.getAll().pipe(
      map(inventories => inventories.filter(v => v.id !== undefined && ids.includes(v.id!)))
    );
  }
  addItemToInventory(inventoryId: number, itemId: number) {
    const url = `${this.resourcePath()}/${inventoryId}`;

    return this.getById(inventoryId).pipe(
      switchMap(inventory => {
        const updatedItems = Array.isArray(inventory.items)
          ? [...inventory.items, itemId]
          : [itemId];

        const updatedInventory: Inventory = {
          ...inventory,
          items: [...new Set(updatedItems)] // evita duplicados
        };

        return this.http.put(url, JSON.stringify(updatedInventory), this.httpOptions);
      }),
      catchError(this.handleError)
    );
  }
}
