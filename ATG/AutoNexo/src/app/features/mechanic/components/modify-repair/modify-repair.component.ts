import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-modify-repair',
  imports: [RouterLink, RouterOutlet, SideBarComponent],
  templateUrl: './modify-repair.component.html',
  styleUrl: './modify-repair.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ModifyRepairComponent {

}
