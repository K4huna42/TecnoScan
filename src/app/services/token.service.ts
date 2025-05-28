import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authTokenSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authTokenSubject.asObservable();

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('YXV0aFRva2Vu');
  }

  setToken(token: string): void {
    localStorage.setItem('YXV0aFRva2Vu', token);
    this.authTokenSubject.next(true);
  }
  getToken(): void {
    localStorage.getItem('YXV0aFRva2Vu');
    this.authTokenSubject.next(true);
  }
  getValueToken(): string {
    const valueToken = localStorage.getItem('YXV0aFRva2Vu')

    return valueToken ? valueToken : ""
  }

}
