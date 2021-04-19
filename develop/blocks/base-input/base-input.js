(function() {
    const $inputs = $('.base-input__input, .base-input__textarea');
    const $autocompleteInputs = $('.base-input-autocomplete');



    $inputs.each(function() {
        if (
            $(this)
                .val()
                .trim() !== ''
        ) {
            $(this).closest('.base-input').addClass('hasValue');
        }

        $(this).on('blur', function() {
            if (
                $(this)
                    .val()
                    .trim() !== ''
            ) {
                $(this).closest('.base-input').addClass('hasValue');
            } else {
                $(this).closest('.base-input').removeClass('hasValue');
            }
        });
    });

    $autocompleteInputs.each(function() {
        var input = $(this).find('input');
        var label = $(this).find('label');

        input.on('focus', function() {
            label.addClass('js-focus');
        });

        input.on('blur', function() {
            label.removeClass('js-focus');
        });
    });
})();
