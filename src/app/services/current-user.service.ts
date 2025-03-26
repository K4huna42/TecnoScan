import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { formData3 } from '../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly storageKey = 'user';

  constructor(private http: HttpClient) { }

  saveUser(user: any): void {
    if (user) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  getUserSession(): any {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
  
  removeUser(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('YXV0aFRva2Vu');
    if (!token) {
      throw new Error('Token not found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  

  deleteUser(): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}/profile/`, {
        headers: this.getAuthHeaders(),
      })
  }

  getUser(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/profile/`, {
        headers: this.getAuthHeaders(),
      })
  }
  updateUserData(user: formData3): Observable<any> {
      return this.http
        .patch<any>(`${environment.apiUrl}/profile/`, user, {
          headers: this.getAuthHeaders(),
        })
    }
}
