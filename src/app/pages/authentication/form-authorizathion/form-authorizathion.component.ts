import { Component, OnInit } from '@angular/core';
import { FormAuthorizathionService } from './form-authorizathion.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { CurrentUserService } from '../../../services/current-user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-form-authorizathion',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, FloatLabelModule, ButtonModule,],
  templateUrl: './form-authorizathion.component.html',
  styleUrl: './form-authorizathion.component.scss'
})
export class FormAuthorizathionComponent implements OnInit {

  SignInForm!: FormGroup;
  
  constructor(private fb: FormBuilder,private formAuthorizathionService: FormAuthorizathionService, 
      private currentUserService: CurrentUserService,
      private router: Router,
      private tokenService: TokenService,){
        this.SignInForm = this.fb.group({
                UserLogin: ['', Validators.required],
                UserPassword: ['', Validators.required],
              });
    }

  ngOnInit(): void {

  }
  onSignIn() {
    
    this.SignInForm.markAllAsTouched();

    const formData = this.SignInForm.value;

    const data = {
      UserLogin: formData.UserLogin,
      UserPassword: formData.UserPassword,
    }

    console.log('Login:', formData.UserLogin);
    console.log('Password:', formData.UserPassword);

    this.formAuthorizathionService.signIn(data).subscribe(
      (value) => {
          this.tokenService.setToken(value.token);
          this.router.navigate([`/${value.userId}`]);
          localStorage.setItem('VXNlcklk', value.userId);
      },
      (error) => {
        console.log(error.error.message)
        
      }
    )
  }
  

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSignIn();
    }
  }

  

}
