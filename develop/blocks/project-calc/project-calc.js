(function () {
    const projectCalc = $('.project-calc');
    if (projectCalc.length === 0) return;

    const formatedInputs = projectCalc.find('input[data-format]');

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
