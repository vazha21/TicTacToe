const cells = document.getElementsByClassName("box");
const arrayOfCells = [].slice.call(cells);
let gameStatus = true; //if game is still on

arrayOfCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        draw(cell);
    });
});

function draw(cell) {
    let isFree = cell.classList.contains("free");
    if (isFree) {
        node = document.createElement("P");
        let textnode = document.createTextNode("O");
        node.appendChild(textnode);
        cell.appendChild(node);
        cell.classList.remove("free");

        arrayOfCells.forEach((cell) => {
            cell.style.pointerEvents = "none";
        });

        setTimeout(() => {
            computerDraw();
            arrayOfCells.forEach((cell) => {
                cell.style.pointerEvents = "auto";
            });
        }, 300);
    }
    checkWinner();
}

function computerDraw() {
    let freeCells = arrayOfCells.filter((cell) => {
        return cell.classList.contains("free");
    });
    if (!freeCells.length) {
    } else {
        let randomCell =
            freeCells[Math.floor(Math.random() * freeCells.length)];

        let node = document.createElement("P");
        let textnode = document.createTextNode("X");
        node.appendChild(textnode);
        randomCell.appendChild(node);
        randomCell.classList.remove("free");
    }
    if (gameStatus) {
        checkWinner();
    }
}

function checkWinner() {
    function cell(cellNumber) {
        if (arrayOfCells[cellNumber - 1].querySelector("P")) {
            return arrayOfCells[cellNumber - 1].querySelector("p").innerText;
        } else return "";
    }
    // checking horizontal lines.
    if (cell(1) == cell(2) && cell(1) == cell(3) && cell(1) != "") {
        announceWinner(cell(1));
    } else if (cell(4) == cell(5) && cell(4) == cell(6) && cell(4) != "") {
        announceWinner(cell(4));
    } else if (cell(7) == cell(8) && cell(7) == cell(9) && cell(7) != "") {
        announceWinner(cell(7));
    }
    // checking vertical ones
    else if (cell(1) == cell(4) && cell(1) == cell(7) && cell(1) != "") {
        announceWinner(cell(1));
    } else if (cell(2) == cell(5) && cell(2) == cell(8) && cell(2) != "") {
        announceWinner(cell(2));
    } else if (cell(3) == cell(6) && cell(3) == cell(9) && cell(3) != "") {
        announceWinner(cell(3));
    }
    // diagonals
    else if (cell(1) == cell(5) && cell(1) == cell(9) && cell(1) != "") {
        announceWinner(cell(1));
    } else if (cell(3) == cell(5) && cell(3) == cell(7) && cell(3) != "") {
        announceWinner(cell(3));
    } else {
        let arrayOfFrees = arrayOfCells.filter((cella) => {
            return cella.classList.contains("free");
        });
        if (arrayOfFrees.length == 0) {
            announceWinner("tie");
            //
        } else {
            //
        }
    }
}

function announceWinner(symbol) {
    gameStatus = false;
    setTimeout(() => {
        switch (symbol) {
            case "X":
                alert("Computer won");
                location.reload();
                break;
            case "O":
                alert("congratulations!");
                location.reload();
                break;
            default:
                alert("oh its a tie");
                location.reload();
        }
    }, 100);
}
