import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InventoryService } from '../../services/inventory.service';
import { MechanicService } from '../../../authentication/services/mechanic.service';
import { ClassicButtonComponent } from '../../../../shared/components/buttons/classic-button/classic-button.component';
import { GobackButtonComponent } from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {NgForOf} from '@angular/common';
import {AddButtonComponent} from '../../../../shared/components/buttons/add-button/add-button.component';
import { firstValueFrom } from 'rxjs';
import { Item } from '../../models/item.entity';
import {ItemService} from '../../services/item.service';
import { Inventory } from '../../models/inventory.entity';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ClassicButtonComponent,
    GobackButtonComponent,
    NgForOf,
    AddButtonComponent
  ],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddInventoryComponent implements OnInit {
  form!: FormGroup;
  protected readonly HTMLSelectElement = HTMLSelectElement;
  itemOptions: Record<string, string[]> = {
    'Aceite de motor': ['Castrol GTX Full Synthetic', 'Mobil 1 Extended Performance'],
    'Bujías': ['Denso VFK20F', 'NGK BKR9EIX 5689'],
    'Filtro de aceite': ['Fram PH7317', 'Mobil 1 M1-102'],
    'Gato hidráulico': ['Arcan ALJ3T Aluminum', 'Harbor Freight Daytona 3T'],
    'Llave de impacto': ['Milwaukee M18', 'Ryobi 18V One+'],
    'Pastillas de freno': ['ACDelco 3500 HD 11-19', 'Brembo P50108N'],
    'Scanner OBD2': ['Ancel AD310', 'Autel MaxiCOM MK808']
  };

  types: string[] = Object.keys(this.itemOptions);
  descs: string[] = [];
  itemInputs: { type: string, desc: string, quantity: number, descs: string[] }[] = [];
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private mechanicService: MechanicService,
    private router: Router,
    private snackBar: MatSnackBar,
    private itemService: ItemService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required]
    });

    this.addItemField(); // Agrega el primer ítem vacío
  }

  addItemField() {
    this.itemInputs.push({
      type: '',
      desc: '',
      quantity: 1,
      descs: []
    });
  }
  onTypeChange(event: Event, index: number): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemInputs[index].type = value;
    this.itemInputs[index].descs = this.itemOptions[value] || [];
    this.itemInputs[index].desc = '';
  }
  onDescChange(event: Event, index: number): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemInputs[index].desc = value;
  }
  onQuantityChange(event: Event, index: number): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.itemInputs[index].quantity = value;

    if (value === 0) {
      this.itemInputs.splice(index, 1);
    }
  }
  addInventory() {
    if (this.form.invalid) return;

    // Validar que todos los ítems estén completos
    const validItems = this.itemInputs.filter(
      item => item.type && item.desc && item.quantity > 0
    );

    if (validItems.length === 0) {
      this.snackBar.open('Debes agregar al menos un ítem válido.', '', { duration: 2000 });
      return;
    }

    const user = localStorage.getItem('user');
    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (!mechanicId) {
      this.snackBar.open('No se encontró el mecánico logueado', '', { duration: 2000 });
      return;
    }

    // Crear inventario base
    const newInventory = new Inventory({
      title: this.form.value.title,
      mechanicId,
      items: []
    });

    this.inventoryService.create(newInventory).subscribe({
      next: async (createdInventory) => {
        const inventoryId = Number(createdInventory.id);

        if (!inventoryId) {
          this.snackBar.open('El inventario fue creado pero no tiene ID', '', { duration: 2000 });
          return;
        }

        // Crear ítems
        const createdItems = await Promise.all(
          validItems.map(item => {
            const newItem = new Item({
              name: item.type,
              description: item.desc,
              quantity: item.quantity,
              inventoryId
            });
            return firstValueFrom(this.itemService.create(newItem));
          })
        );

        // Obtener los IDs
        const itemIds = createdItems.map(item => item.id);

        // Actualizar el inventario con los ítems creados
        const updatedInventory = {
          ...createdInventory,
          items: itemIds
        };

        this.inventoryService.update(inventoryId, updatedInventory).subscribe({
          next: () => {
            this.mechanicService.addInventoryToMechanic(mechanicId, inventoryId).subscribe(() => {
              this.snackBar.open('Inventario e ítems agregados correctamente', '', { duration: 2000 });
              this.router.navigate(['/mechanic-page/storage']);
            });
          },
          error: () => {
            this.snackBar.open('Error al actualizar inventario con ítems', '', { duration: 2000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Error al crear inventario', '', { duration: 2000 });
      }
    });
  }
}
