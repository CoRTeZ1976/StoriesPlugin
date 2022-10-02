export default class ClassSwitcher {
	/**
	 * Корневой элемент
	 * @type {Element}
	 */
	root;
	
	/**
	 * Идентификатор таймера
	 * @type {number|undefined}
	 */
	timelineTimer;
	
	/**
	 * @param {Element} root - корневой элемент
	 */
	constructor(root) {
		this.root = root;
		
		if (!(this.root instanceof Element)) {
			throw new TypeError('The root element is not defined');
		}
	}
	
	/**
	 * Переключает класс active на активный слайд
	 * @param className: string - CSS класс
	 * @param method: string
	 * @returns {Element}
	 */
	moveClass(className, method) {
		
		const activeChunk = this.root.querySelector('.' + className),
			next = activeChunk[method];
		
		if (next) {
			activeChunk.classList.remove(className);
			next.classList.add(className);
			
			return activeChunk;
		}
		
		return null;
	}
	
	/**
	 * Переключает слайд назад
	 */
	switchToPrevChunk() {
		this.moveClass('player-chunk-active', 'previousElementSibling');
		
		const
			el = this.moveClass('timeline-chunk-active', 'previousElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	}
	
	/**
	 * Переключает слайд вперед
	 */
	switchToNextChunk() {
		this.moveClass('player-chunk-active', 'nextElementSibling');
		
		const
			el = this.moveClass('timeline-chunk-active', 'nextElementSibling');
		
		if (el) {
			el.querySelector('.timeline-chunk-inner').style.width = '';
		}
	}
	
	/**
	 * Запускает шкалу времени и переключение слайдов
	 * @param time: number - время показа слайда
	 * @param step: number - шаг
	 */
	runChunkSwitching(time, step) {
		clearInterval(this.timelineTimer);
		
		this.timelineTimer = setInterval(() => {
			const
				activeChunk = this.root.querySelector('.timeline-chunk-active').querySelector('.timeline-chunk-inner');
			
			let
				w = parseFloat(activeChunk.style.width) || 0;
			
			if (w === 100) {
				this.switchToNextChunk();
				return;
			}
			
			activeChunk.style.width = String(w + step) + '%';
			
		}, this * 1000 * step / 100);
	}
}