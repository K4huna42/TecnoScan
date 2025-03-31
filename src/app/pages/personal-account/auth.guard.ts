import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router) {}

    canActivate(): boolean {
      const token = localStorage.getItem('YXV0aFRva2Vu');
      if (!token) {
        this.router.navigate(['/login'])
        console.log("ошибка, токен не найден")  
        return false    
      }
      return true
    }
}
