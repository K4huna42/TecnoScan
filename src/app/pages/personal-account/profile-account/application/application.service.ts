import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormCard } from '../../../../interfaces/card';
import { CarId } from '../../../../interfaces/card';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('YXV0aFRva2Vu');
    if (!token) {
      throw new Error('Token not found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getCapacity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/engineVolume/`);
  }

  getGearBox(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/transmissionType/`);
  }

  getMark(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/carBrand/`);
  }

  setCar(formCard: FormCard): Observable<any> {
    return this.http.post(`${environment.apiUrl}/userCar/`, formCard, {headers: this.getAuthHeaders(),});
  }

  getCar(): Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/userCar`, {headers: this.getAuthHeaders(),})
  }
  getCarId(carid:CarId): Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/userCar/${carid}`, {headers: this.getAuthHeaders(),})
  }
}
