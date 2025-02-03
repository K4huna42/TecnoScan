import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationPagesRoutingModule } from './authentication-routing.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationPagesRoutingModule,
    ButtonModule,
  ]
})
export class AuthenticationModule { }
