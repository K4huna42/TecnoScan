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
  imports: [ ReactiveFormsModule, FormsModule, FloatLabelModule, ButtonModule],
  templateUrl: './form-authorizathion.component.html',
  styleUrl: './form-authorizathion.component.scss'
})
export class FormAuthorizathionComponent implements OnInit {

  SignInForm!: FormGroup;
  
  constructor(private fb: FormBuilder,private formAuthorizathionService: FormAuthorizathionService, 
      private router: Router,
      private tokenService: TokenService,){
        this.SignInForm = this.fb.group({
                login: ['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.required],
              });
    }

  ngOnInit(): void {

  }
  onSignIn() {
    
    this.SignInForm.markAllAsTouched();

    const formData = this.SignInForm.value;

    const data = {
      Login: formData.login,
      Email: formData.email,
      Password: formData.password,
    }

    this.formAuthorizathionService.signIn(data).subscribe(
      (value) => {
          this.tokenService.setToken(value.data.token);
          this.router.navigate([`/${value.data.id}`]);
          localStorage.setItem('VXNlcklk', value.data.id);
          
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
