import { Overlay } from "./overlay.js";

export class Question extends Overlay {
	/**
	 * Текст опроса
	 * @type {string}
	 */
	question;
	
	/**
	 * Варианты ответа
	 * @type {string[]}
	 */
	variants = ['Yes', 'No'];
	
	/** @override */
	constructor(params) {
		super(params);
		this.question = params?.question;
		
		if (typeof this.src !== 'string') {
			throw new ReferenceError('A question text to the created overlay is not specified')
		}
		
		this.variants = params?.variants;
		
		if (this.variants.length === 0) {
			throw new Error('There is should be at least one variant of answering')
		}
	}
	
	/** @override */
	render() {
		const el = super.render();
		
		el.innerHTML = `
				<div class="question">
					${this.question}
					<div class="question question-answer">
						${this.variants.map((label, i) => `<button value="${i}">${label}</button>`).join(' ')}
					</div>
				</div>`;
		
		return el;
	}
}