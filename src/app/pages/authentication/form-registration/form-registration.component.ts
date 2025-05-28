import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRegistrationService } from './form-registration.service';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../services/token.service';
import { CurrentUserService } from '../../../services/current-user.service';

@Component({
  selector: 'app-form-registration',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, FloatLabelModule, ButtonModule
  ],
  templateUrl: './form-registration.component.html',
  styleUrl: './form-registration.component.scss'
})
export class FormRegistrationComponent implements OnInit {

  SignUpForm: FormGroup;
  
  constructor(private fb: FormBuilder, private formRegistrationService: FormRegistrationService, 
    private router: Router,
    private tokenService: TokenService,
    private currentUserService: CurrentUserService,){
      this.SignUpForm = this.fb.group({
        login: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }
  ngOnInit(): void {

  }

  onSignUp() {

    this.SignUpForm.markAllAsTouched();

    if (this.SignUpForm.valid) {

      const formData = this.SignUpForm.value;

      const data = {
        Login: formData.login,
        Email: formData.email,
        Password: formData.password,
      }

      this.formRegistrationService.signUp(data).subscribe(
        (value) => {
            localStorage.setItem('VXNlcklk', value.id);
            this.tokenService.setToken(value.token);
            console.log(value.token)
            this.router.navigate([`/${value.id}`]);
            
        },
        (error) => {
          console.log(error.error.message)
        }
      )
    }
  }
  

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSignUp();
    }
  }

}
