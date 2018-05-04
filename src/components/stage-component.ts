import { Container } from "pixi.js";

export default class StageComponent {
    stage: Container;

    constructor(stage) {
        this.stage = stage;
    }
}