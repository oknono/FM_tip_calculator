class Calculator {
    constructor() {
        this.bill = 100;
        this.pax = 1;
        this.percentage = 5;
        this.tipAmount = this.calculateTipAmount();
        this.totalAmount = this.calculateTotalAmount();
    }

    #tipMultiplier() {
        return 1 + (this.percentage / 100);
    }

    #tipFraction() {
        return this.percentage / 100;
    }

    calculateTipAmount() {
        return (this.bill * this.#tipFraction()) / this.pax;
    }

    calculateTotalAmount() {
        return (this.bill * this.#tipMultiplier()) / this.pax;
    }

    setBill(bill) {
        this.bill = bill;
    }

    getBill() {
        return this.bill;
    }

    setPax(pax) {
        this.pax = pax;
    }

    getPax() {
        return this.pax;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }

    getPercentage() {
        return this.percentage;
    }

    getTipAmount() {
        return this.tipAmount;
    }
    getTotalAmount() {
        return this.totalAmount;
    }

    reset() {
        this.setBill(100.00);
        this.setPax(1);
        this.setPercentage(5);
        this.updateTotals();
    }

    updateTotals() {
        this.tipAmount = this.calculateTipAmount();
        this.totalAmount = this.calculateTotalAmount();
    }
}

// Selectors
let bill = document.querySelector('#bill');
let pax = document.querySelector('#pax');
let percentage = document.querySelectorAll("input[type=radio]");
let tip_amount_person = document.querySelector('.tip_person');
let total_amount_person = document.querySelector('.total_person');
const button = document.querySelector('#reset');

// Initialize new calculator object and update screen based on state
const calculator = new Calculator();
updateScreen();

// Add eventlisteners for values that user can update
bill.addEventListener('blur', () => {
    calculator.setBill(bill.value);
    calculator.updateTotals();
    updateScreen();
})

pax.addEventListener('blur', () => {
    calculator.setPax(pax.value);
    calculator.updateTotals();
    updateScreen();
})

percentage.forEach(elem => elem.addEventListener('click', () => {
    calculator.setPercentage(elem.value);
    calculator.updateTotals();
    updateScreen();
}));

button.addEventListener('click', () => {
    calculator.reset();
    updateScreen();
})

function updateScreen() {
    let percentage = calculator.getPercentage();
    let toBeSelected = document.querySelector(`input[value='${percentage}']`);
    toBeSelected.checked = true;
    bill.value = calculator.getBill();
    pax.value = calculator.getPax();
    tip_amount_person.innerText = currencyFormat(calculator.getTipAmount());
    total_amount_person.innerText = currencyFormat(calculator.getTotalAmount());
}

function currencyFormat(num) {
    return "$" + (Math.round(num * 100) / 100).toFixed(2);
}



