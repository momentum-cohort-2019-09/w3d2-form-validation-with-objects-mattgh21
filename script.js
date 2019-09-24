console.log('Add validation!')

// class Form {
//     constructor(carField, dateField, cvvField, daysField, nameField, expirationField, ccField)
//     this.carField = carField
//     this.dateField = dateField
//     this.cvvField = cvvField
//     this.daysField = daysField
//     this.nameField = nameField
//     this.expirationField = expirationField
//     this.ccField = ccField
// }



// function markInvalid(field, error) {
//     // const formContainer = field.parentNode
//     field.classList.add('input-invalid')
//     field.classList.remove('input-valid')


class Field {
    constructor(input) {
        this.input = input;
    }
    fieldEmpty() {
        return this.input !== ""
    }
    isNumber() {
        return !isNaN(this.input)
    }
    isThreeNumbers() {
        return this.input.length === 3
    }
    isBetween() {
        return this.input >= 1 && this.input <= 30
    }
    isDateInFuture() {
        let today = Date.now()
        let parkingDate = new Date(this.input)
        if (today < parkingDate) {
            return true;
        } else {
            return false;
        }
    }
    validateCardNumber() {
        // console.log(this.input.value)
        let number = parseInt(this.input.value, 10)
            // console.log(number)
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number))
            return false;

        return this.luhnCheck(number);
    }

    luhnCheck(val) {
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
}

document.querySelector('#parking-form').addEventListener('submit', function(event) {
    event.preventDefault()

    let nameValue = document.querySelector('#name').value.trim()

    let nameField = new Field(nameValue)

    let daysValue = document.querySelector('#days').value.trim()

    let daysField = new Field(daysValue)

    let cvvValue = document.querySelector('#cvv').value.trim()

    let cvvField = new Field(cvvValue)

    let dateValue = document.querySelector('#start-date').value.trim()

    let dateField = new Field(dateValue)

    let carValue = document.querySelector('#car-info').value.trim()

    let carField = new Field(carValue)

    let ccValue = document.querySelector('#credit-card')

    let ccField = new Field(ccValue)

    let expirationValue = document.querySelector('#expiration')

    let expirationField = new Field(expirationValue)



    console.log(nameField.fieldEmpty())

    daysField.fieldEmpty()

    daysField.isNumber()

    cvvField.fieldEmpty()

    cvvField.isThreeNumbers()

    cvvField.isNumber()

    daysField.isBetween()

    dateField.isDateInFuture()

    ccField.validateCardNumber()

    carField.fieldEmpty()

    expirationField.fieldEmpty()







})