import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-role-selection',
  imports: [
    RouterLink
  ],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RoleSelectionComponent {

}
