import {Component, ViewEncapsulation} from '@angular/core';
import {SideBarComponent} from '../../../../shared/side-bar/side-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {ClassicButtonComponent} from '../../../../shared/buttons/classic-button/classic-button.component';

@Component({
  selector: 'app-mechanic-home',
  imports: [
    SideBarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ClassicButtonComponent
  ],
  templateUrl: './mechanic-home.component.html',
  styleUrl: './mechanic-home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicHomeComponent {

}
