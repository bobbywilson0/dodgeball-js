import { Graphics } from 'pixi.js';

export default class DrawTileSystem {
    constructor(entities) {
        for (let id in entities) {
            const entity = entities[id];

            if (entity.TileComponent && entity.Stage) {
                const tileComponent = entity.TileComponent;
                const tileGraphics = new Graphics();
                tileGraphics.beginFill(tileComponent.fillColor);
            
                tileGraphics.lineStyle(3, tileComponent.strokeColor);
        
                tileGraphics.drawRect(
                    tileComponent.x,
                    tileComponent.y,
                    tileComponent.tileSize,
                    tileComponent.tileSize,
                );
                entity.BoardComponent.stage.addChild(tileGraphics);
            }
        }
    }
}