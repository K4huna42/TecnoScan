import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { formData } from '../../../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class FormAuthorizathionService {

  constructor(private http: HttpClient) { }

  signIn(formData: formData 
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/personal_account/authorizathion`, formData);
  }
}
