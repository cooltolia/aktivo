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
    const step = dataWrapper.find('.object-calc__step .value');

    const rateNode = dataWrapper.find('.object-calc__rate');
    const rateValue = rateNode.find('.value');
    const basicRate = rateNode.data('rate');

    const libetyRate = rateNode.data('liberty-rate');

    const initialValue = dataWrapper.data('initial');
    const minValue = dataWrapper.data('min');
    const maxValue = dataWrapper.data('max');
    const basicStep = dataWrapper.data('step');
    const libertyStep = dataWrapper.data('liberty-step');

    const stepValue = initialValue > LIBERTY_MIN ? libertyStep : basicStep;

    let customRate = null;
    let customStep = null;

    initRangeSlider();
    
    income.on('input', (e) => {
        let newVal = format.from(e.target.textContent.trim());
        const caretPosition = getCaretPosition(e.target);
        if (!newVal) newVal = 0;
        e.target.textContent = format.to(newVal);
        setCaretPosition(e.target, caretPosition)
    });

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

    step.on('blur', function (e) {
        let changedValue = format.from(e.target.textContent.trim());
        if (isNaN(changedValue)) changedValue = +basicStep;
        customStep = changedValue;
        updateRangesStep(customStep);

        // income.text(format.to((investmentRangeSlider.noUiSlider.get() * (changedValue / 100)) / 12));
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
        const step = customStep ? customStep : value > LIBERTY_MIN ? libertyStep : basicStep;

        updateData(value, rate, step);
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

    function updateData(value, rate, stepValue) {
        share.text(Math.floor(value / stepValue));
        income.text(format.to((value * rate) / 100 / 12));
        rateValue.text(rate);
        step.text(format.to(stepValue));
    }

    function updateRangesStep(value) {
        const step = customStep ? customStep : value > LIBERTY_MIN ? libertyStep : basicStep;

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

    function setCaretPosition(el, position) {
        var range = document.createRange();
        var sel = window.getSelection();
        debugger;

        range.setStart(el.childNodes[0], position);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);
    }

    function getCaretPosition(elem) {
        var caretPos = 0,
            sel,
            range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode == elem) {
                    caretPos = range.endOffset;
                }
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            if (range.parentElement() == elem) {
                var tempEl = document.createElement('span');
                elem.insertBefore(tempEl, elem.firstChild);
                var tempRange = range.duplicate();
                tempRange.moveToElementText(tempEl);
                tempRange.setEndPoint('EndToEnd', range);
                caretPos = tempRange.text.length;
            }
        }
        return caretPos;
    }
})();
