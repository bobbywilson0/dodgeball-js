class MovePlayerComponent {
    moveFromX: number;
    moveFromY: number;
    moveToX: number;
    moveToY: number;

    constructor(moveFromX: number, moveFromY: number, moveToX: number, moveToY: number) {
        this.moveFromX = moveFromX;
        this.moveFromY = moveFromY;
        this.moveToX = moveToX;
        this.moveToY = moveToY;
    }
}