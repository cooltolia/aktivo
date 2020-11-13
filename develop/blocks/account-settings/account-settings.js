function accountSettingsModalLogic(modal) {
    const form = modal.querySelector('.account-settings__form');
    const inputs = form.querySelectorAll('input');

    const inputEmail = $('#settingsEmail');
    const inputPhone = $('#settingsPhone');
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
            MicroModal.close('accountSettingsModal');
        })
    });
}
