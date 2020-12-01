(function () {
    const partnerFriends = document.querySelector('.partner-friends');
    if (!partnerFriends) return;

    const headers = partnerFriends.querySelectorAll('.partner-friends__header');
    headers.forEach((header) => {
        header.addEventListener('click', (e) => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            header.parentElement.classList.toggle('active');

            $(content).slideToggle(200);
        });
    });
})();
