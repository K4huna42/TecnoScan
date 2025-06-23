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
  
  currentUser:any;
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
    this.OnReceipt()
  }

  patchValueData(data: any)
  {
    this.userProfileForm.patchValue({
      login: data?.login,
      email: data?.email,
      lastname: data?.lastname,
      firstname: data?.firstname,
      middlename: data?.middlename,
      phone: data?.phone,})
  }

  OnReceipt()
  {
    const storedUser = this.currentUserService.getUserSession();

    if (!storedUser) {
      this.currentUserService.getUser().subscribe(
        (value) => {
          this.currentUserService.saveUser(value.user);
          this.patchValueData(value.user)
          console.log(value.user)
        },
        (error) => {
          console.log(error.error.message);
        }
      );   
    }
    else
    {
      const FlowUser = this.currentUserService.getUserSession()
      this.patchValueData(FlowUser)
    } 
  }

  OnUpdate()
  {
    console.log(this.userProfileForm.value)
    this.currentUserService.updateUserData(this.userProfileForm.value).subscribe((data: any) => {
          this.currentUserService.saveUser(data.user);
          this.formUserService.changeUpdate(data.user)
          this.currentUser = data.user
    })
  }
}
