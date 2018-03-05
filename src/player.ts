import {Back, Power4, TweenLite} from "gsap";
import { Sprite } from "pixi.js";
import * as Ball from "./ball";
import * as Config from "./config";
import * as Utils from "./utils";

export default class Player {
  public x: number;
  public y: number;
  public id: string;
  public ball: undefined | any;
  public sprite: Sprite;
  public team: string;

  constructor(x, y, id, team, interactive) {
    const redCircle = this.rectangleTexture(0xFF0000);
    const blueCircle = this.rectangleTexture(0x0000FF);
    let graphic;

    this.x = x;
    this.y = y;
    this.id = id;
    this.ball = undefined;
    this.team = team;

    if (team === "blue") {
      graphic = blueCircle;
    } else if (team === "red") {
      graphic = redCircle;
    }

    const sprite = new PIXI.Sprite(graphic);
    const head = new PIXI.Sprite(this.headTexture());
    head.anchor.set(0.5, 1.2);
    sprite.anchor.set(0.5);
    const position = Utils.tileToPixelPosition(x, y);
    sprite.x = position.x;
    sprite.y = position.y;
    sprite.interactive = interactive;
    sprite.buttonMode = interactive;
    sprite.addChild(head);

    const textStyle = new PIXI.TextStyle({
      fill: "#ffffff",
      fontSize: 13,
    });
    const idText = new PIXI.Text(id, textStyle);
    idText.y = -7;
    idText.x = -3;
    sprite.addChild(idText);

    this.sprite = sprite;
  }

  public rectangleTexture(hexColor) {
    const graphic = new PIXI.Graphics();
    graphic.beginFill(hexColor);
    return graphic
      .drawRect(0, 0, 20, 50)
      .generateCanvasTexture();
  }

  public headTexture() {
    const skinTones = [0x8d5524, 0xc68642, 0xe0ac69, 0xf1c27d, 0xffdbac];
    const graphic = new PIXI.Graphics();
    const randomSkinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
    graphic.beginFill(randomSkinTone);
    return graphic
      .drawCircle(0, 0, 18)
      .generateCanvasTexture();
  }

  public moveTo(x, y) {
    this.x = x;
    this.y = y;
    const pixelPosition = Utils.tileToPixelPosition(x, y);
    TweenLite.to(this.sprite, 0.5, {x: pixelPosition.x, y: pixelPosition.y, ease: Back.easeOut.config(1.7)});
  }

  public pickupBall(ball) {
    ball.sprite.x = -10;
    ball.sprite.y = 0;
    this.ball = ball;
    this.sprite.addChild(ball.sprite);
  }

  public throwBallAt(player) {
    const ball = this.ball;
    console.log(player);
    const pixelPosition = Utils.tileToPixelPosition(player.x, player.y);
    TweenLite.fromTo(
      ball.sprite,
      0.5,
      { x: this.sprite.x, y: this.sprite.y },
      { x: pixelPosition.x, y: pixelPosition.y, ease: Power4.easeOut },
    );
    this.ball = undefined;
    this.sprite.removeChild(ball.sprite);
    const r = Math.floor(Math.random() * 2);
    const outcome: {ball: any, hit: undefined | boolean } = {ball, hit: undefined};
    if ( r === 1) {
      player.x = -1;
      player.y = -1;
      TweenLite.to(player.sprite, 0.5, { x: 0, y: -200 });
      outcome.hit = true;
    } else {
      outcome.hit = false;
    }
    return outcome;
  }
}
