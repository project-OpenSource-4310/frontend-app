// vehicle-models.component.ts
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { VehicleService } from '../../domain/vehicle-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ClassicButtonComponent} from '../../../../shared/buttons/classic-button/classic-button.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-vehicle-models',
  templateUrl: './vehicle-models.component.html',
  styleUrls: ['./vehicle-models.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    NgFor,
    CommonModule,
    MatProgressSpinnerModule,
    ClassicButtonComponent,
    RouterLink
  ]
})
export class VehicleModelsComponent implements OnInit {
  models: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadToyotaModels();
  }

  loadToyotaModels(): void {
    this.loading = true;
    this.error = null;

    this.vehicleService.getToyotaModels().subscribe({
      next: (data) => {
        this.models = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los modelos. Por favor, inténtelo de nuevo más tarde.';
        this.loading = false;
        console.error('Error fetching Toyota models:', err);
      }
    });
  }
}
