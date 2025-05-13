import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';
import {DecisionsButtonComponent} from '../../../../shared/buttons/decisions-button/decisions-button.component';

@Component({
  selector: 'app-mechanic-requests',
  imports: [
    SideBarComponent,
    DecisionsButtonComponent
  ],
  templateUrl: './mechanic-requests.component.html',
  styleUrl: './mechanic-requests.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicRequestsComponent {

}
