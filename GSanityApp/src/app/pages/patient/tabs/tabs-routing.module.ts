import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				loadChildren: () =>
					import('../home/home.module').then((m) => m.HomePageModule),
			},
			{
				path: 'solicitar',
				loadChildren: () =>
					import('../solicitar/solicitar.module').then(
						(m) => m.SolicitarPageModule
					),
			},
			{
				path: 'historial',
				children: [
					{
						path: '',
						pathMatch: 'full',
						loadChildren: () =>
							import('../historial/historial.module').then(
								(m) => m.HistorialPageModule
							),
					},
					{
						path: 'visit/:id',
						pathMatch: 'full',
						loadChildren: () =>
							import('../historial/visit/visit.module').then(
								(m) => m.VisitPageModule
							),
					},
				],
			},
			{
				path: 'perfil',
				loadChildren: () =>
					import('../perfil/perfil.module').then(
						(m) => m.PerfilPageModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TabsPageRoutingModule {}
