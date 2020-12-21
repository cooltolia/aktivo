{
    const triggerButtons = document.querySelectorAll('.application-trigger');
    if (triggerButtons.length > 0) {
        triggerButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                MicroModal.show('applicationModal', {
                    disableScroll: true,
                    awaitCloseAnimation: true,
                    onShow(modal) {
                        onModalOpen(modal);
                        applicationModalLogic(modal);
                    },
                    onClose(modal) {
                        onModalClose(modal, false);
                    },
                });
            });
        });
    }
}

function applicationModalLogic(modal) {
    const form = modal.querySelector('.modal__form');
    const inputs = form.querySelectorAll('input');
    console.log(inputs);

    const inputEmail = $('#applicationEmail');
    const inputPhone = $('#applicationPhone');
    const phoneMask = '+7 (f99) 999-99-99';
    inputPhone.inputmask({ mask: phoneMask, showMaskOnHover: false });

    function inputPhoneValidate() {
        const enteredPhone = inputPhone.val();
        return Inputmask.isValid(enteredPhone, { mask: phoneMask });
    }

    inputs.forEach((input) => input.addEventListener('focus', () => hideSingleInputError(input)));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!inputPhoneValidate()) {
            showInputError(inputPhone, 'Неверно указан телефон');
            return;
        }

        const formData = $(form).serialize();
        postData('url', formData).then((data) => {
            MicroModal.close('applicationModal');
        });
    });
}

/** code for monitoring-sale-modal */
(function () {
    const modal = document.querySelector('.monitoring-sale-modal');
    const form = modal.querySelector('form');
    if (!modal) return;

    const formatPatterns = {
        amount: wNumb({
            decimals: 5,
            thousand: ' ',
        }),
        price: wNumb({
            decimals: 2,
            thousand: ' ',
        }),
        ruble: wNumb({
            decimals: 2,
            thousand: ' ',
            suffix: ' \u20BD',
        }),
    };

    const $shareAmount = modal.querySelector('#shareAmount');
    const $sharePrice = modal.querySelector('#sharePrice');
    const $shareResult = modal.querySelector('#shareResult');

    $shareAmount.addEventListener('change', (e) => {
        let value = parseFloat(e.target.value);
        if (!value) value = 0;
        value = parseFloat(value.toFixed(5));
        e.target.value = formatPatterns.amount.to(value);
        updateResult();
    });

    $sharePrice.addEventListener('change', (e) => {
        let value = parseFloat(e.target.value);
        if (!value) value = 0;
        value = parseFloat(value.toFixed(2));
        e.target.value = formatPatterns.price.to(value);
        updateResult();
    });

    $shareAmount.value = formatPatterns.amount.to(parseFloat($shareAmount.value));
    $sharePrice.value = formatPatterns.price.to(parseFloat($sharePrice.value));
    $shareResult.textContent = formatPatterns.ruble.to(parseFloat($shareResult.textContent));

    function updateResult() {
        const shareAmount = formatPatterns.amount.from($shareAmount.value);
        const sharePrice = formatPatterns.price.from($sharePrice.value);

        $shareResult.textContent = formatPatterns.ruble.to(shareAmount * sharePrice);
    }

    /** hope this will help */
    form.addEventListener('submit', e => {
        $shareAmount.value = formatPatterns.amount.from($shareAmount.value);
        $sharePrice.value = formatPatterns.price.from($sharePrice.value);
        $shareResult.textContent = formatPatterns.ruble.from($shareResult.textContent);
    })
})();
