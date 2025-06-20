import {Component, ViewEncapsulation} from '@angular/core';
import {LanguageSwitcherComponent} from '../../../../shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-mechanic-config',
  imports: [
    LanguageSwitcherComponent
  ],
  templateUrl: './mechanic-config.component.html',
  styleUrl: './mechanic-config.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicConfigComponent {

}
