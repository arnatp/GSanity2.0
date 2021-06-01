import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPage } from './history.page';

const routes: Routes = [
	{
		path: '',
		component: HistoryPage,
	},
	{
		path: 'visit/:id',
		pathMatch: 'full',
		loadChildren: () =>
			import('../history/visit/visit.module').then((m) => m.VisitPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HistoryPageRoutingModule {}
