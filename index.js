const drawer = [
    {
      name: 'penny',
      value: 1, // a penny is 1 cent
      quantity: 72 // 72 pennies in the drawer
    },
    {
      name: 'nickel',
      value: 5,
      quantity: 41
    },
    {
      name: 'dime',
      value: 10,
      quantity: 31
    },
    {
      name: 'quarter',
      value: 25,
      quantity: 17
    },
    {
      name: 'one', // n.b. a $1 bill is a note, not a coin
      value: 100,
      quantity: 90
    },
    {
      name: 'five',
      value: 500,
      quantity: 11
    },
    {
      name: 'ten',
      value: 1_000,
      quantity: 2
    },
    {
      name: 'twenty',
      value: 2_000,
      quantity: 3
    },
    {
      name: 'hundred',
      value: 10_000,
      quantity: 1
    }
]

// Function that goes into the given drawer and removes 1 item with the given name
function removeItem(name, drawer) {
    for (let key in drawer) {
        if (drawer[key][`name`] == name) {
            drawer[key][`quantity`] -= 1;
        }
    }
    return drawer;
}

// Function that goes into the given drawer and adds 1 item with the given name
function addItem(name, drawer) {
    for (let key in drawer) {
        if (drawer[key][`name`] == name) {
            drawer[key][`quantity`] += 1;
        }
    }
    return drawer;
}

// Function goes through the given drawer and counts how many coins there are in total
function countCoins(drawer) {
    let coins = 0;
    for (let key in drawer) {
        if (drawer[key][`name`] === `penny` || drawer[key][`name`] === `nickel` || drawer[key][`name`] === `dime` || drawer[key][`name`] === `quarter`) {
            coins += drawer[key][`quantity`]
        }
    }
    return coins;
}

// Function goes through the given drawer and counts how many notes there are in total
function countNotes(drawer) {
    let notes = 0;
    for (let key in drawer) {
        if (drawer[key][`name`] === `one` || drawer[key][`name`] === `five` || drawer[key][`name`] === `ten` || drawer[key][`name`] === `twenty`|| drawer[key][`name`] === `hundred`) {
            notes += drawer[key][`quantity`]
        }
    }
    return notes;
}
  
// Function that calculates the total value of all money in the drawer
function sumDrawer(drawer) {
    let moneyInCents = 0;
    for (let key in drawer) {
        moneyInCents += (drawer[key][`value`] * drawer[key][`quantity`]);
    }
    return `$${(moneyInCents/100).toFixed(2)}`
}
  
// Function that returns true if it is possible to make the target amount out of the cash in the drawer and false if it is not possible
function canMakeAmount(target, drawer) {
    let coinsAndNotes = ["hundred", "twenty", "ten", "five", "one", "quarter", "dime", "nickel", "penny"];
    for (let key in coinsAndNotes) {
        let amountValue = (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).value
        let amountNeeded = Math.trunc(target / amountValue);
        let quantityAvailable = (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).quantity
        if (amountNeeded >= 1 && quantityAvailable >= 1) {
            if (amountNeeded > quantityAvailable) {
                target -= (quantityAvailable * amountValue)
            } else {
                target -= (amountNeeded * amountValue);
            }
        }
    }
    if (target == 0) {
        return true;
    } else {
        return false;
    }
}

// Function that works out the amount of change the customer is owed based on the cost of their items and the amount they have paid 
function transaction(cost, paid, drawer) {
    let coinsAndNotes = ["hundred", "twenty", "ten", "five", "one", "quarter", "dime", "nickel", "penny"];
    let target = paid - cost;

    // Add the customer’s paid amount to the drawer
    for (let key in coinsAndNotes) {
        let amountValue = (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).value
        let amountThatCanBeAdded = Math.trunc(paid / amountValue);
        if (amountThatCanBeAdded >= 1) {
            (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).quantity += amountThatCanBeAdded;
            paid -= (amountThatCanBeAdded * amountValue)
        }
    }

    // Remove their change from the drawer
    for (let key in coinsAndNotes) {
        let amountValue = (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).value
        let amountNeeded = Math.trunc(target / amountValue);
        let quantityAvailable = (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).quantity
        if (amountNeeded >= 1 && quantityAvailable >= 1) {
            if (amountNeeded > quantityAvailable) {
                target -= (quantityAvailable * amountValue);
                (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).quantity -= quantityAvailable;
            } else {
                target -= (amountNeeded * amountValue);
                (drawer.find((amount) => amount.name == `${coinsAndNotes[key]}`)).quantity -= amountNeeded;
            }
        }
    }
    return drawer;
}