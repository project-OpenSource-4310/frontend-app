import {Component, OnInit} from '@angular/core';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {DriverService} from '../../../authentication/services/driver.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Vehicle} from '../../models/vehicle.entity';
import {VehicleService} from '../../services/vehicle.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    ClassicButtonComponent,
    ReactiveFormsModule,
    GobackButtonComponent,
    NgForOf
  ],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements OnInit {
  form!: FormGroup;
  selectedMake: string = '';
  selectedModel: string = '';
  selectedYear: string = '';
  protected readonly HTMLSelectElement = HTMLSelectElement;
  vehicleOptions: Record<string, Record<string, number[]>> = {
    subaru: {
      impreza: [2015, 2018],
      outblack: [2017],
      forester: [2012]
    },
    honda: {
      crv: [2015, 2016],
      fit: [2011, 2018],
      civic: [2011, 2018]
    },
    nissan: {
      sentra: [2014, 2018],
      frontier: [2015, 2017],
      versa: [2014, 2017]
    },
    hyundai: {
      tucson: [2014, 2018],
      accent: [2014, 2018],
      elantra: [2012, 2016]
    },
    toyota: {
      corolla: [2014, 2018],
      hilux: [2017],
      prado: [2015],
      yaris: [2014, 2018]
    }
  };

  makes: string[] = Object.keys(this.vehicleOptions);
  models: string[] = [];
  years: number[] = [];

  onMakeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedMake = value;

    // Actualiza los modelos disponibles
    this.models = Object.keys(this.vehicleOptions[this.selectedMake]);

    // Reinicia valores
    this.selectedModel = '';
    this.selectedYear = '';
    this.years = [];

    this.form.get('model')?.setValue('');
    this.form.get('year')?.setValue('');
  }


  onModelChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedModel = value;

    // Actualiza los años disponibles
    this.years = this.vehicleOptions[this.selectedMake][this.selectedModel];

    this.selectedYear = '';
    this.form.get('year')?.setValue('');
  }



  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      plate: ['', Validators.required]
    });
  }

  addVehicle() {
    if (this.form.invalid) return;

    const user = localStorage.getItem('user');
    const driverId = user ? Number(JSON.parse(user).id) : null;

    if (!driverId) {
      this.snackBar.open('No se encontró el usuario logueado', '', { duration: 2000 });
      return;
    }

    const newVehicle = new Vehicle({
      make: this.form.value.make,
      model: this.form.value.model,
      year: this.form.value.year,
      plate: this.form.value.plate,
      driverId
    });

    this.vehicleService.create(newVehicle).subscribe({
      next: (createdVehicle) => {
        const vehicleId = Number(createdVehicle.id);

        if (!vehicleId) {
          this.snackBar.open('El vehículo fue creado pero no tiene ID', '', { duration: 2000 });
          return;
        }

        this.driverService.addVehicleToDriver(driverId, vehicleId).subscribe({
          next: () => {
            this.snackBar.open('Vehículo agregado exitosamente', '', { duration: 2000 });
            this.router.navigate(['/driver-page/home']);
          },
          error: () => {
            this.snackBar.open('Error al asociar vehículo al conductor', '', { duration: 2000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Error al crear vehículo', '', { duration: 2000 });
      }
    });
  }
}
