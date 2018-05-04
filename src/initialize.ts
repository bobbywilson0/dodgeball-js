import Entity from './entity';

import SelectComponent from './components/select-component';
import BoardComponent from './components/board-component';
import HasBallComponent from './components/has-ball-component';
import PositionComponent from './components/position-component';
import SpriteComponent from './components/sprite-component';
import StageComponent from './components/stage-component';
import TileComponent from './components/tile-component';
import TileStyleComponent from './components/tile-style-component';

import DrawAthleteSystem from './systems/draw-athlete-system'
import DrawBallSystem from './systems/draw-ball-system'
import DrawTileSystem from './systems/draw-tile-system';

import { Container } from 'pixi.js';

const BoardHeight = 9;
const BoardWidth = 9;
const TileSize = 70;
const stage = new Container();

//const gameBoard: Entity = new Entity();
//gameBoard.addComponent(new BoardComponent(BoardHeight, BoardWidth))
//gameBoard.addComponent(new StageComponent(stage))

const TileFillColor: number = 0x999999;
const TileStrokeColor: number = 0x000000;
const TileLineWeight: number = 3;
const TileHighlightFillColor: number = 0x999999;
const TileHighlightStrokeColor: number = 0x999999;

function createTile(x, y) {
    const tile: Entity = new Entity();
    tile.addComponent(new TileComponent(TileSize, TileLineWeight))
    tile.addComponent(new PositionComponent(x, y))
    tile.addComponent(new InteractiveComponent(true))
    tile.addComponent(new TileStyleComponent(TileStrokeColor, TileFillColor))
    tile.addComponent(new SelectComponent(false))
    tile.addComponent(new HasBallComponent(false))
    tile.addComponent(new StageComponent(stage))
    return tile;
}

function createAthlete(x, y) {
    const athlete: Entity = new Entity();
    athlete.addComponent(new PositionComponent(x, y))
    athlete.addComponent(new InteractiveComponent(false))
    athlete.addComponent(new SelectComponent(false))    
    athlete.addComponent(new HasBallComponent(false))
    athlete.addComponent(new SpriteComponent('athlete.jpg'))
    return athlete;
}

function createBall(x, y) {
    const ball: Entity = new Entity();
    ball.addComponent(new PositionComponent(x, y))
    ball.addComponent(new SpriteComponent('ball.jpg'))
    return ball;
}

const systems = [
    DrawTileSystem,
    DrawBallSystem,
    DrawAthleteSystem,
]