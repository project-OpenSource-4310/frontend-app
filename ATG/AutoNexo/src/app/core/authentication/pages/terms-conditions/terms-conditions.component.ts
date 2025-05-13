import {Component, ViewEncapsulation} from '@angular/core';
import {GobackButtonComponent} from '../../../../shared/buttons/goback-button/goback-button.component';

@Component({
  selector: 'app-terms-conditions',
  imports: [
    GobackButtonComponent
  ],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TermsConditionsComponent {
}
