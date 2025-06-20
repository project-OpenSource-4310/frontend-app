import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {HistoryButtonComponent} from '../../../../shared/components/buttons/history-button/history-button.component';
import {
  AddRequestButtonComponent
} from '../../../../shared/components/buttons/add-request-button/add-request-button.component';
import {Vehicle} from '../../models/vehicle.entity';
import {VehicleService} from '../../services/vehicle.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MechanicService} from '../../../authentication/services/mechanic.service';
import {MaintenancesListComponent} from '../../../mechanic/components/maintenances-list/maintenances-list.component';

@Component({
  selector: 'app-driver-vehicle',
  imports: [
    GobackButtonComponent,
    HistoryButtonComponent,
    AddRequestButtonComponent,
    NgIf,
    RouterLink,
    MaintenancesListComponent
  ],
  templateUrl: './driver-vehicle.component.html',
  styleUrl: './driver-vehicle.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DriverVehicleComponent implements OnInit {
  getVehicleImageUrl(): string {
    if (!this.vehicle) return '';

    const make = this.vehicle.make.toLowerCase();
    const model = this.vehicle.model.toLowerCase();
    const year = this.vehicle.year;

    return `https://i.postimg.cc/${this.getImagePath(make, model, year)}`;
  }

// Mapea las rutas parciales según tu lista original
  private getImagePath(make: string, model: string, year: string): string {
    const fullName = `${make}-${model}-${year}`;
    const imageMap: Record<string, string> = {
      'honda-civic-2011': 'KzKBFF0q/honda-civic-2011.png',
      'honda-civic-2018': 'hPV8fDcN/honda-civic-2018.png',
      'honda-crv-2015': 'qRYcCgtH/honda-crv-2015.png',
      'honda-crv-2016': 'prFfQx8h/honda-crv-2016.png',
      'honda-fit-2011': 'tRZNGdfN/honda-fit-2011.png',
      'honda-fit-2018': 'ZYGFbBtr/honda-fit-2018.png',
      'hyundai-accent-2014': '4dMdfgrd/hyundai-accent-2014.png',
      'hyundai-accent-2018': 'QM8VSSQX/hyundai-accent-2018.png',
      'hyundai-elantra-2012': 'fy9bkPNv/hyundai-elantra-2012.png',
      'hyundai-elantra-2016': '3WQxGZrQ/hyundai-elantra-2016.png',
      'hyundai-tucson-2014': 'dVmL8gTH/hyundai-tucson-2014.png',
      'hyundai-tucson-2018': 'vBDTwB2k/hyundai-tucson-2018.png',
      'nissan-frontier-2015': 'K8yNNK0Z/nissan-frontier-2015.png',
      'nissan-frontier-2017': '02SnDGdW/nissan-frontier-2017.png',
      'nissan-sentra-2014': 'XvjkRRMm/nissan-sentra-2014.png',
      'nissan-sentra-2018': 'CMXJRrDn/nissan-sentra-2018.png',
      'nissan-versa-2014': 'cH6MHfLc/nissan-versa-2014.png',
      'nissan-versa-2017': 'HL69d6dx/nissan-versa-2017.png',
      'subaru-forester-2012': 'y8PFyLJP/subaru-forester-2012.png',
      'subaru-impreza-2015': '3x7XGswN/subaru-impreza-2015.png',
      'subaru-impreza-2018': 'CKrkWdsn/subaru-impreza-2018.png',
      'subaru-outblack-2017': 'k5gW1WKd/subaru-outblack-2017.png',
      'toyota-corolla-2014': '5yYXL0wL/toyota-corolla-2014.png',
      'toyota-corolla-2018': 'tTm1sPV9/toyota-corolla-2018.png',
      'toyota-hilux-2017': 'zD6b5Crj/toyota-hilux-2017.png',
      'toyota-prado-2015': 'gjCnDWD5/toyota-prado-2015.png',
      'toyota-yaris-2014': 'YqF4Sv2w/toyota-yaris-2014.png',
      'toyota-yaris-2018': 'QdrFKjVK/toyota-yaris-2018.png',
    };

    return imageMap[fullName] || 'KzKBFF0q/honda-civic-2011.png'; // imagen por defecto si no existe
  }

  vehicle!: Vehicle;
  mechanicName:string='Aun no asignado';
  constructor(private vehicleService: VehicleService,private mechanicService: MechanicService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedVehicleId');
    if (id) {
      const numericId = Number(id);
      this.vehicleService.getById(numericId).subscribe(vehicle => {
        this.vehicle = vehicle;
        this.mechanicService.getById(this.vehicle.mechanicId).subscribe(
          mechanic => {
            this.mechanicName = `${mechanic.firstName} ${mechanic.lastName}`;
          });
      });
    }
  }

}
