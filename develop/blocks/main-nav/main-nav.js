(function() {
    const subNavLinks = $('.main-nav__link.has-subnav');
    subNavLinks.on('click', function(e) {
        e.preventDefault();

        const subnav = $(this).next();
        subnav.slideToggle(300)
    })
})()