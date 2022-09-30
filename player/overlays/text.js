import { Overlay } from "./overlay.js";

export class Text extends Overlay {
	/**
	 * Текст-содержимое наложения
	 * @type {string}
	 */
	text;
	
	/** @override */
	constructor(params) {
		super(params);
		this.text = params?.text;
		
		if (typeof this.text !== 'string') {
			throw new TypeError('A text to the created overlay is not specified')
		}
	}
	
	/** @override */
	render() {
		const el = super.render();
		
		const span = document.createElement('span');
		span.textContent = this.text;
		
		el.appendChild(span);
		return el;
	}
}