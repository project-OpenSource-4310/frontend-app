import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    GobackButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

}
