import { Graphics, Sprite, Texture } from 'pixi.js';
import Entity from '../entity';
import AthleteComponent from '../components/athlete-component';
import PositionComponent from '../components/position-component';

interface IAthleteEntity {
    AthleteComponent: AthleteComponent;
    PositionComponent: PositionComponent;
    InteractiveComponent: InteractiveComponent;
}

export default class DrawAthleteSystem {
    team: string;
    x: number;
    y: number;
    sprite: Sprite;
    number: string;

    constructor(entities) {
        for (let id in entities) {
            const entity: Entity = entities[id];

            if (entity.AthleteComponent) {
                const athleteEntity: IAthleteEntity = entity as IAthleteEntity;
                this.x = athleteEntity.PositionComponent.x;
                this.y = athleteEntity.PositionComponent.y;
                this.team = athleteEntity.AthleteComponent.team;
                this.number = athleteEntity.AthleteComponent.number;
                this.sprite = this.drawAthlete(athleteEntity);
            }
        }
    }

    private drawAthlete(entity: IAthleteEntity): Sprite {
        const redCircle = this.rectangleTexture(0xFF0000);
        const blueCircle = this.rectangleTexture(0x0000FF);

        let graphic: Texture;

        if (this.team === "blue") {
            graphic = blueCircle;
        } else if (this.team === "red") {
            graphic = redCircle;
        } else {
            throw("No team given.");
        }

        const sprite: Sprite = new Sprite(graphic);
        const head: Sprite = new Sprite(this.headTexture());
        head.anchor.set(0.5, 1.2);
        sprite.anchor.set(0.5);
        sprite.x = entity.PositionComponent.x;
        sprite.y = entity.PositionComponent.y;
        sprite.interactive = entity.InteractiveComponent.interactive;
        sprite.buttonMode = entity.InteractiveComponent.interactive;
        sprite.addChild(head);
    
        const textStyle = new PIXI.TextStyle({
          fill: "#ffffff",
          fontSize: 13,
        });
        const idText = new PIXI.Text(this.number, textStyle);
        idText.y = -7;
        idText.x = -3;
        sprite.addChild(idText);
    
        return sprite;
    }

    private rectangleTexture(hexColor): Texture {
        const graphic = new PIXI.Graphics();
        graphic.beginFill(hexColor);
        return graphic
          .drawRect(0, 0, 20, 50)
          .generateCanvasTexture();
      }
    
    private headTexture(): Texture {
        const skinTones = [0x8d5524, 0xc68642, 0xe0ac69, 0xf1c27d, 0xffdbac];
        const graphic: Graphics = new Graphics();
        const randomSkinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
        graphic.beginFill(randomSkinTone);
        return graphic
            .drawCircle(0, 0, 18)
            .generateCanvasTexture();
    }
}