import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';
import {ClassicButtonComponent} from '../../../../shared/buttons/classic-button/classic-button.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    GobackButtonComponent,
    ClassicButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

}
