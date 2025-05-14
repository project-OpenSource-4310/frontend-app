import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';
import {ClassicButtonComponent} from '../../../../shared/buttons/classic-button/classic-button.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    GobackButtonComponent,
    ClassicButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

}
