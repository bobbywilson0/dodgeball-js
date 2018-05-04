class MovePlayerSystem {
    constructor(entities) {
        for (let id in entities) {
            const currentEntity = entities[id];
            const movePlayerComponent = currentEntity.components.MovePlayerComponent;
            if (movePlayerComponent) {
                this.movePlayer(
                    movePlayerComponent.moveFromX,
                    movePlayerComponent.moveFromY,
                    movePlayerComponent.moveToX,
                    movePlayerComponent.moveToY
                );
            }
        }
    }

    movePlayer(fromX, FromY, toX, toY) {

    }
}