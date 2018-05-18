import doge_png from '../assets/doge.png';
import * as doge from './doge';
import { DrawableImage, tween } from './doge';

var stage = doge.run('#stage');
var graphic = doge.Graphic(function (ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, 100, 100);
    ctx.stroke();
});

stage.add(graphic);
stage.add(doge.Graphic(function (ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, stage.width, stage.height);
    ctx.stroke();
}));

graphic.x = 200;
graphic.y = 200;
graphic.anchorX = 50;
graphic.anchorY = 50;
graphic.scale(2);

var img = DrawableImage(doge_png);
console.log(img.width);
// img.scale(2);
img.x = 200;
img.y = 300;
// console.log(img);
stage.add(img);

stage.add(DrawableImage(doge_png));

doge.carry(function () {
    graphic.rotation += 1;
    // img.rotation += 1;
});

tween(img).to({ x: 400, y: 600, rotation: 90, scaleX: 2 }, 3000).then(drawable => { stage.remove(drawable) });