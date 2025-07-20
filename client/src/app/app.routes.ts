import { Routes } from '@angular/router';
import { Login } from '../public/page/login/login';
import { Accueil } from '../public/page/accueil/accueil';
import { Register } from '../public/page/register/register';
import { Home } from '../private/page/home/home';
import { Profile } from '../private/page/profile/profile';
import { Gaming } from '../private/page/gaming/gaming';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'profile', component: Profile },
  { path: 'gaming', component: Gaming },
  { path: '**', redirectTo: '' } // Wildcard route pour les pages non trouvées
];

