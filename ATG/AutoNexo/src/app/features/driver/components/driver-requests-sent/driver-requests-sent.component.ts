import {Component, ViewEncapsulation} from '@angular/core';
import {RequestsSentListComponent} from '../requests-sent-list/requests-sent-list.component';

@Component({
  selector: 'app-driver-requests-sent',
  imports: [
    RequestsSentListComponent
  ],
  templateUrl: './driver-requests-sent.component.html',
  styleUrl: './driver-requests-sent.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverRequestsSentComponent {

}
