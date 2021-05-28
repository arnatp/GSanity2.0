import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.page.html',
	styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
	constructor(private router: Router) {}

	//Este método sirve para que no se propague un navigate dentro de una vista del tab
	clickTab(event: Event, tab: string) {
		event.stopImmediatePropagation();
		this.router.navigate([`${'patient/'}${tab}`]);
	}
}
