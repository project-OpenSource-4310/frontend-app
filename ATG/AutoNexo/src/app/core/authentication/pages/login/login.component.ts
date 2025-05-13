import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Location} from '@angular/common';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    GobackButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
