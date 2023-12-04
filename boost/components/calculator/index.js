const rangeArray = document.querySelectorAll('.js-range');

if (rangeArray.length > 0) {
    rangeArray.forEach(range => {
        const rangeElement = range.querySelector('.range-slider'),
            rangeMax = rangeElement.dataset.max,
            rangeMin = rangeElement.dataset.min,
            rangeInputMin = range.querySelector('.js-range-from-input'),
            rangeInputMax = range.querySelector('.js-range-to-input');
        const newEvent = new Event('change', {bubbles: true});
        if(rangeInputMin && rangeInputMax){
            const rangeSliderElement = rangeSlider(rangeElement, {
                min: rangeMin,
                max: rangeMax,
                step: 1,
                value: [rangeMin,rangeMax],
                disabled: false,
                rangeSlideDisabled: false,
                thumbsDisabled: [false, false],
                orientation: 'horizontal',
                onInput: function (valueSet) {
                    rangeInputMin.value = valueSet[0];
                    rangeInputMax.value = valueSet[1];

                    rangeInputMin.dispatchEvent(newEvent);
                    rangeInputMax.dispatchEvent(newEvent);
                },
            });

            rangeInputMin.addEventListener('change', () => {
                rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
            });
            rangeInputMax.addEventListener('change', () => {
                rangeSliderElement.value([rangeInputMin.value, rangeInputMax.value])
            });

            rangeInputMax.dispatchEvent(newEvent);
            rangeInputMin.dispatchEvent(newEvent);
        }else{
            const rangeSliderElement = rangeSlider(rangeElement, {
                min: rangeMin,
                max: rangeMax,
                step: 1,
                value: rangeMin,
                disabled: false,
                rangeSlideDisabled: false,
                thumbsDisabled: [true, false],
                orientation: 'horizontal',
                onInput: function (valueSet) {
                    rangeInputMax.value = valueSet[1];

                    rangeInputMax.dispatchEvent(newEvent);
                },
            });

            rangeInputMax.addEventListener('change', () => {
                rangeSliderElement.value([0, rangeInputMax.value])
            });

            rangeInputMax.dispatchEvent(newEvent);
        }
    });
}


const calculatorArray = document.querySelectorAll('.calculator-content');

if (calculatorArray.length) {
    calculatorArray.forEach(calculator => {
        calculator.addEventListener('submit', (e) => {
            e.preventDefault();

            showPopup(".popup-calculator");
        });
    });
}

const rangeControl = document.querySelectorAll('.range-control');

if (rangeControl.length) {
    rangeControl.forEach(element => {
        const rangeButtonMinus = element.querySelector('.range-control__button--minus'),
            rangeButtonPlus = element.querySelector('.range-control__button--plus'),
            rangeControlValue = element.querySelector('.range-control__input');

        rangeButtonMinus.addEventListener('click', (e) => {
            e.preventDefault();

            if (rangeControlValue.value - 30 < 0) return
            rangeControlValue.value -= 30;

            const event = new Event('change', {bubbles: true});
            rangeControlValue.dispatchEvent(event);
        });
        rangeButtonPlus.addEventListener('click', (e) => {
            e.preventDefault();

            console.log(+rangeControlValue.value, +rangeControlValue.max)
            if (+rangeControlValue.value + 30 > +rangeControlValue.max) return
            rangeControlValue.value = parseInt(rangeControlValue.value) + 30;

            const event = new Event('change', {bubbles: true});
            rangeControlValue.dispatchEvent(event);
        });
    });
}