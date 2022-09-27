initPlayer({
	target: '.my-player',
	
	slides: [
		{
			url: 'img/chunk1.jpg',
			alt: 'slide1',
			overlays: [
				{
					type: 'text',
					value: 'Hello',
					
					styles: {
						color: 'orange',
						'font-size': '60px',
						'text-shadow': '1px 1px #000',
						
						top: '10%',
						left: '30%',
						
						transform: 'rotate(-30deg)',
						
						animation: 'scale 2s infinite ease-in-out'
					}
				},
				
				{
					type: 'text',
					value: 'palms!',
					
					styles: {
						color: 'orange',
						'font-size': '50px',
						'text-shadow': '1px 1px #000',
						
						top: '60%',
						right: '30%',
						
						transform: 'rotate(90deg)',
						
						animation: 'scale 6s infinite ease-in-out',
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
	
	delayPerChunk: 5,
});