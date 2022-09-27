function initPlayer(params) {
	const
		target = document.querySelector(params.target);
	
	if (target === null || params.slides === undefined) {
		return;
	}
	
	let
		timelineChunks = '',
		playerChunks = '',
		isFirst = true;
	
	for (const el of params.slides) {
		timelineChunks += `
			<div class="timeline-chunk ${isFirst ? 'timeline-chunk-active' : ''}">
				<div class="timeline-chunk-inner"></div>
			</div>`;
		
		playerChunks += `
			<div class="player-chunk ${isFirst ? 'player-chunk-active' : ''}">
				<img src="${el.url}" alt="${el.alt || ''}">
			</div>`;
		
		isFirst = false;
	}
	
	target.innerHTML = `
		<div class="player">
			<div class="timeline">${timelineChunks}</div>
			
			<div class="player-content-wrapper">
				<div class="player-chunk-switcher player-chunk-prev"></div>
				<div class="player-chunk-switcher player-chunk-next"></div>
				<div class="player-content">${playerChunks}</div>
			</div>
		</div>`;
	
	target.querySelector('.player-chunk-prev').addEventListener('click', () => {
		moveClass('player-chunk-active', 'previousElementSibling');
		
		const
			el = moveClass('timeline-chunk-active', 'previousElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	});
	
	target.querySelector('.player-chunk-next').addEventListener('click', next);
	
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
	
	function next() {
		moveClass('player-chunk-active', 'nextElementSibling');
		
		const
			el = moveClass('timeline-chunk-active', 'nextElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	}
	
	let
		timer;
	
	function runInterval(time, step) {
		clearInterval(timer);
		
		timer = setInterval(() => {
			const
				activeChunk = target.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
			
			let
				w = parseFloat(activeChunk.style.width) || 0;
			
			if (w === 100) {
				next();
				return;
			}
			
			activeChunk.style.width = String(w + step) + '%';
			
		}, time * 1000 * step / 100);
	}
	
	runInterval(params.delayPerChunk || 1, 1);
}