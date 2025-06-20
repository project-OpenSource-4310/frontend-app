export class Mechanic {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  vehicles_assigned: number[];
  assignment_requests_received: number[];
  maintenance_requests_sent: number[];
  inventories:number[];

  constructor(mechanic: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    vehicles_assigned?: number[];
    assignment_requests_received?: number[];
    maintenance_requests_sent?: number[];
    inventories?:number[];
  }) {
    this.id = mechanic.id || 0;
    this.firstName = mechanic.firstName || '';
    this.lastName = mechanic.lastName || '';
    this.email = mechanic.email || '';
    this.password = mechanic.password || '';
    this.phone = mechanic.phone || '';
    this.vehicles_assigned = mechanic.vehicles_assigned || [];
    this.assignment_requests_received=mechanic.assignment_requests_received || [];
    this.maintenance_requests_sent=mechanic.maintenance_requests_sent || [];
    this.inventories=mechanic.inventories || [];
  }
}
