export default class TileStyleComponent {
    stroke: number;
    fill: number;
    name: 'TileStyleComponent';

    constructor(stroke: number, fill: number) {
        this.stroke = stroke;
        this.fill = fill;
        return this;
    }
}