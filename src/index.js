import doge_png from '../assets/doge.png';
import * as doge from './doge';
// import { create } from './doge/create';
// import { Stage } from './doge/Stage';

console.log('welcome! hello');
var gameStage = document.querySelector('#gameStage');
// var stageCtx = gameStage.getContext('2d');
// stageCtx.rect(0, 0, 100, 100);
// stageCtx.stroke();
// var image = new Image();
// image.onload = function () {
//     stageCtx.drawImage(image, 0, 0);
// }
// image.src = doge_png;

var stage = doge.Stage(gameStage); //doge.createObj(doge.Stage);
// doge.createObj(doge.Drawable).draw(stageCtx);
var graphic = doge.Graphic(function(ctx){
    ctx.rect(100, 100, 100, 100);
    ctx.stroke();
});

graphic.x = 100;

stage.add(graphic);
stage.draw();