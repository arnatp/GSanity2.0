import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialPage } from './historial.page';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: HistorialPage,
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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HistorialPageRoutingModule {}
