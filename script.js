const size = 5;
let cells = [];

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    cells = [];

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
        cells.push(cell);

        cell.addEventListener('click', () => {
            toggle(i);
            checkWin(); // check win immediately after click
        });
    }
}

function toggle(index) {
    const toggleCell = i => {
        if (i >= 0 && i < size * size) {
            cells[i].classList.toggle('is-off');
        }
    };

    toggleCell(index);

    const row = Math.floor(index / size);
    const col = index % size;

    // Up
    if (row > 0) toggleCell(index - size);
    // Down
    if (row < size - 1) toggleCell(index + size);
    // Left
    if (col > 0) toggleCell(index - 1);
    // Right
    if (col < size - 1) toggleCell(index + 1);
}

function randomizeBoard() {
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * size * size);
        toggle(randomIndex);
    }
}

function checkWin() {
    const won = cells.every(cell => !cell.classList.contains('is-off'));
    if (won) {
        setTimeout(() => {
            window.alert("You win!");
        }, 100); // delay to let toggles visually update
    }
}

function startNewGame() {
    createBoard();
    setTimeout(randomizeBoard, 100); // delay to allow board to render
}

window.onload = () => {
    startNewGame();
    document.getElementById('lastModified').textContent = document.lastModified;
};