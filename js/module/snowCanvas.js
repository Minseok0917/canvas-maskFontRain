import Canvas from '../class/canvas.js';
import Text from '../class/text.js';
import { random } from '../utils.js';


export default class MaskFontRain extends Canvas{
	constructor({width,height,maskElement,textList}){
		super(width, height);
		this.maskElement = maskElement;
		this.textList = textList;
		this.textListLength = textList.length-1;
		this.addTextState = {
			timer:500,
			min:5,
			max:20
		}
		this.textArray = []; // Text 객체 배열 
		this.isAnimated = true;

		this.init();
	}

	init(){
		this.addText();
		this.animated();
	}

	addText(){
		const { addTextState : { min , max }, canvasWidth , textList , textListLength }  = this;
		const textCount = random(min,max);
		for(let index=0; index<textCount; index++){
			const fontSize = random(8,50);
			const textOptions = { 
				x: random(fontSize,canvasWidth-fontSize),
				y: random(-20,-30),
				speed: random(5,12),
				text: textList[random(0,textListLength)],
				isStroke:random(0,10) % 2 === 0 ? true : false,
				fontSize
			};
			this.textArray = [...this.textArray, new Text(textOptions) ]
		}
		setTimeout(()=> requestAnimationFrame(this.addText.bind(this)), this.addTextState.timer);
	}

	animated(){
		this.canvasReset();
		for(let text of this.textArray){
			const { posY } = text;
			if( this.canvasHeight <= posY ){
				this.textArray = this.textArray.filter( ftext => ftext != text );
			}
			text.updateY();
			this.drawText({...text,...{ y:posY }});
		}

		this.png();
		requestAnimationFrame(this.animated.bind(this));
	}

	png(){
		const { canvas , maskElement } = this;
		const image = canvas.toDataURL('image/png');
		maskElement.style.webkitMask = `url(${image}) no-repeat center center`;
	}
}