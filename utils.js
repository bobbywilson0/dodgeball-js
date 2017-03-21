var Config = require('./config')

module.exports = {
  tileToPixelPosition: function (x, y) {
    return [
      (x * Config.TILE_SIZE) + (Config.TILE_SIZE / 2),
      (y * Config.TILE_SIZE) + (Config.TILE_SIZE / 2)
    ]
  },
  pixelToTilePosition: function (x, y) {
    return [Math.floor(x / Config.TILE_SIZE), Math.floor(y / Config.TILE_SIZE)]
  }
}

