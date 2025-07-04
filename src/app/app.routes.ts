import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormAuthorizathionComponent } from './pages/authentication/form-authorizathion/form-authorizathion.component';
import { AuthGuard } from './pages/personal-account/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'login', loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: ':UserId', loadChildren: () => import('./pages/personal-account/personal-account.module').then(m => m.PersonalAccountModule),  canActivate: [AuthGuard],
    },

];
