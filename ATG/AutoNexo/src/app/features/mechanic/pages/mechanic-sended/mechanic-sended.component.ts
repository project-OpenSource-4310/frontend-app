import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-mechanic-sended',
  imports: [
    SideBarComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './mechanic-sended.component.html',
  styleUrl: './mechanic-sended.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class MechanicSendedComponent {

}
