import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccountComponent } from './home-account.component';

const routes: Routes = [
  {
    path: '', component: HomeAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class HomeAccountRoutingModule { }
