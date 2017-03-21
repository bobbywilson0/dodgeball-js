var gameState = {
  blueTeam: {
    '1': { x: 0, y: 0 },
    '2': { x: 0, y: 2 },
    '3': { x: 0, y: 4 },
    '4': { x: 0, y: 6 }
  },
  redTeam: {
    '1':{ x: 6, y: 0 },
    '2':{ x: 6, y: 2 },
    '3':{ x: 6, y: 4 },
    '4':{ x: 6, y: 6 }
  },
  balls: {
    '1': { x: 3, y: 0 },
    '2': { x: 3, y: 2 },
    '3': { x: 3, y: 4 },
    '4': { x: 3, y: 6 }
  }
}

function movePlayer (player, x, y) {
  gameState[player.team][player.id].x = x
  gameState[player.team][player.id].y = y
}

module.exports = function() {
  return gameState
} 
