class HighlightTileSystem {
    constructor(entities) {
        for (let id in entities) {
            const currentEntity = entities[id];

            if (currentEntity.components.HighlightTileComponent && 
                currentEntity.components.HighlightTileComponent.highlighted) {
                    // highlight the tile
            }
        }
    }
}