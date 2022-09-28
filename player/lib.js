/**
 * Инициализирует плеер Stories по заданным параметрам.
 *
 * @param {{
 * 		target: string,
 * 		slides: Array<{url: string, alt?: string}>,
 * 		delayPerChunk?: number
 * 	}} params - параметры инициализации:
 * 	1. target - место инициализации плеера, CSS селектор;
 * 	2. slides - список слайдо плеера;
 * 	3. delayPerChunk - как долго показывается один слайд.
 *
 * @return {Element|null}
 */

function initPlayer(params) {
	const
		target = document.querySelector(params.target);
	
	if (target === null || params.slides === undefined) {
		return null;
	}
	
	let
		timelineChunks = '',
		playerChunks = '',
		isFirst = true,
		timelineTimer;
	
	for (const slide of params.slides) {
		timelineChunks += generateTimelineChunk(isFirst);
		playerChunks += generatePlayerChunk(slide, isFirst);
		isFirst = false;
	}
	
	target.innerHTML = generatePlayerLayout();
	
	target.querySelector('.player-chunk-prev').addEventListener('click', switchToPrevChunk);
	target.querySelector('.player-chunk-next').addEventListener('click', switchToNextChunk);
	
	runChunkSwitching(params.delayPerChunk || 1, 1);
	
	return target.querySelector('.player');
	
	function generateTimelineChunk(isFirst) {
		return `
			<div class="timeline-chunk ${isFirst ? 'timeline-chunk-active' : ''}">
				<div class="timeline-chunk-inner"></div>
			</div>`;
	}
	
	function generatePlayerChunk(slide, isFirst) {
		const
			style = [];
		
		if (slide.filter) {
			style.push(`filter: ${slide.filter.join(' ')}`);
		}
		
		return `
			<div class="player-chunk ${isFirst ? 'player-chunk-active' : ''}">
				<img src="${slide.url}" alt="${slide.alt || ''}" style="${style.join(';')}">
				${generateOverlays(slide)}
			</div>`;
	}
	
	function generateOverlays(slide) {
		if (slide.overlays === undefined) {
			return '';
		}
		
		let
			res = '';
		
		for (const el of slide.overlays) {
			const
				classes = el.classes !== undefined ? el.classes.join(' ') : '';
			
			const
				styles = (el.styles !== undefined ? Object.entries(el.styles) : [])
				.map((el) => el.join(': '))
				.join('; ');
			
			res += `<div class="player-chunk-overlay ${classes}" style="${styles}">${renderOverlay(el)}</div>`;
		}
		
		return res;
		
		function renderOverlay(overlay) {
			if (overlay.type === 'text') {
				return overlay.value;
			}
			
			if (overlay.type === 'question') {
				return `
				<div class="question">
					${overlay.question}
					<div class="question question-answer">
						<button value="1">${overlay.variants[0] || 'Yes'}</button>
						<button value="2">${overlay.variants[1] || 'No'}</button>
					</div>
				</div>`;
			}
			
			if (overlay.type === 'img') {
				return `<img src="${overlay.value}" alt="">`;
			}
			
			return '';
		}
	}
	
	function generatePlayerLayout() {
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
	
	function moveClass(className, method) {
		
		const activeChunk = target.querySelector('.' + className),
			next = activeChunk[method];
		
		if (next) {
			activeChunk.classList.remove(className);
			next.classList.add(className);
			
			return activeChunk;
		}
		
		return null;
	}
	
	function switchToPrevChunk() {
		moveClass('player-chunk-active', 'previousElementSibling');
		
		const
			el = moveClass('timeline-chunk-active', 'previousElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	}
	
	function switchToNextChunk() {
		moveClass('player-chunk-active', 'nextElementSibling');
		
		const
			el = moveClass('timeline-chunk-active', 'nextElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	}
	
	function runChunkSwitching(time, step) {
		clearInterval(timelineTimer);
		
		timelineTimer = setInterval(() => {
			const
				activeChunk = target.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
			
			let
				w = parseFloat(activeChunk.style.width) || 0;
			
			if (w === 100) {
				switchToNextChunk();
				return;
			}
			
			activeChunk.style.width = String(w + step) + '%';
			
		}, time * 1000 * step / 100);
	}
}