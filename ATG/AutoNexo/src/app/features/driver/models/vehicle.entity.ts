export class Vehicle {
  id!: number;
  make!: string;
  model!: string;
  year!: string;
  plate!: string;
  driverId!: number;
  mechanicId!: number;
  maintenances: number[];

  constructor(data: Partial<Vehicle>) {
    this.id = data.id ?? 0;
    this.make = data.make || '';
    this.model = data.model || '';
    this.year = data.year || '';
    this.plate = data.plate || '';
    this.driverId = data.driverId ?? 0;
    this.mechanicId = data.mechanicId ?? 0;
    this.maintenances = data.maintenances || [];
  }
}
