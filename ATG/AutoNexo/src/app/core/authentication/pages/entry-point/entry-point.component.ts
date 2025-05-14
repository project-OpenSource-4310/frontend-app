import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-entry-point',
  imports: [
    RouterLink
  ],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EntryPointComponent {

}
