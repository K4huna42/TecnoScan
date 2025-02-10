import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../../services/current-user.service';

@Component({
  selector: 'app-form-delete',
  standalone: true,
  imports: [],
  templateUrl: './form-delete.component.html',
  styleUrl: './form-delete.component.scss'
})
export class FormDeleteComponent {

  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private currentUserService: CurrentUserService,
  ) {
    this.deleteForm = this.fb.group({
      confirm: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {

  
  this.currentUserService.deleteUser().subscribe(
    () => {
      // localStorage.removeItem('YXV0aFRva2Vu');
      // localStorage.removeItem('VXNlcklk');
      // this.router.navigate(['/login']);
    },
    (error) => {
      console.log(error.error.message)
    }
  );
}

}
