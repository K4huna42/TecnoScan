import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly storageKey = 'currentUser';

  constructor(private http: HttpClient) { }

  saveUser(user: any): void {
    if (user) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(user));
    }
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
      .get<any>(`${environment.apiUrl}/personal_account/user`, {
        headers: this.getAuthHeaders(),
      })
  }

}
