import { Routes } from '@angular/router';
import { Login } from '../public/page/login/login';
import { Accueil } from '../public/page/accueil/accueil';
import { Home } from '../private/page/home/home';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: '**', redirectTo: '' } // Wildcard route pour les pages non trouvées
];

