import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAccountComponent } from './personal-account.component';

const routes: Routes = [
  {
    path: '', 
    component: PersonalAccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'home', 
        pathMatch: 'full'  
      },
      {
        path: 'home', 
        loadChildren:() => import('./home-account/home-account.module').then(m => m.HomeAccountModule) 
      },
      {
        path: 'settings', 
        loadChildren:() => import('./settings-account/settings-account.module').then(m => m.SettingsAccountModule) 
      },
      {
        path: 'profile', 
        loadChildren:() => import('./profile-account/profile-account.module').then(m => m.ProfileAccountModule) 
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})

export class PersonalAccountRoutingModule { }
