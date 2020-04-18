(function () {
    const projectCalc = $('.project-calc');
    if (projectCalc.length === 0) return;

    const form = $('.project-calc__form');

    const formatedInputs = projectCalc.find('input[data-format]');
    const allFormInputs = projectCalc.find('input');
    const allRequiredInputs = allFormInputs.filter('[required]');

    function formLogic() {
        // check whether all required inputs are filled
        const requiredInputsFilled = [...allRequiredInputs].every((input) => {
            return input.value.trim().length > 0;
        });

        if (!requiredInputsFilled) return;

        [...formatedInputs].map((input) => {
            const val = input.value;
            const type = input.dataset.format;

            if (val.length > 0) {
                const newVal = formatPatterns[type].from(val);
                input.value = newVal;
            }
        });

        const formData = form.serialize();

        //format inputs back
        [...formatedInputs].map((input) => {
            const val = parseInt(input.value);
            const type = input.dataset.format;

            if (val) {
                const newVal = formatPatterns[type].to(val);
                input.value = newVal;
            }
        });

        // postData('url', formData).then((data) => {
        //     //if all is fine
        //     updateData(data);
        // });
    }

    allFormInputs.each((_, input) => {
        $(input).on('change', (e) => {
            formLogic();
        });
    });

    function updateData(data) {
        $('#monthIncome').text(data.monthIncome);
        $('#monthExpanses').text(data.monthExpanses);
        $('#objectValue').text(data.objectValue);
        $('#operatingIncome').text(data.operatingIncome);
        $('#vatRecovery').text(data.vatRecovery);
        $('#vatOffset').text(data.vatOffset);
    }

    const formatPatterns = {
        meter: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: ' м²',
        }),
        ruble: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: ' \u20BD',
        }),
    };

    formatedInputs.each((_, input) => {
        const type = $(input).data('format');
        let currentValue = $(input).val() || '';

        $(input).on('input', (e) => {
            const val = $(input).val();
            /^[0-9\s]*$/.test(val) ? (currentValue = val) : (input.value = currentValue);
        });

        $(input).on('blur', (e) => {
            let val = parseInt($(input).val().split(' ').join(''));

            if (!val) return;

            $(input).val(formatPatterns[type].to(val));
        });

        $(input).on('focus', (e) => {
            const val = $(input).val();

            if (val.length === 0) return;

            $(input).val(formatPatterns[type].from(val));
        });
    });
})();
