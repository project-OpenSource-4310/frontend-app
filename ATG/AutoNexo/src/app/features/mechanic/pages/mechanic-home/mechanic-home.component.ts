import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-mechanic-home',
  imports: [
    SideBarComponent
  ],
  templateUrl: './mechanic-home.component.html',
  styleUrl: './mechanic-home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicHomeComponent {

}
