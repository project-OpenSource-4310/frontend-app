import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-decisions-button',
  templateUrl: './decisions-button.component.html',
  styleUrl: './decisions-button.component.css',
  standalone: true
})
export class DecisionsButtonComponent {
  @Output() accept = new EventEmitter<void>();
  @Output() deny = new EventEmitter<void>();
}
