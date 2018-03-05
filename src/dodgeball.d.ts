import Ball from "./ball";
import Player from "./player";

export interface IUnit {
    x: number;
    y: number;
}

export interface IPlayers {
    id?: Player;
}

export interface IBalls {
    id?: Ball;
}

export interface IOutcome {
    ball: undefined | Ball;
    hit: undefined | boolean;
}
