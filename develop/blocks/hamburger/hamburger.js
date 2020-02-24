(function() {
    var $mainNav = $('.main-header__navigation');

    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $mainNav.toggleClass('active');
        $('body').toggleClass('menu-opened');
    });
})();
