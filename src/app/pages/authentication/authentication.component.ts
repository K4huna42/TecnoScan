import { Component } from '@angular/core';
import { FormAuthorizathionComponent } from './form-authorizathion/form-authorizathion.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormAuthorizathionComponent,
    FormRegistrationComponent
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

}
