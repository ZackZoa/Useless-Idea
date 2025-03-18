const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// Maze parameters
const gridSize = 20;
const canvasSize = 500;
const mazeWidth = canvasSize / gridSize;
const mazeHeight = canvasSize / gridSize;

// Player properties
let player = {
  x: 1,
  y: 1,
  size: gridSize - 2,
  color: 'blue'
};

// Finish line properties
let finishLine = {
  x: Math.floor(Math.random() * (mazeWidth - 1)) + 1,  // Random x-coordinate
  y: Math.floor(Math.random() * (mazeHeight - 1)) + 1, // Random y-coordinate
  color: 'red'
};

// Maze grid and wall generation
let maze = [];

function generateMaze() {
  // Initialize maze grid
  maze = [];
  for (let y = 0; y < mazeHeight; y++) {
    maze[y] = [];
    for (let x = 0; x < mazeWidth; x++) {
      // Randomly decide if it's a wall or path (50% chance)
      maze[y][x] = Math.random() < 0.3 ? 1 : 0; // 1 is wall, 0 is path
    }
  }

  // Ensure the starting point and finish line are open
  maze[player.y][player.x] = 0;
  maze[finishLine.y][finishLine.x] = 0;
}

// Draw maze grid, player, and finish line
function drawMaze() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the maze walls
  for (let y = 0; y < mazeHeight; y++) {
    for (let x = 0; x < mazeWidth; x++) {
      ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }

  // Draw the player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x * gridSize + 1, player.y * gridSize + 1, player.size, player.size);

  // Draw the finish line
  ctx.fillStyle = finishLine.color;
  ctx.fillRect(finishLine.x * gridSize + 1, finishLine.y * gridSize + 1, gridSize - 2, gridSize - 2);
}

// Move the player
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  // Check if the new position is inside the maze and not a wall
  if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }
}

// Move the finish line if the player is close
function moveFinishLine() {
  // Calculate the distance between the player and the finish line
  const dx = player.x - finishLine.x;
  const dy = player.y - finishLine.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If the player is within a certain range of the finish line, move it
  if (distance < 5) {
    finishLine.x = Math.floor(Math.random() * (mazeWidth - 1)) + 1;
    finishLine.y = Math.floor(Math.random() * (mazeHeight - 1)) + 1;

    // Ensure the new finish line position is not on a wall or the player
    if (maze[finishLine.y][finishLine.x] === 1 || (finishLine.x === player.x && finishLine.y === player.y)) {
      moveFinishLine(); // Try again if it's invalid
    }
  }
}

// Listen for arrow key presses to move the player
document.addEventListener('keydown', (e) => {
  // Prevent default behavior to stop page scrolling
  e.preventDefault();

  if (e.key === 'ArrowUp') {
    movePlayer(0, -1);
  } else if (e.key === 'ArrowDown') {
    movePlayer(0, 1);
  } else if (e.key === 'ArrowLeft') {
    movePlayer(-1, 0);
  } else if (e.key === 'ArrowRight') {
    movePlayer(1, 0);
  }

  // Move the finish line if the player is close
  moveFinishLine();

  // Redraw the maze with the updated player and finish line position
  drawMaze();
});

// Generate the maze and start the game
generateMaze();
drawMaze();
