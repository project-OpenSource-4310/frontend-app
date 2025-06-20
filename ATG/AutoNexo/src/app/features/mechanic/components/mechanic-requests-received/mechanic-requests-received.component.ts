import {Component, ViewEncapsulation} from '@angular/core';
import {RequestsReceivedListComponent} from '../requests-received-list/requests-received-list.component';

@Component({
  selector: 'app-mechanic-requests-received',
  imports: [
    RequestsReceivedListComponent
  ],
  templateUrl: './mechanic-requests-received.component.html',
  styleUrl: './mechanic-requests-received.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicRequestsReceivedComponent {

}
