import doge_png from '../assets/doge.png';
import * as doge from './doge';
import { DrawableImage } from './doge';

var gameCanvas = document.querySelector('#gameStage');
// var stageCtx = gameStage.getContext('2d');
// stageCtx.rect(0, 0, 100, 100);
// stageCtx.stroke();
// var image = new Image();
// image.onload = function () {
//     stageCtx.drawImage(image, 0, 0);
// }
// image.src = doge_png;

// var stage = doge.Stage(gameStage); //doge.createObj(doge.Stage);
// doge.createObj(doge.Drawable).draw(stageCtx);
var graphic = doge.Graphic(function (ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, 100, 100);
    ctx.stroke();
});

var stage = doge.run(gameCanvas);
stage.add(graphic);
stage.add(doge.Graphic(function(ctx){
    ctx.beginPath();
    ctx.rect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.stroke();
}));

graphic.x = 200;
graphic.y = 200;
graphic.anchorX = 50;
graphic.anchorY = 50;
graphic.scale(2);

var img = DrawableImage(doge_png);
console.log(img.width);
img.scale(2);
img.x = 200;
img.y = 300;
// console.log(img);
stage.add(img);

doge.carry(function () {
    // graphic.x = (graphic.x + 1) % 300;
    graphic.rotation += 1;
    img.rotation += 1;
    console.log(img);
    // console.log(graphic.x);
});
