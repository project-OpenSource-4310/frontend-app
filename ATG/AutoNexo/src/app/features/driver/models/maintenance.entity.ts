export class Maintenance {
    id: number;
    title: string;
    description: string;
    budget: number;
    vehicleId: number;
    mechanicId: number;
    driverId: number;
    requestId: number;
    completed: boolean;

    constructor(data: {
        id?: number;
        title?: string;
        description?: string;
        budget?: number;
        vehicleId?: number;
        mechanicId?: number;
        driverId?: number;
        requestId?: number;
        completed?: boolean;
    }) {
        this.id = data.id || 0;
        this.title = data.title || '';
        this.description = data.description || '';
        this.budget = data.budget || 0;
        this.vehicleId = data.vehicleId || 0;
        this.mechanicId = data.mechanicId || 0;
        this.driverId = data.driverId || 0;
        this.requestId = data.requestId || 0;
        this.completed = data.completed ?? false;
    }
}
