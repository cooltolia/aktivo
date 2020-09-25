(function () {
    const profitCalc = document.querySelector('.profit-calc');
    if (!profitCalc) return;

    const investmentRangeSlider = document.querySelector('.profit-calc__investment-range');
    const invsestmentValue = document.querySelector('.profit-calc__investment-value');

    // const incomeRangeSlider = document.querySelector('.profit-calc__income-range');

    const LIBERTY_MIN = 10000000;

    const objectLink = document.querySelector('.profit-calc__object-link');

    const format = wNumb({
        decimals: 0,
        thousand: ' ',
    });

    const objectsNav = $('.profit-calc__objects-nav');
    const objectsSlider = $('.profit-calc__objects-slider');
    const objects = objectsSlider.find('.profit-object');
    objects.each(function (_, object) {
        initValueEdit($(object));
    });

    const initialValue = 1000000;

    initRangeSlider();

    /** init and interact with sliders */
    objectsSlider.on('init', function (e, slick) {
        const currentSlide = $(slick.$slides[slick.currentSlide]);
        const object = $(currentSlide.children()[0]);

        updateObjectData(object, initialValue);
        updateObjectLink(object);
    });

    objectsSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        if (currentSlide === nextSlide) return;

        const slide = $(slick.$slides[nextSlide]);
        const object = $(slide.children()[0]);

        const minValue = object.data('min');
        const maxValue = object.data('max');
        const step = object.data('step');

        const currentRangeValue = parseInt(investmentRangeSlider.noUiSlider.get());

        const startValue = maxValue < currentRangeValue ? maxValue : currentRangeValue;

        investmentRangeSlider.noUiSlider.updateOptions({
            start: startValue,
            step: step,
            range: {
                min: 0,
                max: maxValue,
            },
            padding: [minValue, 0],
        });

        animateRangeSlider();
        updateObjectData(object, startValue);
        updateObjectLink(object);
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
    investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        const value = +values[handle];
        invsestmentValue.textContent = format.to(value);

        const currentSlide = objectsSlider.find('.slick-current');
        const object = $(currentSlide.children()[0]);

        updateObjectData(object, value);

        updateObjectLink(object);
    });

    investmentRangeSlider.noUiSlider.on('change', () => {
        animateRangeSlider();
    });

    // helper functions

    function initRangeSlider() {
        const firstObject = $($(profitCalc).find('.profit-object')[0]);

        const minValue = firstObject.data('min');
        const maxValue = firstObject.data('max');
        const stepValue = firstObject.data('step');

        noUiSlider.create(investmentRangeSlider, {
            start: initialValue,
            step: stepValue,
            animate: false,
            connect: 'lower',
            range: {
                min: 0,
                max: maxValue,
            },
            padding: [minValue, 0],
        });

        updateObjectData(firstObject, initialValue);

        // incomeRangeSliderInit(minValue, maxValue, stepValue, initialValue, basicRate);
    }

    function initValueEdit(object) {
        const incomeNode = object.find('.profit-object__income .value');
        const shareNode = object.find('.profit-object__share .value');
        const rateNode = object.find('.profit-object__rate .value');
        const stepNode = object.find('.profit-object__step .value');

        const minValue = object.data('min');
        const maxValue = object.data('max');
        const stepValue = object.data('step');
        const rateValue = object.data('rate');

        incomeNode.on('blur', function (e) {
            const newIncome = format.from(incomeNode.text().trim());
            incomeNode.text(format.to(newIncome));

            const currentRate = parseFloat(rateNode.text());
            const newSliderValue = ((newIncome * 12) / currentRate) * 100;

            investmentRangeSlider.noUiSlider.set(newSliderValue);
            animateRangeSlider();
        });

        shareNode.on('blur', function (e) {
            let newShare = parseInt(shareNode.text().trim());
            if (isNaN(newShare)) newShare = minValue / stepValue;

            const newSliderValue = newShare * stepValue;

            investmentRangeSlider.noUiSlider.set(newSliderValue);
            animateRangeSlider();
        });

        stepNode.on('blur', function (e) {
            let newStep = format.from(stepNode.text().trim());
            if (isNaN(newStep)) newStep = parseInt(stepValue);

            object.attr('data-custom-step', newStep);

            updateRangesStep(object, newStep);
        });

        rateNode.on('blur', function (e) {
            let newRate = parseFloat(rateNode.text().trim());
            if (isNaN(newRate)) newRate = parseFloat(rateValue);

            object.attr('data-custom-rate', newRate);

            incomeNode.text(format.to((investmentRangeSlider.noUiSlider.get() * (newRate / 100)) / 12));
        });
    }

    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && e.target.classList.contains('value') && e.target.isContentEditable) {
            e.preventDefault();
            e.stopPropagation();
            e.target.blur();
        }
    });

    // function incomeRangeSliderInit(min, max, step, initial, rate) {
    //     const minValue = (min * rate) / 100;
    //     const maxValue = (max * rate) / 100;
    //     const initialValue = (initial * rate) / 100;
    //     const stepValue = (step * rate) / 100;

    //     noUiSlider.create(incomeRangeSlider, {
    //         start: initialValue,
    //         step: stepValue,
    //         animate: false,
    //         range: {
    //             min: minValue,
    //             max: maxValue,
    //         },
    //     });
    // }

    // function incomeRangeSliderUpdate(object, value) {
    //     const rateNode = object.find('.profit-object__rate');
    //     const basicRate = rateNode.data('rate');
    //     const libertyRate = rateNode.data('liberty-rate');
    //     const rate = value > LIBERTY_MIN ? libertyRate : basicRate;

    //     incomeRangeSlider.noUiSlider.set((value * rate) / 100);
    // }

    // function investmentRangeSliderUpdate(object, value) {
    //     const rateNode = object.find('.profit-object__rate');
    //     const basicRate = rateNode.data('rate');
    //     const libertyRate = rateNode.data('liberty-rate');

    //     const rate = value > LIBERTY_MIN ? libertyRate : basicRate;

    //     investmentRangeSlider.noUiSlider.set((value / rate) * 100);
    // }

    function updateObjectData(object, value) {
        const incomeNode = object.find('.profit-object__income .value');
        const shareNode = object.find('.profit-object__share .value');
        const rateNode = object.find('.profit-object__rate .value');
        const stepNode = object.find('.profit-object__step .value');

        const basicRate = object.data('rate');
        const customRate = parseInt(object.attr('data-custom-rate'));
        const basicStep = object.data('step');
        const customStep = parseInt(object.attr('data-custom-step'));

        const rate = customRate ? customRate : basicRate;
        const step = customStep ? customStep : basicStep;

        shareNode.text(Math.floor(value / step));
        incomeNode.text(format.to((value * rate) / 100 / 12));
        rateNode.text(rate);
        stepNode.text(format.to(step));
    }

    function updateObjectLink(object) {
        const value = parseInt(investmentRangeSlider.noUiSlider.get());
        objectLink.href = object.data('link') + '/' + value;
    }

    function updateRangesStep(object, step) {
        const minValue = object.data('min');
        const maxValue = object.data('max');

        const minPadding = step >= minValue ? step : step * Math.ceil(minValue / step);
        const maxPadding = maxValue % step === 0 ? 0 : step;

        investmentRangeSlider.noUiSlider.updateOptions(
            {
                step,
                padding: [minPadding, maxPadding],
            },
            false
        );
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
