import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'solicitar',
    loadChildren: () =>
      import('./solicitar/solicitar.module').then((m) => m.SolicitarPageModule),
  },
  {
    path: 'historial',
    loadChildren: () =>
      import('./historial/historial.module').then((m) => m.HistorialPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth-pages/login/login.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'recover-password',
        loadChildren: () =>
          import(
            './pages/auth-pages/recover-password/recover-password.module'
          ).then((m) => m.RecoverPasswordPageModule),
      },
    ],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth-pages/register/register.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/auth-pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
