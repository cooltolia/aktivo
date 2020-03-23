(function() {
    const profitCalc = document.querySelector('.profit-calc');
    if (!profitCalc) return;

    const investmentRangeSlider = document.querySelector('.profit-calc__investment-range');
    const invsestmentValue = document.querySelector('.profit-calc__investment-value');

    const incomeRangeSlider = document.querySelector('.profit-calc__income-range');

    const format = wNumb({
        decimals: 0,
        suffix: ' \u20BD',
        thousand: ' ',
    });

    const objectsNav = $('.profit-calc__objects-nav');
    const objectsSlider = $('.profit-calc__objects-slider');

    const initialValue = 1000000;

    initRangeSlider();

    /** init and interact with sliders */
    objectsSlider.on('init', function(e, slick) {
        const currentSlide = $(slick.$slides[slick.currentSlide]);
        const object = $(currentSlide.children()[0]);

        updateObjectData(object, initialValue);
    });

    objectsSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        if (currentSlide === nextSlide) return;

        const slide = $(slick.$slides[nextSlide]);
        const object = $(slide.children()[0]);

        const minValue = object.data('min');
        const maxValue = object.data('max');
        const stepValue = object.data('step');

        const rate = object.find('.profit-object__rate').data('rate');

        const currentRangeValue = parseInt(investmentRangeSlider.noUiSlider.get());

        const startValue = maxValue < currentRangeValue ? maxValue : currentRangeValue;

        investmentRangeSlider.noUiSlider.updateOptions({
            start: startValue,
            step: stepValue,
            range: {
                min: minValue,
                max: maxValue,
            },
        });

        const incomeMinValue = (minValue * rate) / 100;
        const incomeMaxValue = (maxValue * rate) / 100;
        const incomeInitialValue = (startValue * rate) / 100;
        const incomeStepValue = (stepValue * rate) / 100;

        incomeRangeSlider.noUiSlider.updateOptions({
            start: incomeInitialValue,
            step: incomeStepValue,
            range: {
                min: incomeMinValue,
                max: incomeMaxValue,
            },
        });
        animateRangeSlider();
        updateObjectData(object, startValue);
    });

    objectsNav.slick({
        rows: 0,
        slidesToScroll: 1,
        variableWidth: true,
        asNavFor: objectsSlider,
        arrows: false,
        focusOnSelect: true,
    });

    objectsSlider.slick({
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: objectsNav,
    });

    /**
     * interactions with range slider
     */
    investmentRangeSlider.noUiSlider.on('update', function(values, handle) {
        invsestmentValue.textContent = format.to(+values[handle]);

        const currentSlide = objectsSlider.find('.slick-current');
        const object = $(currentSlide.children()[0]);

        updateObjectData(object, values[handle]);
        incomeRangeSliderUpdate(object, values[handle]);
    });

    incomeRangeSlider.noUiSlider.on('slide', function(values, handle) {
        const currentSlide = objectsSlider.find('.slick-current');
        const object = $(currentSlide.children()[0]);

        investmentRangeSliderUpdate(object, values[handle]);
    });

    investmentRangeSlider.noUiSlider.on('change', () => {
        animateRangeSlider();
    });

    incomeRangeSlider.noUiSlider.on('change', () => {
        animateRangeSlider();
    });

    // helper functions

    function initRangeSlider() {
        const firstObject = $($(profitCalc).find('.profit-object')[0]);

        const minValue = firstObject.data('min');
        const maxValue = firstObject.data('max');
        const stepValue = firstObject.data('step');

        const rate = firstObject.find('.profit-object__rate').data('rate');

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

        updateObjectData(firstObject, initialValue);

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

    function incomeRangeSliderUpdate(object, value) {
        const rate = object.find('.profit-object__rate').data('rate');
        incomeRangeSlider.noUiSlider.set((value * rate) / 100);
    }

    function investmentRangeSliderUpdate(object, value) {
        const rate = object.find('.profit-object__rate').data('rate');
        investmentRangeSlider.noUiSlider.set((value / rate) * 100);
    }

    function updateObjectData(object, value) {
        const income = object.find('.profit-object__income');
        const share = object.find('.profit-object__share');
        const rate = object.find('.profit-object__rate').data('rate');

        const step = object.data('step');

        share.text(Math.floor(value / step));
        income.text(format.to((value * rate) / 100));
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
