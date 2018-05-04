export default class PositionComponent {
    x: number;
    y: number;
    name: string = 'Position';

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }
}