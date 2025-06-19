import {Component, ViewEncapsulation} from '@angular/core';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {RouterLink} from '@angular/router';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ClassicButtonComponent,
    RouterLink,
    GobackButtonComponent,
    TranslatePipe
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent {

}
