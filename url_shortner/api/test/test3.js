const { t } = require('typy');


let x = {
    // "expiryInDays": 7,
    "expiryInDays1": null
}

console.log(t(x, "expiryInDays").isNumber)
console.log(t(x, "expiryInDays1").isNumber)
