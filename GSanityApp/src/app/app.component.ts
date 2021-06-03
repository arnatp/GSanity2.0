import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor(private translate: TranslateService) {
		this.initializeApp();
	}
	initializeApp() {
		this.translate.setDefaultLang('en');
		var lang = localStorage.getItem('lang');
		if (!lang) lang = this.translate.getBrowserLang();
		this.translate.use(lang);
	}
}
