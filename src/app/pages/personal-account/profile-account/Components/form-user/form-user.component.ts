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
      this.userProfileForm.patchValue({value})
    }));
    if(!this.currentUserService.getUserSession())
    {
        this.OnReceipt()
    }
    else
    {
      const FlowUser = this.currentUserService.getUserSession()
      this.userProfileForm.patchValue({FlowUser})
      console.log(FlowUser)
    }
  }

  OnReceipt()
  {
    const storedUser = this.currentUserService.getUserSession();

    if (!storedUser) {
      this.currentUserService.getUser().subscribe(
        (value) => {
          sessionStorage.setItem('user', value.user);
          this.formUserService.changeUpdate(storedUser)
        },
        (error) => {
          console.log(error.error.message);
        }
      );   
    } 
  }

  OnUpdate()
  {
    this.currentUserService.updateUserData(this.userProfileForm.value).subscribe((data: any) => {
      this.currentUserService.getUser().subscribe({
        next: (data) => {
          this.currentUser = data.data2;
          this.currentUserService.saveUser(data.data2);
          this.formUserService.changeUpdate(data.data2)
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });
    })
  }
}
