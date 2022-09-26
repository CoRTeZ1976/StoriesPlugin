document.querySelector('.player-chunk-prev').addEventListener('click', function () {
	function moveClass(className, activeClassName) {
		let activeChunk = document.querySelector('.' + activeClassName),
		prev = activeChunk.previousElementSibling;
		if (prev && prev.classList.contains(className)) {
			activeChunk.classList.remove(activeClassName);
			activeChunk.previousElementSibling.classList.add(activeClassName);
		}
	}
	
	moveClass('timeline-chunk','timeline-chunk-active');
	moveClass('player-chunk','player-chunk-active');
});

document.querySelector('.player-chunk-next').addEventListener('click', function () {
	function moveClass(className, activeClassName) {
		let activeChunk = document.querySelector('.' + activeClassName),
			prev = activeChunk.nextElementSibling;
		if (prev && prev.classList.contains(className)) {
			activeChunk.classList.remove(activeClassName);
			activeChunk.nextElementSibling.classList.add(activeClassName);
		}
	}
	
	moveClass('timeline-chunk','timeline-chunk-active');
	moveClass('player-chunk','player-chunk-active');
});