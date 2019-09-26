console.log('Add validation!')

// class Form {
//     constructor(fields, validate) {

//     }



//     const errorMsg = document.createElement('p')
//     errorMsg.classlist.add("input-hint", "text-danger", "error-message")
// }


class Validation {
    constructor(test, errorMsg) {
        this.test = test
        this.errorMsg = errorMsg
    }

    runValidation(value) {
        return this.test(value)
    }

}



class Field {
    constructor(inputDiv, validations) {
        this.inputDiv = inputDiv
        this.validations = validations || []
        this.id = inputDiv.id.value
    }

    removeErrorMsgs() {
        for (let msg of this.inputDiv.parentNode.querySelectorAll('.error-message')) {
            msg.remove()
        }
    }
    markValid() {
        this.removeErrorMsgs()
        this.inputDiv.parentNode.classList.remove("input-invalid")
        this.inputDiv.parentNode.classList.add("input-valid")
    }

    markInvalid(error_message) {
        this.removeErrorMsgs()
        this.inputDiv.parentNode.classList.add("input-invalid")
        this.inputDiv.parentNode.classList.remove("input-valid")

        const errorMsg = document.createElement('p')
        errorMsg.classList.add('input-hint', 'text-danger', 'error-message')
        errorMsg.innerText = error_message
        this.inputDiv.parentNode.appendChild(errorMsg)
    }

    getDivValue() {
        const value = this.inputDiv.value
        return value
    }

    validate() {
        const value = this.getDivValue()

        for (let validation of this.validations) {
            if (true !== validation(value)) {
                let error_message = validation(value)
                this.markInvalid(error_message)
                break
            } else {
                console.log('marking valid')
                this.markValid()
            }
        }
    }
}

// defining validator functions.
// Returns true for valid field, and an error message if invalid
function fieldEmpty(str) {
    if (str !== "") {
        return true
    } else {
        error_mes = 'Field is required'
        return error_mes
    }
}

function isNumber(str) {
    if (!isNaN(str)) {
        return true
    } else {
        error_mes = 'Must be a number'
        return error_mes
    }
}

function isThreeNumbers(str) {
    if (str.length === 3) {
        return true
    } else {
        error_mes = 'Must be 3 numbers'
        return error_mes
    }

}

function isBetween(str) {
    if (str >= 1 && str <= 30) {
        return true
    } else {
        error_mes = 'Must be between 1-30 days'
        return error_mes
    }
}

function isDateInFuture(str) {
    let today = Date.now()
    let parkingDate = new Date(str)
    if (today < parkingDate) {
        return true;
    } else {
        error_mes = 'Date must be in the future'
        return error_mes;
    }
}

function checkCCNumber(str) {

    if (validateCardNumber(str)) {
        return true
    } else {
        error_mes = 'Invalid credit card number'
        return error_mes
    }
}

function validateCardNumber(str) {
    let number = parseInt(str, 10)
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return this.luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }

    return (sum % 10) == 0;
}

document.querySelector('#parking-form').addEventListener('submit', function(event) {
    event.preventDefault()


    let nameField = new Field(document.querySelector('#name'), [fieldEmpty])
    nameField.validate()

    let daysField = new Field(document.querySelector('#days'), [fieldEmpty, isBetween, isNumber])
    daysField.validate()

    let cvvField = new Field(document.querySelector('#cvv'), [fieldEmpty, isNumber, isThreeNumbers])
    cvvField.validate()


    let dateInput = document.querySelector('#start-date')
    let dateField = new Field(dateInput, [isDateInFuture])
    dateField.validate()


    let carField = new Field(document.querySelector('#car-info'), [fieldEmpty])
    carField.validate()

    let ccField = new Field(document.querySelector('#credit-card'), [fieldEmpty, checkCCNumber])
    ccField.validate()


    let expirationField = new Field(document.querySelector('#expiration'), [fieldEmpty])
    expirationField.validate()



    // nameField.fieldEmpty()

    // daysField.fieldEmpty()

    // daysField.isNumber()

    // cvvField.fieldEmpty()

    // cvvField.isThreeNumbers()

    // cvvField.isNumber()

    // daysField.isBetween()

    // dateField.isDateInFuture()

    // ccField.validateCardNumber()

    // carField.fieldEmpty()

    // console.log(expirationField.fieldEmpty())


})