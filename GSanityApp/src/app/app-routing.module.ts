import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }, {
    path: "solicitar",
    loadChildren: () => import('./solicitar/solicitar.module').then(m => m.SolicitarPageModule)
  },
  {
    path: "historial",
    loadChildren: () => import('./historial/historial.module').then(m => m.HistorialPageModule)
  },
  {
    path: "perfil",
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
