export class AssignmentRequest {
  id!: number;
  description!: string;
  vehicleId!: number;
  driverId!: number;
  mechanicId!: number;
  accepted!: boolean;

  constructor(data: Partial<AssignmentRequest>) {
    this.id = data.id ?? 0;
    this.description = data.description || '';
    this.vehicleId = data.vehicleId ?? 0;
    this.driverId = data.driverId ?? 0;
    this.mechanicId = data.mechanicId ?? 0;
    this.accepted = data.accepted ?? false;
  }
}
