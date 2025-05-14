import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';
import {ClassicButtonComponent} from '../../../../shared/buttons/classic-button/classic-button.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    GobackButtonComponent,
    ClassicButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent {

}
