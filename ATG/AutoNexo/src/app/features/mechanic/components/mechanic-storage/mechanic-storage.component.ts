import {Component, ViewEncapsulation} from '@angular/core';
import {AddButtonComponent} from "../../../../shared/components/buttons/add-button/add-button.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {InventoriesListComponent} from '../inventories-list/inventories-list.component';

@Component({
  selector: 'app-mechanic-storage',
  imports: [
    AddButtonComponent,
    RouterOutlet,
    RouterLink,
    InventoriesListComponent
  ],
  templateUrl: './mechanic-storage.component.html',
  styleUrl: './mechanic-storage.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicStorageComponent {

}
