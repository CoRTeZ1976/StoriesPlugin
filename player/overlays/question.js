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
	
	/** @override
	 * @param {{
	 *     question: string,
	 *     variants?: string[],
	 *     alt?: string,
	 *     classes?: string[],
	 *     styles?: Object<string, string>
	 * }=} [params] - параметры наложения:
	 *
	 * 1. question - текст вопроса
	 * 2. [variants] - варианты ответа
	 */
	constructor(params) {
		super(params);
		this.question = params?.question;
		
		if (typeof this.question !== 'string') {
			throw new ReferenceError('A question text to the created overlay is not specified');
		}
		
		this.variants = params?.variants;
		
		if (this.variants.length === 0) {
			throw new Error('There is should be at least one variant of answering');
		}
	}
	
	/** @override */
	render() {
		const el = super.render();
		
		el.innerHTML = `
				<div class="question">
					${this.question}
					<div class="question-answer">
						${this.variants.map((label, i) => `<button value="${i}">${label}</button>`).join(' ')}
					</div>
				</div>`;
		
		el.querySelector('.question-answer').addEventListener('click', (e) => {
			if (e.target.tagName !== 'BUTTON') {
				return;
			}
			
			alert(e.target.value);
		});
		
		return el;
	}
}