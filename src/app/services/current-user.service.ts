import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly storageKey = 'currentUser';

  constructor() { }

  saveUser(user: any): void {
    if (user) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }
}
