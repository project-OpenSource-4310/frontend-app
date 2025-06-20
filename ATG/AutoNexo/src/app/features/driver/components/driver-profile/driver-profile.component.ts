import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../authentication/services/driver.service';
import { Driver } from '../../../authentication/models/driver.entity';
import { FormsModule } from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { GobackButtonComponent } from '../../../../shared/components/buttons/goback-button/goback-button.component';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.entity';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
  imports: [
    FormsModule,
    NgIf,
    GobackButtonComponent,
    NgForOf,
    NgClass
  ],
})
export class DriverProfileComponent implements OnInit {
  driver!: Driver;
  editing = false;
  vehicles: Vehicle[] = [];
  brandCounts: { [key: string]: number } = {};
  brandStats: { brand: string, count: number }[] = [];
  profileImage: SafeUrl | string = '';

  constructor(
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const driverId = user ? Number(JSON.parse(user).id) : null;

    if (driverId) {
      this.driverService.getById(driverId).subscribe(driver => {
        this.driver = driver;
        const vehicleIds = driver.vehicles_owned || [];

        this.vehicleService.getByIds(vehicleIds).subscribe(vehicles => {
          this.vehicles = vehicles;
          this.countBrands();
        });
      });
    }
  }

  saveChanges(): void {
    this.driverService.update(this.driver.id, this.driver).subscribe(updated => {
      this.driver = updated;
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
