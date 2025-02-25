import { Component, Input, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../../services/current-user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit {
  
  @Input() currentUser:any;
  login: string = '';
  email: string = '';
  userProfileForm!: FormGroup;

  constructor(private fb: FormBuilder, private currentUserService:CurrentUserService){
  }
  ngOnInit(): void {
    this.OnReceipt();
    this.userProfileForm = this.fb.group({
      login: [''],
      email: [''],
      lastname: [''],
      firstname: [''],
      middlename: [''],
      phone: [''],
    });
  }

  OnReceipt()
  {
    const storedLogin = sessionStorage.getItem('userLogin');
    const storedEmail = sessionStorage.getItem('userEmail');
  
    if (storedLogin && storedEmail) {
      this.login = storedLogin;
      this.email = storedEmail;
    } 
    else {
      this.currentUserService.getUser().subscribe(
        (value) => {
          this.login = value.user.login;
          this.email = value.user.email;
  
          sessionStorage.setItem('userLogin', this.login);
          sessionStorage.setItem('userEmail', this.email);
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }
  }

  OnUpdate()
  {
    const formData3: any = {
      login: this.userProfileForm.value.login,
      email: this.userProfileForm.value.email,
      lastname: this.userProfileForm.value.lastname,
      firstname: this.userProfileForm.value.firstname,
      middlename: this.userProfileForm.value.middlename,
      phone: this.userProfileForm.value.phone,
    };
    this.currentUserService.updateUserData(formData3).subscribe((data: any) => {
      this.currentUserService.getUser().subscribe({
        next: (data) => {
          this.currentUser = data.data2;
          this.currentUserService.saveUser(data.data2);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });
    })
  }


}
