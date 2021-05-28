import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.page.html',
	styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
	clickTab(event: Event, tab: string) {
		event.stopImmediatePropagation();
		this.router.navigate([`${'doctor/'}${tab}`]);
	}
}
