import { Overlay } from './overlays/overlay.js';
import * as overlays from './overlays/index.js'

/**
 * @typedef {{url: string, alt?: string, overlays?: Overlay[]}>
 */
const Slide = null;

/**
 * @typedef {Slide[]}
 */
const Slides = null;

export class Player {
	/**
	 * Контейнер для плеера
	 * @type {Element}
	 */
	target;
	
	/**
	 * Список слайдов плеера
	 * @type {Slides}
	 */
	slides;
	
	/**
	 * Как долго показывается слайд
	 * @type {number}
	 */
	delayPerChunk = 1;
	
	/**
	 * Создает объект плеер.
	 *
	 * @param {{
	 * 		target: string,
	 * 		slides: Slides,
	 * 		delayPerChunk?: number
	 * 	}} params - параметры инициализации:
	 *
	 * 	1. target - место инициализации плеера, CSS селектор;
	 * 	2. slides - список слайдо плеера;
	 * 	3. delayPerChunk - как долго показывается один слайд.
	 *
	 * @return {Element|null}
	 */
	
	constructor(params) {
		this.target = document.querySelector(params.target);
		
		if (this.target == null) {
			throw new ReferenceError('A target to mount the player is not specified');
		}
		
		this.slides = params.slides;
		
		if (!Array.isArray(this.slides)) {
			throw new TypeError('Slides to render is not specified');
		}
		
		this.delayPerChunk = params?.delayPerChunk ?? this.delayPerChunk;
	}
	
	generatePlayerLayout() {
		return `
			<div class="player">
				<div class="timeline">${timelineChunks}</div>
				
				<div class="player-content-wrapper">
					<div class="player-chunk-switcher player-chunk-prev"></div>
					<div class="player-chunk-switcher player-chunk-next"></div>
					<div class="player-content">${playerChunks}</div>
				</div>
			</div>`;
	}
	
	generateTimelineChunks() {
		const
			wrapper = document.createDocumentFragment();
		
		for (const i of this.slides.keys()) {
			const
				el = document.createElement('div');
			
			el.innerHTML = `
				<div class="timeline-chunk ${i === 0 ? 'timeline-chunk-active' : ''}">
					<div class="timeline-chunk-inner"></div>
				</div>`;
			
			wrapper.appendChild(el.children[0]);
		}
		
		return wrapper;
	}
	
	generatePlayerChunk() {
		const
			wrapper = document.createDocumentFragment();
		
		for (const [i, slide] of this.slides.entries()) {
			const
				style = [];
			
			if (slide.filter) {
				style.push(`filter: ${slide.filter.join(' ')}`);
			}
			
			const el = document.createElement('div');
			
			el.innerHTML = `
			<div class="player-chunk ${i === 0 ? 'player-chunk-active' : ''}">
				<img src="${slide.url}" alt="${slide.alt ?? ''}" style="${style.join(';')}">
			</div>`;
			
			wrapper.appendChild(el);
		}
		
		return wrapper;
	}
	
	/**
	 *
	 * @param {Slide} slide
	 * @returns {Node}
	 */
	generateOverlays(slide) {
		const wrapper = document.createDocumentFragment();
		
		if (slide.overlays == null) {
			return wrapper;
		}
		
		for (const params of slide.overlays) {
			if (!(params.type in overlays)) {
				throw new TypeError(`The specified type of overlay (${params.type}) is not defined`);
			}
			
			const overlay = new overlays[params.type](params);
			wrapper.appendChild(overlay.render());
		}
		
		return wrapper;
	}
}