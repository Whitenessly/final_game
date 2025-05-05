var btn = document.querySelector(".btn");
var state = false;
btn.addEventListener("click", () => {
    if (state) {
        btn.innerText = "Bắt đầu";
        btn.style.backgroundColor = "#00b500";
        state = false;
        stopTimer();
    } else {
        btn.innerText = "Kết thúc";
        btn.style.backgroundColor = "red";
        state = true;
        swap();
        resetTimer();
        startTimer();
    }
});
const display = document.querySelector(".display");


let timer = null;
let startTime = 0;
let elapsedTime = 0;


function startTimer() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 1000);
}
function stopTimer() {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
}
function resetTimer() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = `00:00`;
}
function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minute = Math.floor(elapsedTime / (60 * 1000));
    let second = Math.floor(elapsedTime / 1000 % 60);

    minute = String(minute).padStart(2, "0");
    second = String(second).padStart(2, "0");

    display.textContent = `${minute}:${second}`;
    checking();
}

function swap() {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < 100; i++) {
        squares.forEach(square => {
            let randomPosition = Math.floor(Math.random() * squares.length);

            let currentNumber = square.textContent;
            let currentBackground = square.className;
            let currentColor = square.style.color;

            let randomBox = squares[randomPosition];
            square.textContent = randomBox.textContent;
            square.className = randomBox.className;
            square.style.color = randomBox.style.color;

            randomBox.textContent = currentNumber;
            randomBox.className = currentBackground;
            randomBox.style.color = currentColor;
        });
    };
}

document.addEventListener("keydown", (n) => {
    let blackSquare = document.querySelector(".cursor");
    let boxes = Array.from(document.querySelectorAll(".square"));
    let index = boxes.indexOf(blackSquare);
    let targetIndex;

    switch (n.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            if (index % 4 !== 0) targetIndex = index - 1;
            break;
        case 'arrowright':
        case 'd':
            if (index % 4 !== 3) targetIndex = index + 1;
            break;
        case 'arrowup':
        case 'w':
            if (index >= 4) targetIndex = index - 4;
            break;
        case 'arrowdown':
        case 's':
            if (index < 8) targetIndex = index + 4;
            break;
    }

    if (targetIndex !== undefined) {
        let targetBox = boxes[targetIndex];
        [blackSquare.textContent, targetBox.textContent] = [targetBox.textContent, blackSquare.textContent];
        [blackSquare.className, targetBox.className] = [targetBox.className, blackSquare.className];
        [blackSquare.style.color, targetBox.style.color] = [targetBox.style.color, blackSquare.style.color];
    }
});


function checkvar() {
    const squares = document.querySelectorAll(".square");
    for (let i = 1; i <= 11; i++) {
        let n = parseInt(squares[i].textContent);
        if (n != i) {
            return 0;
        }
    }
    return 1;
}

function checking () {
    if (checkvar()) {
        btn.innerText = "Bắt đầu";
        btn.style.backgroundColor = "#00b500";
        state = false;
        stopTimer();
        prompt("YOU WIN!");
    }
}