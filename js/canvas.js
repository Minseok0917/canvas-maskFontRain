export default class Canvas{
	constructor(width,height){
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvasWidth = width;
		this.canvasHeight = height;
		this.canvas.width = width;
		this.canvas.height = height;
	}

	canvasReset(){
		const { canvasWidth, canvasHeight } = this;
		this.context.clearRect(0,0,canvasWidth,canvasHeight);
	}

	drawText({x,y,text,fontSize,isStroke=false}){
		const { context } = this;
		context.beginPath();
		context.textAlign ='center';
		context.textBaseline = 'middle';
		context.lineWidth  = 3;
		context.font = `${fontSize}px serif`;
		if( isStroke ){
			context.strokeText(text,x,y);
		}else{
			context.fillText(text,x,y);
		}
	}
}