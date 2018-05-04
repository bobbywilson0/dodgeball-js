export default class TileComponent {
    size: number;
    fillColor: number;
    strokeColor: number;
    lineWeight: number;
    highlighted: boolean;
    
    name: string = 'Tile';

    constructor(size, lineWeight) {
        this.size = size;
        this.lineWeight = lineWeight;
        this.highlighted = false;
        return this;
    }
}