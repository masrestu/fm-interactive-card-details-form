const formatCardNumber = (cardNumber) => {
    if (cardNumber === '') return ''
    return cardNumber
        .substring(0, 19)
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
}

const cardHolderInput = document.querySelector('#cardholder-name');
const cardNumberInput = document.querySelector('#card-number');
const expDateMMInput = document.querySelector('#exp-date-mm')
const expDateYYInput = document.querySelector('#exp-date-yy')
const cvcInput = document.querySelector('#cvc')

const printCardInfo = () => {
    const cardHolder = cardHolderInput.value || 'Jane Appleseed';
    const cardNumber = cardNumberInput.value || '0000 0000 0000 0000';
    const expDateMM = expDateMMInput.value || '00';
    const expDateYY = expDateYYInput.value || '00';
    const cvc = cvcInput.value || '000';

    document.querySelector('.card-name').textContent = cardHolder.toUpperCase();
    document.querySelector('.card-number').textContent = formatCardNumber(cardNumber);
    document.querySelector('.card-exp').textContent = `${expDateMM}/${expDateYY}`;
    document.querySelector('.cvc').textContent = cvc;
}

const cardHolderError = document.querySelector('#cardholder-name ~ .error');
cardHolderInput.addEventListener('input', (e) => {
    let errorText = ''
    if (e.target.value.length == 0) {
        errorText = "Can't be blank";
    }

    if (errorText) {
        cardHolderInput.setCustomValidity(errorText);
        cardHolderError.textContent = errorText;
        return false
    }
    cardHolderInput.setCustomValidity('');
})

const cardNumberError = document.querySelector('#card-number ~ .error');
cardNumberInput.addEventListener('input', (e) => {
    cardNumberInput.value = formatCardNumber(e.target.value);
    let errorText = ''
    if (e.target.value.match(/[^\d\s]/g) || e.target.value.length > 19) {
        errorText = 'Wrong format, numbers only';
    } else if (e.target.value.length == 0) {
        errorText = "Can't be blank";
    }

    if (errorText) {
        cardNumberInput.setCustomValidity(errorText);
        cardNumberError.textContent = errorText;
        return false
    }
    cardNumberInput.setCustomValidity('');
})

const expDateError = document.querySelector('.exp-date-error');
[expDateMMInput, expDateYYInput].forEach(input => {
    input.addEventListener('input', (e) => {
        input.value = input.value.substring(0, 2);
        let errorText = ''
        if (input.value.match(/[\D]/g)) {
            errorText = 'Wrong format, numbers only';
        } else if (input.value.length == 0) {
            errorText = "Can't be blank";
        }

        if (errorText) {
            input.setCustomValidity(errorText);
            expDateError.textContent = errorText;
            return false
        }
        input.setCustomValidity('');
    })
})

const cvcError = document.querySelector('.cvc-error');
cvcInput.addEventListener('input', (e) => {
    cvcInput.value = cvcInput.value.substring(0, 3);
    let errorText = ''
    if (cvcInput.value.match(/[\D]/g)) {
        errorText = 'Wrong format, numbers only';
    } else if (cvcInput.value.length == 0) {
        errorText = "Can't be blank";
    }

    if (errorText) {
        cvcInput.setCustomValidity(errorText);
        cvcError.textContent = errorText;
        return false
    }
    cvcInput.setCustomValidity('');
})

const confirmButton = document.querySelector('.page1 button');
const continueButton = document.querySelector('.page2 button');

const mainSection = document.querySelector('main');

confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!cardHolderInput.checkValidity() || !cardNumberInput.checkValidity() || !expDateMMInput.checkValidity() || !expDateYYInput.checkValidity() || !cvcInput.checkValidity() || cardHolderInput.value == '' || cardNumberInput.value == '' || expDateMMInput.value == '' || expDateYYInput.value == '' || cvcInput.value == '') {
        return
    }

    mainSection.classList.add('completed')
    printCardInfo()
})

continueButton.addEventListener('click', () => {
    mainSection.classList.remove('completed')
    document.querySelector('form').reset()
    printCardInfo()
})