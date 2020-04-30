(function () {
    const objectCalc = document.querySelector('.object-calc');
    if (!objectCalc) return;

    const investmentRangeSlider = document.querySelector('.object-calc__investment-range');
    const invsestmentValue = document.querySelector('.object-calc__investment-value');

    const incomeRangeSlider = document.querySelector('.object-calc__income-range');

    const format = wNumb({
        decimals: 0,
        suffix: ' \u20BD',
        thousand: ' ',
    });

    const LIBERTY_MIN = 10000000;

    const dataWrapper = $('.object-calc__income-data');
    const income = dataWrapper.find('.object-calc__income');
    const share = dataWrapper.find('.object-calc__share');
    const rate = dataWrapper.find('.object-calc__rate').data('rate');

    const initialValue = dataWrapper.data('initial');
    const minValue = dataWrapper.data('min');
    const maxValue = dataWrapper.data('max');
    const basicStep = dataWrapper.data('step');
    const libertyStep = dataWrapper.data('liberty-step');

    const stepValue = initialValue > LIBERTY_MIN ? libertyStep : basicStep;

    initRangeSlider();

    /**
     * interactions with range slider
     */
    investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        invsestmentValue.textContent = format.to(+values[handle]);

        updateData(values[handle]);
        incomeRangeSliderUpdate(values[handle]);
    });

    investmentRangeSlider.noUiSlider.on('set', function (values, handle) {
        const value = +values[handle];
        updateRangesStep(value);
    });

    incomeRangeSlider.noUiSlider.on('slide', function (values, handle) {
        investmentRangeSliderUpdate(values[handle]);
    });

    investmentRangeSlider.noUiSlider.on('change', () => {
        animateRangeSlider();
    });

    incomeRangeSlider.noUiSlider.on('change', () => {
        animateRangeSlider();
    });

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

        incomeRangeSliderInit(minValue, maxValue, stepValue, initialValue, rate);
    }

    function incomeRangeSliderInit(min, max, step, initial, rate) {
        const minValue = (min * rate) / 100;
        const maxValue = (max * rate) / 100;
        const initialValue = (initial * rate) / 100;
        const stepValue = (step * rate) / 100;

        noUiSlider.create(incomeRangeSlider, {
            start: initialValue,
            step: stepValue,
            animate: false,
            range: {
                min: minValue,
                max: maxValue,
            },
        });
    }

    function incomeRangeSliderUpdate(value) {
        incomeRangeSlider.noUiSlider.set((value * rate) / 100);
    }

    function investmentRangeSliderUpdate(value) {
        investmentRangeSlider.noUiSlider.set((value / rate) * 100);
    }

    function updateData(value) {
        share.text(Math.floor(value / stepValue));
        income.text(format.to((value * rate) / 100 / 12));
    }

    function updateRangesStep(value) {
        const step = value > LIBERTY_MIN ? libertyStep : basicStep;
        console.log('step: ', step);

        // debugger;

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
})();
