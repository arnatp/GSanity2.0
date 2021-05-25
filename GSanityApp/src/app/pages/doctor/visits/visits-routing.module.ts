import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: VisitsPage,
			},
			{
				path: 'visit/:id',
				pathMatch: 'full',
				loadChildren: () =>
					import('../visits/visit/visit.module').then(
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
export class VisitsPageRoutingModule {}
