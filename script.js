document.querySelector('.player-content').addEventListener('click', e => {
	let
		targetElement = e.target.classList[1],
		activeChunks = document.querySelectorAll('.active'),
		nextActiveChunk;
	
	if (targetElement === 'player-chunk-prev') {
		nextActiveChunk = [activeChunks[0].previousElementSibling, activeChunks[1].previousElementSibling];
	} else if (targetElement === 'player-chunk-next') {
		nextActiveChunk = [activeChunks[0].nextElementSibling, activeChunks[1].nextElementSibling];
	}
	
	if (nextActiveChunk[0] && nextActiveChunk[1]) {
		activeChunks[0].classList.remove('active');
		activeChunks[1].classList.remove('active');
		nextActiveChunk[0].classList.add('active');
		nextActiveChunk[1].classList.add('active');
	}
});

