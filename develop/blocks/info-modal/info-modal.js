{
    const triggerButtons = document.querySelectorAll('.info-trigger');
    console.log(triggerButtons);
    if (triggerButtons.length > 0) {
        triggerButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                MicroModal.show('infoModal', {
                    disableScroll: true,
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
    }
}