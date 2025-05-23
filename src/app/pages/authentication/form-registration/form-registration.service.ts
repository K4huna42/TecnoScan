import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { formData1 } from '../../../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class FormRegistrationService {

  constructor(private http: HttpClient) { }

  signUp(formData: formData1 
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/authUser/registration`, formData);
  }
}
