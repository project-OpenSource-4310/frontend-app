import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';
import {AddButtonComponent} from '../../../../shared/buttons/add-button/add-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modify-repair',
  imports: [
    RouterLink,
    RouterOutlet,
    SideBarComponent,
    AddButtonComponent,
    NgIf,
  ],
  templateUrl: './modify-repair.component.html',
  styleUrl: './modify-repair.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ModifyRepairComponent {
  mostrarDialogo = false;

  activarDialogo() {
    this.mostrarDialogo = true;
  }
  cerrarDialogo() {
    this.mostrarDialogo = false;
  }
}
