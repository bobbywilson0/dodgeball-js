var PIXI = require('pixi.js');
const TILE_SIZE = 70;
const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;
var renderer = PIXI.autoDetectRenderer(
    BOARD_WIDTH * TILE_SIZE,
    BOARD_HEIGHT * TILE_SIZE,
    { antialias: true }
);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.interactive = true;

var boardGraphics = new PIXI.Graphics();
function drawBoard() {
  boardGraphics.beginFill(0xFFFFFF);
  boardGraphics.lineStyle(2, 0xFF0000);

  for (var i = 0; i < BOARD_WIDTH; ++i) {
    for (var j = 0; j < BOARD_HEIGHT; ++j) {
      boardGraphics.drawRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
  stage.addChild(boardGraphics);
}


function drawToken(x, y) {
  var graphics = new PIXI.Graphics();
  graphics.interactive = true;
  graphics.beginFill(0x000000);
  position = tileToPixelPosition(x, y);
  graphics.drawCircle(position[0], position[1], (TILE_SIZE / 2) - 5);

  stage.addChild(graphics);
  var highlight;

  graphics
    .on('mousedown', function(event) {
      this.data = event.data;
      this.dragging = true;
    })
    .on('mouseupoutside', function() {

    })
    .on('mouseup', function() {
      var newPosition = this.data.getLocalPosition(this.parent);
      ptt = pixelToTilePosition(newPosition.x, newPosition.y)
      ttp = tileToPixelPosition(ptt[0], ptt[1])
      stage.removeChild(highlight);

      this.position.x = ttp[0] - (TILE_SIZE * 1.5);
      this.position.y = ttp[1] - (TILE_SIZE * 1.5);
      this.dragging = false;
      this.data = null;
    })
   .on('mousemove', function() {
      if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        offsetXPosition = newPosition.x - (TILE_SIZE * 1.5)
        offsetYPosition = newPosition.y - (TILE_SIZE * 1.5)
        this.position.x = offsetXPosition;
        this.position.y = offsetYPosition;

        stage.removeChild(highlight);
        highlight = highlightTile(newPosition.x, newPosition.y);
        stage.addChild(highlight);
        stage.addChild(graphics);
      }
    })
}

function highlightTile(x, y) {
  var highlightGraphic = new PIXI.Graphics();
  highlightGraphic.beginFill(0xCCCCCC);
  highlightGraphic.lineStyle(2, 0xFF0000);
  tilePosition = pixelToTilePosition(x, y);
  highlightGraphic.drawRect(
    tilePosition[0] * TILE_SIZE,
    tilePosition[1] * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
  return highlightGraphic;
}

function tileToPixelPosition(x, y) {
  return [(x * TILE_SIZE) + (TILE_SIZE / 2), (y * TILE_SIZE) + (TILE_SIZE / 2)]
}

function pixelToTilePosition(x, y) {
  return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
}

function animate() {
  renderer.render(stage);
  requestAnimationFrame(animate)
}

drawBoard(6, 6, TILE_SIZE);
drawToken(1, 2);
animate();
