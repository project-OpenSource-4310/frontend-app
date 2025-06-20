import {Component, ViewEncapsulation} from '@angular/core';
import {RequestsReceivedListComponent} from '../requests-received-list/requests-received-list.component';

@Component({
  selector: 'app-driver-requests-received',
    imports: [
        RequestsReceivedListComponent
    ],
  templateUrl: './driver-requests-received.component.html',
  styleUrl: './driver-requests-received.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverRequestsReceivedComponent {

}
