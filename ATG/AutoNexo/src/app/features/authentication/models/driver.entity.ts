export class Driver {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  vehicles_owned: number[];
  assignment_requests_sent: number[];
  maintenance_requests_received: number[];

  constructor(driver: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    vehicles_owned?: number[];
    assignment_requests_sent?: number[];
    maintenance_requests_received?: number[];
  }) {
    this.id = driver.id || 0;
    this.firstName = driver.firstName || '';
    this.lastName = driver.lastName || '';
    this.email = driver.email || '';
    this.password = driver.password || '';
    this.phone = driver.phone || '';
    this.vehicles_owned = driver.vehicles_owned || [];
    this.assignment_requests_sent = driver.assignment_requests_sent || [];
    this.maintenance_requests_received=driver.maintenance_requests_received || [];
  }
}
