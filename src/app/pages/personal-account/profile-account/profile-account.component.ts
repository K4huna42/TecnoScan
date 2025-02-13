import { Component } from '@angular/core';
import { FormDeleteComponent } from './Components/form-delete/form-delete.component';
import { FormUserComponent } from './Components/form-user/form-user.component';

@Component({
  selector: 'app-profile-account',
  standalone: true,
  imports: [FormDeleteComponent, FormUserComponent],
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.scss'
})
export class ProfileAccountComponent {

}
