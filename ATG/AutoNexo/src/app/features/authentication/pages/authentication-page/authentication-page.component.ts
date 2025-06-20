import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LanguageSwitcherComponent} from '../../../../shared/components/language-switcher/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-authentication-page',
  imports: [
    RouterLink,
    RouterOutlet,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationPageComponent {

}
