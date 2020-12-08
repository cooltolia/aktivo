(function () {
    const btn = $('.authorization__toggle');
    const btnAccount = $('.authorization__logged');
    const btnAccountMenu = $('.authorization__list');
    btnAccount.on('click', function () {
        btn.toggleClass('active');

        if (btnAccountMenu.hasClass('active')) {
            btnAccountMenu.slideUp();
            btnAccountMenu.removeClass('active');
        } else {
            btnAccountMenu.slideDown();
            btnAccountMenu.addClass('active');
        }
    });

    const settingsTriggers = document.querySelectorAll('.authorization__settings');
    settingsTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            MicroModal.show('accountSettingsModal', {
                disableScroll: true,
                disableFocus: true,
                awaitCloseAnimation: true,
                onShow(modal) {
                    onModalOpen(modal);
                    accountSettingsModalLogic(modal);
                },
                onClose(modal) {
                    onModalClose(modal, false);
                },
            });
        });
    });

    const feedbackTriggers = document.querySelectorAll('.feedback-trigger');
    feedbackTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            MicroModal.show('accountFeedbackModal', {
                disableScroll: true,
                disableFocus: true,
                awaitCloseAnimation: true,
                onShow(modal) {
                    onModalOpen(modal);
                },
                onClose(modal) {
                    onModalClose(modal, false);
                },
            });
        });
    });

    
})();
