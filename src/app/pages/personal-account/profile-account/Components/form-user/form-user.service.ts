import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormUserService {

  constructor() { }

  private userUpdatesSubject = new BehaviorSubject<string>('');
  UpdatesTab$ = this.userUpdatesSubject.asObservable();

  getCurrentUpdate(): string {
    return this.userUpdatesSubject.value;
  }

  changeUpdate(value: any) {
    this.userUpdatesSubject.next(value);
  }
}
