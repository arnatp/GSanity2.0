import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	eventSource = [];
	viewTitle: string;

	calendar = {
		mode: 'week',
		currentDate: new Date(),
	};

	@ViewChild(CalendarComponent) myCal: CalendarComponent;
	constructor() {}
}
