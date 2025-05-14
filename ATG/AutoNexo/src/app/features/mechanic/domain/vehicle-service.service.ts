import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';
  constructor(private http: HttpClient) { }

  getToyotaModels(): Observable<any[]> {
    const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/Toyota?format=json";
    return this.http.get<any>(url).pipe(
      map(response => response.Results)
    );
  }
}
