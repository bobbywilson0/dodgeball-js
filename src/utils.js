var Config = require('./config')

module.exports = {
  tileToPixelPosition: (x, y) => {
    return {
      x: (x * Config.TILE_SIZE) + (Config.TILE_SIZE / 2),
      y: (y * Config.TILE_SIZE) + (Config.TILE_SIZE / 2)
    }
  },
  pixelToTilePosition: (x, y) => {
    return {
      x: Math.floor(x / Config.TILE_SIZE), 
      y: Math.floor(y / Config.TILE_SIZE)
    }
  }
}

