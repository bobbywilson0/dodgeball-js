import { TweenLite } from "gsap";
import { Container, DisplayObject, Graphics } from "pixi.js";
import Ball from "./ball";
import * as Config from "./config";
import { IBalls, IPlayers, IUnit } from "./dodgeball";
import GameState from "./game-state";
import Player from "./player";
import * as Utils from "./utils";

export default class GameBoard {
  private tokenContainer: Container;
  private highlightContainer: Container;
  private stage: Container;
  private gameState: GameState;
  private players: any;
  private balls: any;
  private actionCount: number;
  private eventData: undefined | any;
  private selectedPlayer: undefined | any;
  private targetHighlight: Graphics;
  private sourceHighlight: Graphics;
  private selected: any;

  constructor(stage: Container, gameState: GameState, players: IPlayers, balls: IBalls) {
    this.tokenContainer = new PIXI.Container();
    this.highlightContainer = new PIXI.Container();
    this.stage = stage;
    this.players = players;
    this.balls = balls;
    this.gameState = gameState;
    this.actionCount = 0;

    this.drawBoard(Config.BOARD_WIDTH, Config.BOARD_HEIGHT, Config.TILE_SIZE);
    stage.addChild(this.highlightContainer);
    stage.addChild(this.tokenContainer);

    this.eventData = undefined;
    this.selectedPlayer = undefined;

    stage.on("click", this.handleClickEvent);
    stage.on("touchend", this.handleClickEvent);
    stage.on("mousemove", this.handleMouseMove);
  }

  public handleClickEvent(event) {
    if (this.actionCount > 1) {
      this.actionCount = 0;
      this.selectedPlayer = undefined;
      this.eventData = undefined;
      this.switchTurns();
    }

    this.highlightContainer.removeChild(this.targetHighlight);
    const position = event.data.getLocalPosition(this.stage);
    let player: undefined | any = this.gameState.getPlayer(position.x, position.y);
    if (!this.selectedPlayer && player && player.team === this.gameState.state.turn) {
      this.selectPlayer(position.x, position.y);
    } else if (this.selectedPlayer) {
      const tilePosition = Utils.pixelToTilePosition(position.x, position.y);
      if (player && player !== this.selectedPlayer) {
        if (player.team === this.gameState.state.turn) {
          console.log("can't move on top of another player");
        } else if (this.selectedPlayer.hasBall) {
          this.actionCount += 1;
          const pPlayer = this.players[player.id];
          const outcome = this.selectedPlayerObject().throwBallAt(pPlayer);
          const ball = outcome.ball!;
          const unit = this.gameState.state.units[ball.id];
          unit.x = player.x;
          unit.y = player.y;
          this.tokenContainer.addChild(ball.sprite);
          if (outcome.hit) {
            player = this.gameState.state.units[pPlayer.id];
            player.out = true;
            player.x = pPlayer.x;
            player.y = pPlayer.y;
          }
        }
      } else if (tilePosition.x === this.selectedPlayer.x && tilePosition.y === this.selectedPlayer.y) {
        this.pickupBall(position.x, position.y);
      } else {
        this.movePlayer(tilePosition.x, tilePosition.y);
      }
      this.selectedPlayer = undefined;
      this.highlightContainer.removeChild(this.sourceHighlight);
    }
  }

  public selectPlayer(x, y): void {
    this.selectedPlayer = this.gameState.getPlayer(x, y);
    this.sourceHighlight = this.highlightSourceTile(x, y);
    this.highlightContainer.addChild(this.sourceHighlight);
  }

  public movePlayer(x, y): void {
    this.actionCount += 1;
    this.gameState.moveUnit(this.selectedPlayer, x, y);
    if (this.selectedPlayer.hasBall) {
      const ball = this.gameState.getBall(x, y);
      this.gameState.moveUnit(ball as IUnit, x, y);
    }
    const player = this.players[this.selectedPlayer.id];
    player.moveTo(x, y);
  }

  public pickupBall(x, y): void {
    this.actionCount += 1;
    const ball: undefined | Ball = this.gameState.getBall(x, y);
    if (ball !== undefined) {
      const currentBall: Ball = this.balls[ball.id];

      this.tokenContainer.removeChild(currentBall.sprite);
      const player = this.players[this.selectedPlayer.id];
      player.pickupBall(currentBall);
      this.selectedPlayer.hasBall = true;
    }
  }

  public handleMouseMove(): void {
    if (this.selectedPlayer) {
      const newPosition = this.eventData.getLocalPosition(this.stage);
      if (this.targetHighlight) {
        this.highlightContainer.removeChild(this.targetHighlight);
      }
      this.targetHighlight = this.highlightTargetTile(newPosition.x, newPosition.y);
      this.highlightContainer.addChild(this.targetHighlight);
    }
  }

  public switchTurns(): void {
    if (this.gameState.state.turn === "red") {
      this.gameState.state.turn = "blue";
    } else {
      this.gameState.state.turn = "red";
    }
  }

  public selectedPlayerObject(): Player {
    return this.players[this.selectedPlayer.id];
  }

  public highlightTargetTile(x, y): Graphics {
    const highlightGraphic = new PIXI.Graphics();
    highlightGraphic.beginFill(0xCCCCCC);
    highlightGraphic.lineStyle(3, 0x000000, 0);
    const tilePosition = Utils.pixelToTilePosition(x, y);
    highlightGraphic.drawRect(
      tilePosition.x * Config.TILE_SIZE + 1,
      tilePosition.y * Config.TILE_SIZE + 1,
      Config.TILE_SIZE - 2,
      Config.TILE_SIZE - 2,
    );
    return highlightGraphic;
  }

  public highlightSourceTile(x, y): Graphics {
    const highlightGraphic = new PIXI.Graphics();
    highlightGraphic.beginFill(0x999999);
    highlightGraphic.lineStyle(3, 0x000000, 0);
    const tilePosition = Utils.pixelToTilePosition(x, y);
    highlightGraphic.drawRect(
      tilePosition.x * Config.TILE_SIZE + 1,
      tilePosition.y * Config.TILE_SIZE + 1,
      Config.TILE_SIZE - 2,
      Config.TILE_SIZE - 2,
    );
    return highlightGraphic;
  }

  public drawBoard(height, width, tileSize): void {
    const boardGraphics = new PIXI.Graphics();
    boardGraphics.beginFill(0xFFFFFF);

    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        if (i <= 1) {
          boardGraphics.lineStyle(3, 0xccccff);
        } else if (i >= 5) {
          boardGraphics.lineStyle(3, 0xffcccc);
        } else {
          boardGraphics.lineStyle(3, 0xcccccc);
        }

        boardGraphics.drawRect(
          i * tileSize,
          j * tileSize,
          tileSize,
          tileSize,
        );
      }
    }
    this.stage.addChild(boardGraphics);
  }

  public addToken(player): void {
    this.tokenContainer.addChild(player);
  }
}
