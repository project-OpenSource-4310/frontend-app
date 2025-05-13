import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Location} from '@angular/common';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    GobackButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
