import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { formData2 } from '../../../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class FormAuthorizathionService {

  constructor(private http: HttpClient) { }

  signIn(formData: formData2 
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/authUser/auth`, formData);
  }
}
