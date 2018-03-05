import { Graphics, Sprite, Texture } from "pixi.js";
import * as Config from "./config";
import * as Utils from "./utils";

export default class Ball {
  public id: string;
  public sprite: Sprite;
  public graphic: Graphics;
  public x: number;
  public y: number;

  constructor(x: number, y: number, id: string) {
    id = id;
    x = x;
    y = y;

    const greenCircle = this.circleTexture(0x00FF00);
    let graphic;

    graphic = greenCircle;

    const sprite = new PIXI.Sprite(graphic);
    sprite.anchor.set(0.5);
    const position = Utils.tileToPixelPosition(x, y);
    sprite.x = position.x;
    sprite.y = position.y;
    sprite.interactive = true;

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

  public circleTexture(hexColor: number): Texture {
    const graphic: Graphics = new PIXI.Graphics();
    graphic.beginFill(hexColor);
    return graphic
      .drawCircle(0, 0, (Config.TILE_SIZE / 4) - 5)
      .generateCanvasTexture();
  }
}
