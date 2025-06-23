import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRegistrationService } from './form-registration.service';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../services/token.service';
import { CurrentUserService } from '../../../services/current-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-registration',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, FloatLabelModule, ButtonModule, CommonModule
  ],
  templateUrl: './form-registration.component.html',
  styleUrl: './form-registration.component.scss'
})
export class FormRegistrationComponent implements OnInit {

  SignUpForm: FormGroup;

  constructor(private fb: FormBuilder, private formRegistrationService: FormRegistrationService,
    private router: Router,
    private tokenService: TokenService,
    private currentUserService: CurrentUserService,) {
    this.SignUpForm = this.fb.group({
      login: ['', [Validators.required, this.loginValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.loginValidator()]],
    });
  }
  ngOnInit(): void {

  }

  private loginValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errors: ValidationErrors = {};

      if (value) {
        const allowedChars = /^[A-Za-z0-9]*$/;
        const hasSpaces = /\s/;

        if (!allowedChars.test(value)) {
          errors['englishLettersOnly'] = true;
        }

        if (hasSpaces.test(value)) {
          errors['noSpacesAllowed'] = true;
        }
      }

      return Object.keys(errors).length ? errors : null;
    };
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
