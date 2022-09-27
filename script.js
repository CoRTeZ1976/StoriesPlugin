function initPlayer() {
	
}

document.querySelector('.player-chunk-prev').addEventListener('click', () => {
	moveClass('player-chunk-active', 'previousElementSibling');
	
	const
		el = moveClass('timeline-chunk-active', 'previousElementSibling');
	
	if (el) {
		el.querySelector('.timeline-chunk-inner').style.width = '';
	}
});

document.querySelector('.player-chunk-next').addEventListener('click', next);

function moveClass(className, method) {
	
	const activeChunk = document.querySelector('.' + className),
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

function runInterval(time, step) {
	setInterval(() => {
		const
			activeChunk = document.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
		
		let
			w = parseFloat(activeChunk.style.width) || 0;
		
		if (w === 100) {
			next();
			return;
		}
		
		activeChunk.style.width = String(w + step) + '%';
		
	}, time * 1000 * step / 100);
}

runInterval(5, 1);