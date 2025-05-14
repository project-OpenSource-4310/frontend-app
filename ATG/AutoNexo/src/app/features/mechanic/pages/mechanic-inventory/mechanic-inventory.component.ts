import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-mechanic-inventory',
  imports: [
    SideBarComponent
  ],
  templateUrl: './mechanic-inventory.component.html',
  styleUrl: './mechanic-inventory.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicInventoryComponent {

}
