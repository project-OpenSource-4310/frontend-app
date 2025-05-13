import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-mechanic-profile',
  imports: [
    SideBarComponent
  ],
  templateUrl: './mechanic-profile.component.html',
  styleUrl: './mechanic-profile.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicProfileComponent {

}
