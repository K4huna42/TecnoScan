import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormAuthorizathionComponent } from './pages/authentication/form-authorizathion/form-authorizathion.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: FormAuthorizathionComponent },
];
