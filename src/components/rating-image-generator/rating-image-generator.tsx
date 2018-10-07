import { Component, Element } from '@stencil/core';

@Component({
  tag: 'rating-image-generator'
})
export class RatingImageGenerator {
  @Element() el: HTMLElement;

  componentDidLoad() {
    const canvas = this.el.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    this.drawStar(ctx, 30, 30);
    this.drawStar(ctx, 84, 30);
    this.drawStar(ctx, 138, 30);
    this.drawStar(ctx, 192, 30);
    this.drawStar(ctx, 246, 30);

    ctx.font = "40px Courier"
     // ctx.fillText("Hallo", 210, 75)

  }

  drawStar(ctx, cx, cy) {
    const outerRadius = 25;
    const innerRadius = 10;
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / 5;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < 5; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=2;
    ctx.strokeStyle='#000000';
    ctx.stroke();
    ctx.fillStyle='#cccccc';
    ctx.fill();

}
  render() {
    return <div><canvas width={300} height={300}></canvas></div>;
  }
}
