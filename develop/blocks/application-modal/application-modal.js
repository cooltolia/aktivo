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
        postData('url', formData).then(data => {
            MicroModal.close('applicationModal');
        })
    });
}
