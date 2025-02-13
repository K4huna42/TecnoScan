import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../../services/current-user.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit{
  userLogin: string | null = '';
  userPassword: string | null = '';

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUserService.userLogin$.subscribe((login) => {
      this.userLogin = login;
    });
    this.currentUserService.userPassword$.subscribe((password) => {
      this.userPassword = password;
    });
  }

}
