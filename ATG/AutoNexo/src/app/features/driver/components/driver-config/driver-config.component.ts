import {Component, ViewEncapsulation} from '@angular/core';
import {LanguageSwitcherComponent} from '../../../../shared/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-driver-config',
  imports: [
    LanguageSwitcherComponent
  ],
  templateUrl: './driver-config.component.html',
  styleUrl: './driver-config.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverConfigComponent {

}
