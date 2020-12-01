(function() {
    const partnerLinks = document.querySelector('.partner-links');
    if (!partnerLinks) return;

    const copyBtns = partnerLinks.querySelectorAll('.copy');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();

            const input = btn.previousElementSibling;
            input.disabled = false;
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
            input.disabled = true;
        })
    })

    const headers = partnerLinks.querySelectorAll('.partner-links__header');
    headers.forEach(header => {
        header.addEventListener('click', e => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            header.parentElement.classList.toggle('active');

            $(content).slideToggle(200);
        })
    })
})();