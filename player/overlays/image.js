import { Overlay } from "./overlay.js";

export class Images extends Overlay {
	/**
	 * Путь к изображению
	 * @type {string}
	 */
	src;
	
	/**
	 * Альтернативный текст
	 * @type {string}
	 */
	alt = '';
	
	/** @override */
	constructor(params) {
		super(params);
		this.src = params?.src;
		
		if (typeof this.src !== 'string') {
			throw new ReferenceError('URL to the created image overlay is not specified')
		}
		
		this.alt = params?.alt ?? this.alt;
	}
	
	/** @override */
	render() {
		const el = super.render();
		
		el.innerHTML = `<img src="${this.src}" alt="${this.alt}">`
		
		return el;
	}
}