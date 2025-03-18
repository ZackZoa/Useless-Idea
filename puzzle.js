document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzleImage = 'path_to_noelle_image.jpg'; // Replace with the path to your image
    const totalPieces = 16; // 4x4 grid, so 16 pieces
    const missingPieceIndex = 15; // Last piece will be missing (index 15)
    
    let pieces = [];
  
    // Create puzzle pieces (16 total, one missing)
    for (let i = 0; i < totalPieces; i++) {
      if (i === missingPieceIndex) {
        pieces.push(null); // Missing piece
      } else {
        pieces.push(i); // Numbered pieces
      }
    }
  
    // Shuffle pieces (this is optional and can be removed if you want the pieces in order)
    pieces = shuffle(pieces);
  
    // Create each puzzle piece and append it to the puzzle board
    pieces.forEach((piece, index) => {
      const pieceElement = document.createElement('div');
      pieceElement.classList.add('puzzle-piece');
      
      if (piece === null) {
        pieceElement.classList.add('missing-piece');
      } else {
        pieceElement.style.backgroundImage = `url(${puzzleImage})`;
        pieceElement.style.backgroundPosition = `-${(piece % 4) * 150}px -${Math.floor(piece / 4) * 150}px`; // 4x4 grid, 150px per piece
        pieceElement.setAttribute('draggable', true);
        pieceElement.setAttribute('data-index', index);
  
        pieceElement.addEventListener('dragstart', dragStart);
        pieceElement.addEventListener('dragover', dragOver);
        pieceElement.addEventListener('drop', dropPiece);
      }
      
      puzzleBoard.appendChild(pieceElement);
    });
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.index);
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dropPiece(e) {
      e.preventDefault();
      const draggedIndex = e.dataTransfer.getData('text/plain');
      const droppedIndex = e.target.dataset.index;
  
      // Swap pieces
      if (e.target.classList.contains('puzzle-piece') && !e.target.classList.contains('missing-piece')) {
        const draggedElement = document.querySelector(`[data-index="${draggedIndex}"]`);
        const droppedElement = document.querySelector(`[data-index="${droppedIndex}"]`);
  
        const draggedBackgroundPosition = draggedElement.style.backgroundPosition;
        draggedElement.style.backgroundPosition = droppedElement.style.backgroundPosition;
        droppedElement.style.backgroundPosition = draggedBackgroundPosition;
  
        // Update indices
        const draggedPiece = pieces[draggedIndex];
        pieces[draggedIndex] = pieces[droppedIndex];
        pieces[droppedIndex] = draggedPiece;
  
        checkIfPuzzleCompleted();
      }
    }
  
    function checkIfPuzzleCompleted() {
      const completed = pieces.every((piece, index) => piece === index || piece === null);
      if (completed) {
        alert("Congratulations, you completed the puzzle!");
      }
    }
  });
  