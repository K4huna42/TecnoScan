import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAccountComponent } from './profile-account.component';

const routes: Routes = [
  {
    path: '', component: ProfileAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})

export class ProfileAccountRoutingModule { }
