function onModalOpen(modal) {
    modal.children[0].style.paddingRight = scrollBarWidth + 'px';
    document.body.style.paddingRight = scrollBarWidth + 'px';
}

function onModalClose(modal, remove = false) {
    modal.children[0].style.paddingRight = '';
    document.body.style.paddingRight = '';

    let focusedElement = document.activeElement;
    if (focusedElement && focusedElement.focus) {
        focusedElement.blur();
    }

    if (remove) {
        modal.addEventListener('animationend', function removeModal() {
            this.remove();
            this.removeEventListener('animationend', removeModal);
        });
    }
}
