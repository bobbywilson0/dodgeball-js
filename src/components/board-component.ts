import { Container } from 'pixi.js'
export default class BoardComponent {
    width: number;
    height: number;
    name: string = 'Board';

    constructor(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }
}