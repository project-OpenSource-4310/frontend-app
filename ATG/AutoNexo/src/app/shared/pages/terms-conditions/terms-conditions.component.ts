import {Component, ViewEncapsulation} from '@angular/core';
import {GobackButtonComponent} from '../../components/buttons/goback-button/goback-button.component';
import {LanguageSwitcherComponent} from '../../components/language-switcher/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-terms-conditions',
  imports: [
    GobackButtonComponent,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TermsConditionsComponent {

}
