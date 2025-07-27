import { Routes } from '@angular/router';
import { Login } from '../public/page/login/login';
import { Accueil } from '../public/page/accueil/accueil';
import { Register } from '../public/page/register/register';
import { Home } from '../private/page/home/home';
import { Profile } from '../private/page/profile/profile';
import { Gaming } from '../private/page/gaming/gaming';

import { Sport } from '../private/page/sport/sport';
import { Cinema } from '../private/page/cinema/cinema';
import { Musique } from '../private/page/musique/musique';
import { ChangePasswordComponent } from '../private/page/change-password/change-password';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'home',
    component: Home,
    canActivate: [() => {
      // Nouvelle logique : vérification via requête backend (cookie HTTPOnly)
      return fetch('http://127.0.0.1:3000/api/auth/me', { credentials: 'include' })
        .then(res => {
          if (res.status === 200) return true;
          window.location.href = '/login';
          return false;
        })
        .catch(() => {
          window.location.href = '/login';
          return false;
        });
    }]
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [() => {
      return fetch('http://127.0.0.1:3000/api/auth/me', { credentials: 'include' })
        .then(res => {
          if (res.status === 200) return true;
          window.location.href = '/login';
          return false;
        })
        .catch(() => {
          window.location.href = '/login';
          return false;
        });
    }]
  },
  { path: 'gaming', component: Gaming },
  { path: 'sport', component: Sport },
  { path: 'cinema', component: Cinema },
  { path: 'musique', component: Musique },
  { path: 'private/change-password', component: ChangePasswordComponent },
  { path: '**', redirectTo: '' } // Wildcard route pour les pages non trouvées
];

