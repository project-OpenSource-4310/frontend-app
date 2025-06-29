import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddButtonComponent {
  @Output() abrirDialogo = new EventEmitter<void>();

  sendEvent() {
    this.abrirDialogo.emit();
  }
}
