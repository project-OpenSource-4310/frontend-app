import { Component } from '@angular/core';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Mechanic} from '../../../authentication/models/mechanic.entity';
import {Vehicle} from '../../../driver/models/vehicle.entity';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MechanicService} from '../../../authentication/services/mechanic.service';
import {VehicleService} from '../../../driver/services/vehicle.service';

@Component({
  selector: 'app-mechanic-profile',
  templateUrl: './mechanic-profile.component.html',
  styleUrls: ['./mechanic-profile.component.css'],
  imports: [
    FormsModule,
    NgIf,
    GobackButtonComponent,
    NgForOf,
    NgClass
  ],
})
export class MechanicProfileComponent {
  mechanic!: Mechanic;
  editing = false;
  vehicles: Vehicle[] = [];
  brandCounts: { [key: string]: number } = {};
  brandStats: { brand: string, count: number }[] = [];
  profileImage: SafeUrl | string = '';
  constructor(
    private mechanicService: MechanicService,
    private vehicleService: VehicleService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const mechanicId = user ? Number(JSON.parse(user).id) : null;

    if (mechanicId) {
      this.mechanicService.getById(mechanicId).subscribe(driver => {
        this.mechanic = driver;
        const vehicleIds = driver.vehicles_assigned || [];

        this.vehicleService.getByIds(vehicleIds).subscribe(vehicles => {
          this.vehicles = vehicles;
          this.countBrands();
        });
      });
    }
  }
  saveChanges(): void {
    this.mechanicService.update(this.mechanic.id, this.mechanic).subscribe(updated => {
      this.mechanic = updated;
      this.editing = false;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Usamos toString() para asegurarnos de que es un string
        this.profileImage = e.target.result.toString();
      };
      reader.readAsDataURL(file);
    }
  }
  private countBrands(): void {
    this.brandCounts = {};

    this.vehicles.forEach(vehicle => {
      const brand = vehicle.make;
      if (this.brandCounts[brand]) {
        this.brandCounts[brand]++;
      } else {
        this.brandCounts[brand] = 1;
      }
    });

    this.brandStats = Object.keys(this.brandCounts).map(brand => ({
      brand: brand,
      count: this.brandCounts[brand]
    }));
  }
}
