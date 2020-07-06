(function() {
    const $mainNav = $('.main-header__navigation');
    const $alertBanner = $('.alert-banner');

    let topPosition = $alertBanner.length > 0 ? $alertBanner.height() + 75 : 75;
    $mainNav.css('top', topPosition + 'px') 


    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $mainNav.toggleClass('active');
        $('body').toggleClass('menu-opened');
    });
})();
