(function () {
    const accountNav = document.querySelector('.account-nav');
    if (!accountNav) return;

    if (window.matchMedia('(max-width: 1199px)').matches) {
        const navList = accountNav.querySelector('.account-nav__list');
        const activeNavLink = accountNav.querySelector('.account-nav__link.active');
        const navItems = [...navList.children];
        let navItemsLength = 0;

        navItems.forEach((item) => {
            navItemsLength += item.getBoundingClientRect().width;
        });

        const $navList = $(navList);
        if (navItemsLength > navList.clientWidth + 1) {
            $navList.slick({
                dots: false,
                rows: 0,
                arrows: false,
                infinite: false,
                variableWidth: true,
                touchThreshold: 10,
                speed: 200,
                swipeToSlide: true
                // edgeFriction: 1,
            });

            if (activeNavLink) {
                const parentSlide = activeNavLink.parentNode;
                const index = [...$navList.slick('getSlick').$slides].indexOf(parentSlide);
                $navList.slick('slickGoTo', index);
            }
        } else {
            accountNav.classList.add('full')
        }
    }
})();
