import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GobackButtonComponent } from "../../../../shared/components/buttons/goback-button/goback-button.component";
import { NgIf } from "@angular/common";
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.entity';
import {ItemsListComponent} from '../items-list/items-list.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  imports: [
    GobackButtonComponent,
    NgIf,
    ItemsListComponent
  ]
})
export class InventoryComponent implements OnInit {
  inventory!: Inventory;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedInventoryId');
    if (id) {
      const numericId = Number(id);
      this.inventoryService.getById(numericId).subscribe(inventory => {
        this.inventory = inventory;
      });
    }
  }
}
