import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'rating-image'
})
export class RatingImageGenerator {
  @Element() el: HTMLElement;

  @Prop() rating: number = 5;
  @Prop() scale: number = 5;
  @Prop() starSize: number = 40;
  @Prop() strokeWidth: number = 5;

  context;

  componentDidLoad() {
    this.context = this.el.querySelector("canvas").getContext("2d");
    // Must set font otherwise image won't draw
    this.context.font = "";


    for(let i = 0; i < this.scale; i++) {
      const xPosition = ( 2 * i + 1) * (this.starSize / 2 );
      const yPosition = this.starSize * 1.10 / 2;
      const fillPercentage = Math.min(1, this.rating - i);

      this.drawCompleteStar(xPosition, yPosition, fillPercentage);
    }

  }

  drawCompleteStar(cx, cy, fillPercentage = 100) {
    this.pathStar(cx, cy, 100);
    this.drawOuterLine();
    this.fillEmptyBackground();
    
    if (fillPercentage < 100) this.pathStar(cx, cy, fillPercentage);
    this.fillCompleted();
  }

  drawOuterLine(){
    this.context.lineWidth = this.strokeWidth;
    this.context.strokeStyle='#000000';
    this.context.stroke();
  }

  fillEmptyBackground() {
    const grd=this.context.createLinearGradient(0,0,0,this.starSize * 2);
    grd.addColorStop(0,"#f4f4f4");
    grd.addColorStop(1,"#cccccc");
    this.context.fillStyle=grd;
    this.context.fill();
  }

  fillCompleted() {
    const grd=this.context.createLinearGradient(0,0,0,this.starSize * 0.75);
    grd.addColorStop(0,"#f4ac41");
    grd.addColorStop(1,"#f4ee41");
    this.context.fillStyle=grd;
    this.context.fill();
  }

  pathStar(cx, cy, completePercentage = 100) {
    const starSize = this.starSize - (this.strokeWidth * 2);
    // 60 : 23 makes the right and left spike completly straight
    const outerRadius = starSize / 2.0;
    const innerRadius = starSize / 2.0 / 60.0 * 23.0;
    const maxFillX = cx - (starSize / 2.0) + (starSize * completePercentage);
    var rot = Math.PI / 2.0 * 3.0;
    var x = cx;
    var y = cy;
    var step = Math.PI / 5.0;

    this.context.beginPath();
    this.context.lineCap = "round";
    this.context.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < 5; i++) {
        x =  cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        this.context.lineTo(Math.min(maxFillX, x), y);
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        this.context.lineTo(Math.min(maxFillX, x), y);
        rot += step
    }
    this.context.lineTo(Math.min(maxFillX, cx), cy - outerRadius)
    this.context.closePath();
  } 
  
  render() {
    return <div><canvas width={this.starSize * this.scale} height={this.starSize}></canvas></div>;
  }
}
