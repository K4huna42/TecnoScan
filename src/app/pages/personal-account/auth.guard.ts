import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private currentUserService:CurrentUserService, ) {}

    canActivate(): boolean {
      const token = localStorage.getItem('YXV0aFRva2Vu');
      if (!token) {
        this.router.navigate(['/login'])
        console.log("ошибка, токен не найден")  
        return false    
      }


      const localId = localStorage.getItem('VXNlcklk');
      if (!localId) {
        console.log("Ошибка: ID пользователя не найден");
        this.router.navigate(['/login']);
        return false;
      }

      this.currentUserService.getUser().subscribe(
      (value) => {

      if (!value.user || value.user.id !== localId){
        console.log("Ошибка: пользователь не найден");
        this.router.navigate(['/login']);
        return false
      }
      console.log(value.user)
      this.currentUserService.saveUser(value.user);
      return true
            
      },
      (error) => {
        console.log(error.error.message);
        this.router.navigate(['/login']);
        return false
      })
      return true
    }
}
