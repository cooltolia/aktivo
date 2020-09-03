(function () {
    const objectCalc = document.querySelector('.object-calc');
    if (!objectCalc) return;

    const investmentRangeSlider = document.querySelector('.object-calc__investment-range');
    const invsestmentValue = document.querySelector('.object-calc__investment-value');

    const submitDataButton = document.querySelector('.object-calc__button');

    const format = wNumb({
        decimals: 0,
        // suffix: ' \u20BD',
        thousand: ' ',
    });

    const LIBERTY_MIN = 10000000;

    const dataWrapper = $('.object-calc__income-data');
    const income = dataWrapper.find('.object-calc__income .value');
    const share = dataWrapper.find('.object-calc__share .value');

    const rateNode = dataWrapper.find('.object-calc__rate');
    const rateValue = rateNode.find('.value');
    const basicRate = rateNode.data('rate');
    let customRate = null;
    const libetyRate = rateNode.data('liberty-rate');

    const initialValue = dataWrapper.data('initial');
    const minValue = dataWrapper.data('min');
    const maxValue = dataWrapper.data('max');
    const basicStep = dataWrapper.data('step');
    const libertyStep = dataWrapper.data('liberty-step');

    const stepValue = initialValue > LIBERTY_MIN ? libertyStep : basicStep;

    initRangeSlider();
    // income.on('input', e => {
    //     let newVal = format.from(e.target.textContent.trim());
    //     if (!newVal) newVal = 0;
    //     console.log(newVal);
    //     e.target.textContent = newVal.toLocaleString('ru-Ru');
    // })

    income.on('blur', function (e) {
        const changedValue = format.from(e.target.textContent.trim());
        income.text(format.to(changedValue));
        const currentRate = parseInt(rateValue.text());
        const newSliderValue = ((changedValue * 12) / currentRate) * 100;

        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
    });

    share.on('blur', function (e) {
        let changedValue = parseInt(e.target.textContent.trim());
        if (isNaN(changedValue)) changedValue = minValue / basicStep;

        const newSliderValue = changedValue * basicStep;

        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
    });

    rateValue.on('blur', function (e) {
        let changedValue = parseFloat(e.target.textContent.trim());
        if (isNaN(changedValue)) changedValue = +basicRate;

        customRate = changedValue;

        income.text(format.to((investmentRangeSlider.noUiSlider.get() * (changedValue / 100)) / 12));
    });

    document.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 && e.target.classList.contains('value') && e.target.isContentEditable) {
            e.preventDefault();
            e.stopPropagation();
            e.target.blur();
        }
    });

    submitDataButton.addEventListener('click', submitData);

    /**
     * interactions with range slider
     */
    investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        const value = +values[handle];
        invsestmentValue.textContent = format.to(value);

        const rate = customRate ? customRate : value > LIBERTY_MIN ? libetyRate : basicRate;
        rateValue.html(rate);

        updateData(value, rate);
    });

    investmentRangeSlider.noUiSlider.on('set', function (values, handle) {
        const value = +values[handle];
        updateRangesStep(value);
    });

    // investmentRangeSlider.noUiSlider.on('change', () => {
    //     animateRangeSlider();
    // });

    // helper functions

    function initRangeSlider() {
        noUiSlider.create(investmentRangeSlider, {
            start: initialValue,
            step: stepValue,
            animate: false,
            connect: 'lower',
            range: {
                min: minValue,
                max: maxValue,
            },
        });
    }

    function updateData(value, rate) {
        share.text(Math.floor(value / stepValue));
        income.text(format.to((value * rate) / 100 / 12));
    }

    function updateRangesStep(value) {
        const step = value > LIBERTY_MIN ? libertyStep : basicStep;

        investmentRangeSlider.noUiSlider.updateOptions({ step }, false);
    }

    function animateRangeSlider() {
        const rangeLine = $('.noUi-connect');
        const rangeHandle = $('.noUi-origin');
        rangeLine.addClass('transition');
        rangeHandle.addClass('transition');

        setTimeout(() => {
            rangeLine.removeClass('transition');
            rangeHandle.removeClass('transition');
        }, 300);
    }

    function submitData() {
        const finalSelectedValue = investmentRangeSlider.noUiSlider.get();
        postData('url', `investment=${finalSelectedValue}`).then((data) => {});
    }
})();
