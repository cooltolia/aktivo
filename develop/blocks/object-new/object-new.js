(function () {
    const object = $('.object-new');
    if (object.length === 0) return;

    const objectLinks = $('.object__navigation-link');

    const objectSections = document.querySelectorAll('.object__section');

    if (window.matchMedia('(min-width: 768px)').matches) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        objectLinks.removeClass('active');
                        const sectionId = entry.target.id;
                        if (!sectionId) return;
                        const relatedLink = objectLinks.filter(`[data-scroll-to=${sectionId}]`);
                        relatedLink.addClass('active');
                    }
                });
            },
            { rootMargin: '-50% 0% -50% 0%', root: null }
        );

        objectSections.forEach((section) => observer.observe(section));
    }

    objectLinks.on('click', function (e) {
        e.preventDefault();
        const link = $(this);

        if (link.hasClass('locked')) return;

        objectLinks.removeClass('active');
        link.addClass('active');
    });

    const navigation = document.querySelector('.object-new__navigation');
    if (window.matchMedia('(max-width: 1199px)').matches) {
        const navList = navigation.querySelector('.object-new__navigation-list');
        const activeNavLink = navigation.querySelector('.object-new__navigation-link.active');
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
                swipeToSlide: true,
                // edgeFriction: 1,
            });

            if (activeNavLink) {
                const parentSlide = activeNavLink.parentNode;
                const index = [...$navList.slick('getSlick').$slides].indexOf(parentSlide);
                $navList.slick('slickGoTo', index);
            }
        } else {
            navigation.classList.add('full');
        }
    }
})();
