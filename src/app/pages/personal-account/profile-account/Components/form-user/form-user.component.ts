import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentUserService } from '../../../../../services/current-user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUserService } from './form-user.service';
import { __values } from 'tslib';

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
  hasUpdated: boolean = false;
  userProfileForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private currentUserService:CurrentUserService,
    private formUserService: FormUserService){
    this.userProfileForm = this.fb.group({
      login: [''],
      email: [''],
      lastname: [''],
      firstname: [''],
      middlename: [''],
      phone: [''],
    });
  }
  
  ngOnInit(): void {
    this.formUserService.UpdatesTab$.subscribe((value => {
      if(value == "personal")
      {
        this.currentUserService.getUser().subscribe(
          (value) => {
            this.login = value.user.login;
            this.email = value.user.email;
            sessionStorage.setItem('userLogin', this.login);
            sessionStorage.setItem('userEmail', this.email);
            console.log(this.login)
            console.log(this.email)
            this.formUserService.changeUpdate(" ")
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      }
      else
      {
        this.OnReceipt();
      }
    }));
  }

  OnReceipt()
  {
    const storedLogin = sessionStorage.getItem('userLogin');
    const storedEmail = sessionStorage.getItem('userEmail');

    if (storedLogin == null && storedEmail == null) {
      this.currentUserService.getUser().subscribe(
        (value) => {
          this.login = value.user.login;
          this.email = value.user.email;
          sessionStorage.setItem('userLogin', this.login);
          sessionStorage.setItem('userEmail', this.email);
          console.log(this.login)
          console.log(this.email)
          
        },
        (error) => {
          console.log(error.error.message);
        }
      );   
    } 
    else
    {
      this.login = storedLogin ?? '';
      this.email = storedEmail ?? '';
      console.log(this.login)
      console.log(this.email)
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
          this.formUserService.changeUpdate("personal")
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });
    })
  }


}
