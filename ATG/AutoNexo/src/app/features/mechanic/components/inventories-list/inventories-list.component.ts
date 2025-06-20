import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { Inventory } from '../../models/inventory.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventories-list',
  imports: [
    ClassicButtonComponent,
    MatCard,
    MatCardActions,
    MatCardContent,
    NgForOf
  ],
  templateUrl: './inventories-list.component.html',
  styleUrl: './inventories-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class InventoriesListComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(
    private inventoryService: InventoryService,
    private mechanicService: MechanicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (mechanicId) {
      this.mechanicService.getById(mechanicId).subscribe(mechanic => {
        const inventoryIds = mechanic.inventories || [];

        this.inventoryService.getByIds(inventoryIds).subscribe(inventories => {
          this.inventories = inventories;
        });
      });
    }
  }

  viewInventory(id: number): void {
    localStorage.setItem('selectedInventoryId', id.toString());
    // Aquí puedes definir la ruta al detalle si lo deseas
    this.router.navigate(['/mechanic-page/inventory']);
  }
}
