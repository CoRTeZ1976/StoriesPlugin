import Lib from "./player/lib.js";

new Lib({
	target: '.player',
	
	delayPerChunk: 5,
	
	slides: [
		{
			url: 'img/chunk1.jpg',
			alt: 'slide1',
			
			filter: ['contrast(200%)', 'blur(5px)'],
			
			overlays: [
				{
					type: 'Text',
					text: 'Great weather!',
					
					classes: ['watercolor'],
					
					styles: {
						'font-size': '30px',
						'text-shadow': '1px 1px #000',
						
						top: '30%',
						left: '20%',
					}
				},
				{
					type: 'Question',
					question: 'Are you agree?',
					
					variants: [
						'Yes',
						'No',
					],
					
					styles: {
						top: '45%',
						left: '30%',
					}
				},
			],
		},
		
		{url: 'img/chunk2.jpg', alt: 'slide2'},
		{url: 'img/chunk3.jpg', alt: 'slide3'},
		{url: 'img/chunk4.jpg', alt: 'slide4'},
		{url: 'img/chunk5.jpg', alt: 'slide5'},
		{url: 'img/chunk6.jpg', alt: 'slide6'},
	],
});