(function () {
    const projectSelects = $('.project-select');

    const options = $('.project-select__option');

    const taxTypeSelects = projectSelects.filter('[data-type="taxType"]')

    projectSelects.on('click', function (e) {
        e.stopPropagation();

        const optionsWrap = $(this).find('.project-select__options');

        showSelect(this, optionsWrap);
    });

    options.on('click', function (e) {
        e.stopPropagation();

        const val = $(this).html();
        const parentSelect = $(this).parents('.project-select');

        const optionsWrap = parentSelect.find('.project-select__options');
        const selected = parentSelect.find('.project-select__selected');
        const input = parentSelect.find('.project-select__input');

        selected.html(val);
        input.val(val);

        input.trigger('change')

        if (parentSelect.attr('id') === 'ownerType') {
            const type =  $(this).attr('data-type');
            taxTypeSelects.each((_, select) => {
                const input = $(select).find('.project-select__input');
                const selected = $(select).find('.project-select__selected');
                const options = $(select).find('.project-select__option')
                debugger;
                if (type === '1') {
                    input.val(options[0].textContent);
                    selected.text(options[0].textContent);
                } else {
                    input.val(options[1].textContent);
                    selected.text(options[1].textContent);
                }
            })
        }

        hideSelect(parentSelect, optionsWrap);
    });

    $(document).on('click', function () {
        hideActiveSelects();
    });

    function showSelect(select, optionsWrap) {
        hideActiveSelects();

        $(select).addClass('active');
        optionsWrap.fadeIn(300);
    }

    function hideSelect(select, optionsWrap) {
        $(select).removeClass('active');
        optionsWrap.fadeOut(300);
    }

    function hideActiveSelects() {
        const activeSelects = projectSelects.filter('.active');
        if (activeSelects.length === 0) return;
        activeSelects.each((_, select) => {
            const options = $(select).find('.project-select__options');

            $(select).removeClass('active');
            options.fadeOut(300);
        });
    }
})();
