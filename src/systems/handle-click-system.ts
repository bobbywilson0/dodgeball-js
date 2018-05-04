class HandleClick {
    constructor(entities) {
        for (let id in entities) {
            const currentEntity = entities[id];

            if (currentEntity.entities.InteractiveComponent && 
                currentEntity.entities.InteractiveComponent.interactive) {
                    // 1. first or second click
                    // 2. if this is the first click, is there an interactive player on this tile
                    // 3. if this is the second click, is there a ball on the tile
                    // 4. if this is the second click, is this the same tile as the first click
                    // 5. if this is the second click, is this a tile the player
            }
        }
    }
}