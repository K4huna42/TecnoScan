import { Component } from '@angular/core';
import { FormDeleteComponent } from './Components/form-delete/form-delete.component';

@Component({
  selector: 'app-profile-account',
  standalone: true,
  imports: [FormDeleteComponent],
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.scss'
})
export class ProfileAccountComponent {

}
