import {Component, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-goback-button',
  imports: [],
  templateUrl: './goback-button.component.html',
  styleUrl: './goback-button.component.css',
  encapsulation: ViewEncapsulation.None

})
export class GobackButtonComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
