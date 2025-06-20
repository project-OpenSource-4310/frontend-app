export class MaintenanceRequest {
  id!: number;
  title!:string;
  description!: string;
  budget!: number;
  vehicleId!: number;
  driverId!: number;
  mechanicId!: number;
  accepted!: boolean;

  constructor(data: Partial<MaintenanceRequest>) {
    this.id = data.id ?? 0;
    this.title=data.title||'';
    this.description = data.description || '';
    this.budget = data.budget ?? 0;
    this.vehicleId = data.vehicleId ?? 0;
    this.driverId = data.driverId ?? 0;
    this.mechanicId = data.mechanicId ?? 0;
    this.accepted = data.accepted ?? false;
  }
}
