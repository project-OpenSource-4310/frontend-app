import {Component, ViewEncapsulation} from '@angular/core';
import {RequestsSentListComponent} from '../requests-sent-list/requests-sent-list.component';

@Component({
  selector: 'app-mechanic-requests-sent',
    imports: [
        RequestsSentListComponent
    ],
  templateUrl: './mechanic-requests-sent.component.html',
  styleUrl: './mechanic-requests-sent.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicRequestsSentComponent {

}
