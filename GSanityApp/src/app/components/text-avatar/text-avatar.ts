/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import {
	Input,
	SimpleChanges,
	Component,
	ViewChild,
	OnChanges,
} from '@angular/core';
import { ColorGenerator } from './color-generator';

@Component({
	selector: 'text-avatar',
	template: `
		<div class="u-text-avatar" [ngStyle]="styles">{{ firstLetter }}</div>
	`,
	styleUrls: ['./text-avatar.scss'],
})
export class TextAvatarDirective implements OnChanges {
	@Input() name: string;
	@Input() surnames: string;
	@Input() color: string;
	@Input() textColor: string;

	public firstLetter = '';
	public styles = {
		'background-color': '#fff',
		color: '#000',
	};

	constructor(private colorGenerator: ColorGenerator) {}

	ngOnChanges(changes: SimpleChanges) {
		const name = changes.name ? changes.name.currentValue : null;
		const surnames = changes.surnames ? changes.surnames.currentValue : null;
		const color = changes.color ? changes.color.currentValue : null;
		this.textColor = changes.textColor
			? changes.textColor.currentValue
			: this.styles.color;

		this.firstLetter =
			this.extractFirstCharacter(name) +
			this.extractFirstCharacter(surnames);

		this.styles = {
			...this.styles,
			'background-color': this.backgroundColorHexString(color, name),
			color: this.textColor,
		};
	}

	private extractFirstCharacter(text: string): string {
		return text.charAt(0) || '';
	}

	private backgroundColorHexString(color: string, text: string): string {
		return color || this.colorGenerator.getColor(text);
	}
}
