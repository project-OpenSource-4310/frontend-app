import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';
import {HistoryButtonComponent} from '../../../../shared/buttons/history-button/history-button.component';
import {
  AddReparationButtonComponent
} from "../../../../shared/buttons/add-reparation-button/add-reparation-button.component";

@Component({
  selector: 'app-mechanic-vehicle',
  imports: [
    SideBarComponent,
    GobackButtonComponent,
    HistoryButtonComponent,
    AddReparationButtonComponent,
  ],
  templateUrl: './mechanic-vehicle.component.html',
  styleUrl: './mechanic-vehicle.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicVehicleComponent {
}
