import { Texture } from "pixi.js";


export default class SpriteComponent {
    texture: Texture;
    name: 'Sprite';

    constructor(filename: string) {
        const texture = Texture.fromImage(filename);
        this.texture = texture;
        return this;
    }
}