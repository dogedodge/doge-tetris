import doge_png from '../assets/doge.png';
import * as doge from './doge';

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

graphic.x = 200;
graphic.y = 200;
graphic.anchorX = 50;

doge.carry(function () {
    // graphic.x = (graphic.x + 1) % 300;
    graphic.rotation += 1;
    // console.log(graphic.x);
});