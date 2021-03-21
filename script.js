let dieDisplay = document.getElementById("input-span");
let resultDisplay = document.getElementById("output-span");
let total = 0;
let totalOutput = "";
let re = /= 0/;

let dice = [{
        type: "Black Die",
        rollArray: [0, 1, 1, 1, 2, 2],
        count: 0,
        result: ""
    },
    {
        type: "Blue Die",
        rollArray: [1, 2, 2, 3, 3, 3],
        count: 0,
        result: ""
    },
    {
        type: "Orange Die",
        rollArray: [2, 2, 2, 3, 3, 4],
        count: 0,
        result: ""
    },
    {
        type: "Roll Die",
        rollArray: [0, 1],
        count: 0,
        result: ""
    }
];

function addDie(input) {
    checkIfClearNeeded(input);
    if (total != 0 || re.exec(totalOutput)) {
        clearAll();
    }
    dice[input]["count"]++;
    displayDice();
}

function getResults() {
    clearResults();
    performRandom();
    resultDisplay.classList.add("fade-in");
    const animated = document.querySelector('.fade-in');
    animated.addEventListener('animationend', () => {
        resultDisplay.classList.remove("fade-in");
    });
    addResults();

}

function displayDice() {
    let output = "";
    let die;
    let first = true;
    for (die in dice) {
        dieCount = dice[die]["count"];
        dieType = dice[die]["type"];
        if (dieCount > 0) {
            if (!first) {
                output += " + ";
            }
            output += String(dieCount) + " " + dieType + " ";
            first = false;
        }
    }
    dieDisplay.innerHTML = output;
}

function performRandom() {
    let die;
    let count;
    let currentResult = "";
    for (die in dice) {
        for (count = 0; count < dice[die]["count"]; count++) {
            var rollArray = dice[die]["rollArray"];
            currentResult = dice[die]["result"];
            var randomElement = _.sample(rollArray);
            if (currentResult) {
                currentResult += " + ";
            }
            currentResult += String(randomElement);
            dice[die]["result"] = currentResult;
        }
    }
}

function addResults() {
    let die;
    let dieTotal = 0;
    let output = "";
    let first = true;
    let display = document.getElementById("results-display");
    for (die in dice) {
        let dieResult = dice[die]["result"];
        if (dieResult) {
            dieTotal += eval(dieResult);
            if (!first) {
                output += " + ";
            }
            output += " ( " + dieResult + " ) ";
            first = false;
        }
    }
    output += " = " + String(dieTotal);
    totalOutput = output;
    total = dieTotal;
    resultDisplay.innerHTML = output;
}

function clearAll() {
    let die;
    for (die in dice) {
        dice[die]["count"] = 0;
        dice[die]["result"] = "";
    }
    dieDisplay.innerHTML = "&nbsp;";
    resultDisplay.innerHTML = "&nbsp;";
    total = 0;
    totalOutput = "";
}

function clearResults() {
    let die;
    for (die in dice) {
        dice[die]["result"] = "";
    }
}

function checkIfClearNeeded(input) {
    let die;
    let block;
    if (input == 3) {
        for (die = 0; die < dice.length - 1; die++) {
            if (dice[die]["count"] > 0) {
                clearAll();
            }
        }
    } else {
        if (dice[3]["count"] > 0) {
            clearAll();
        }
    }
}
