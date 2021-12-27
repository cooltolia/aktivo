(function () {
    const cookiesAlert = document.querySelector('.cookies-alert');
    if (!cookiesAlert) return;

    // const acceptCookies = document.querySelector('.cookies-alert__accept');
    const acceptCookies = document.querySelectorAll('.cookies-alert__close, .cookies-alert__accept');

    setTimeout(() => {
        cookiesAlert.classList.add('active');
    }, 2000);

    acceptCookies.forEach(el => {
      el.addEventListener('click', () => {
        cookiesAlert.classList.remove('active');

        setCookie('cookie', true, 91);

        setTimeout(() => {
            cookiesAlert.remove();
        }, 500);
    });
    })
})();
