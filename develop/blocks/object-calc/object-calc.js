(function () {
    const objectCalc = document.querySelector('.object-calc');
    if (!objectCalc) return;

    /** DOM varaibles */

    const investmentRangeSlider = document.querySelector('.object-calc__investment-range');
    const invsestmentValue = document.querySelector('.object-calc__investment-value');

    const submitDataButton = document.querySelector('.object-calc__button');

    /**
     * result column nodes
     */

    const dataWrapper = document.querySelector('.object-calc__income-data');
    const $incomeValue = dataWrapper.querySelector('.object-calc__income .value');
    const $shareValue = dataWrapper.querySelector('.object-calc__share .value');
    const $stepValue = dataWrapper.querySelector('.object-calc__step .value');
    const $rateValue = dataWrapper.querySelector('.object-calc__rate .value');

    /**
     *  initial values for calculation
     */

    const initialValue = parseInt(dataWrapper.dataset.initial);
    const minValue = parseInt(dataWrapper.dataset.min);
    const maxValue = parseInt(dataWrapper.dataset.max);
    const basicStep = parseInt(dataWrapper.dataset.step);
    const basicRate = parseFloat(dataWrapper.dataset.rate);

    const minStepDivider = minValue / basicStep;

    /** step and rate can be overwritten by user */
    let customRate = null;
    let customStep = null;

    const format = wNumb({
        decimals: 0,
        thousand: ' ',
    });

    /**
     *editing default values
     */

    $incomeValue.addEventListener('blur', function (e) {
        const newIncome = format.from($incomeValue.textContent.trim());
        $incomeValue.textContent = format.to(newIncome);

        const currentRate = parseFloat($rateValue.textContent);
        const newSliderValue = ((newIncome * 12) / currentRate) * 100;

        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
    });

    $shareValue.addEventListener('blur', function (e) {
        let newShare = parseInt($shareValue.textContent.trim());
        if (isNaN(newShare)) newShare = minValue / basicStep;

        const step = customStep ? customStep : basicStep;
        const newSliderValue = newShare * step;

        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
    });

    $stepValue.addEventListener('blur', function (e) {
        let newStep = format.from($stepValue.textContent.trim());
        if (isNaN(newStep) || !newStep) newStep = parseInt(basicStep);

        customStep = newStep;

        updateRangesStep(customStep);
    });

    $rateValue.addEventListener('blur', function (e) {
        let newRate = parseFloat($rateValue.textContent.trim());
        if (isNaN(newRate)) newRate = parseFloat(basicRate);

        customRate = newRate;

        $incomeValue.textContent = format.to((investmentRangeSlider.noUiSlider.get() * (newRate / 100)) / 12);
    });

    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && e.target.classList.contains('value') && e.target.isContentEditable) {
            e.preventDefault();
            e.stopPropagation();
            e.target.blur();
        }
    });

    initRangeSlider();

    submitDataButton.addEventListener('click', submitData);

    /*
     * interactions with range slider
     */

    investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        let value = +values[handle];
        invsestmentValue.textContent = format.to(value);

        const rate = customRate ? customRate : basicRate;
        const step = customStep ? customStep : basicStep;

        updateResultData(value, rate, step);

    });

    /**
     * helper functions
     */

    function initRangeSlider() {
        noUiSlider.create(investmentRangeSlider, {
            start: initialValue,
            step: basicStep,
            animate: false,
            connect: 'lower',
            range: {
                min: 0,
                max: maxValue,
            },
            padding: [minValue, 0],
        });
    }

    function updateResultData(value, rate, step) {
        $incomeValue.textContent = format.to((value * rate) / 100 / 12);
        $shareValue.textContent = value / step;
        $rateValue.textContent = rate;
        $stepValue.textContent = format.to(step);
    }

    function updateRangesStep(step) {
        const minPadding = step >= minValue ? step : step * Math.ceil(minValue / step);
        const maxPadding = (maxValue % step === 0) ? 0 : step;

        investmentRangeSlider.noUiSlider.updateOptions(
            {
                step,
                padding: [minPadding, maxPadding],
            },
            false
        );
    }

    function animateRangeSlider() {
        const rangeLine = document.querySelector('.noUi-connect');
        const rangeHandle = document.querySelector('.noUi-origin');
        rangeLine.classList.add('transition');
        rangeHandle.classList.add('transition');

        setTimeout(() => {
            rangeLine.classList.remove('transition');
            rangeHandle.classList.remove('transition');
        }, 300);
    }

    function submitData() {
        const finalSelectedValue = investmentRangeSlider.noUiSlider.get();
        postData('url', `investment=${finalSelectedValue}`).then((data) => {});
    }

})();
