(function () {
    tippy('.page-navigation [data-tippy-content]', {
        placement: 'bottom',
        arrow:
            '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>',
    });

    const navigation = document.querySelector('.page-navigation');
    const navigationScrollWrapper = navigation.querySelector('.page-navigation__wrapper');
    const navList = navigation.querySelector('.page-navigation__list');
    const controls = [...navigation.querySelectorAll('.page-navigation__controls .control-btn')];

    const navLinks = [...navList.querySelectorAll('.page-navigation__link')];

    const navListWidth = navList.getBoundingClientRect().width;
    const navListScrollWidth = navList.scrollWidth;

    const navigationScrollWrapperWidth = navigationScrollWrapper.getBoundingClientRect().width;

    if (navListScrollWidth === navigationScrollWrapperWidth) {
        controls.forEach((control) => (control.style.display = 'none'));
    } else {
        const currentNavLink = getCurrentLink();
        navigationScrollWrapper.scrollLeft = currentNavLink.offsetLeft;
        toggleControlsBtns();
    }

    navigationScrollWrapper.addEventListener('scroll', (e) => {
        toggleControlsBtns();
    });

    controls.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let target;
            if (btn.classList.contains('prev')) {
                target = previousLinkTag();
                const val = target.getBoundingClientRect().width;
                scroll(-val, target);
            } else {
                target = nextLinkTag();
                const val = target.getBoundingClientRect().width;
                scroll(val, target);
            }
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            setActiveNavLink(link);
        });
    });

    function setActiveNavLink(link) {
        resetActiveNavs();
        link.classList.add('active');
        link.classList.add('current');

        if (!elIsVisible(link)) {
            navigationScrollWrapper.scrollLeft = link.offsetLeft;
        }

        toggleControlsBtns(link);
    }

    function scroll(val, target) {
        navigationScrollWrapper.scrollLeft += val;

        navLinks.forEach((link) => link.classList.remove('current'));
        target.classList.add('current');

        // setTimeout(toggleControlsBtns, 300);
        toggleControlsBtns(val);
    }

    function elIsVisible(el) {
        const { left, width } = el.getBoundingClientRect();
        if (left < 0) return false;
        else if (left + width + navigationScrollWrapper.scrollLeft > navListWidth) return false;
        else return true;
    }

    function resetActiveNavs() {
        navLinks.forEach((el) => {
            el.classList.remove('active');
            el.classList.remove('current');
        });
    }

    // function toggleControlsBtns(currentActiveNavLink) {
    //     controls.forEach((el) => el.classList.remove('disabled'));

    //     if (navLinks.indexOf(currentActiveNavLink) === 0) {
    //         controls.find((el) => el.classList.contains('prev')).classList.add('disabled');
    //     } else if (navLinks.indexOf(currentActiveNavLink) === navLinks.length - 1) {
    //         controls.find((el) => el.classList.contains('next')).classList.add('disabled');
    //     }
    // }
    function toggleControlsBtns(val = 0) {
        setTimeout(() => {
            controls.forEach((el) => el.classList.remove('disabled'));

            if (navigationScrollWrapper.scrollLeft > navListScrollWidth - navigationScrollWrapperWidth) {
                controls.find((el) => el.classList.contains('next')).classList.add('disabled');
            } else if (navigationScrollWrapper.scrollLeft <= 0) {
                controls.find((el) => el.classList.contains('prev')).classList.add('disabled');
            }
        }, 300);
    }

    function getCurrentLink() {
        return (
            navigation.querySelector('.page-navigation__link.current') ||
            navigation.querySelector('.page-navigation__link.active')
        );
    }

    function nextLinkTag() {
        const currentLink = getCurrentLink();
        let sibling = currentLink.nextElementSibling;

        while (sibling) {
            if (sibling.matches('.page-navigation__link')) return sibling;
            sibling = sibling.nextElementSibling;
        }
    }

    function previousLinkTag() {
        const currentLink = getCurrentLink();
        let sibling = currentLink.previousElementSibling;

        while (sibling) {
            if (sibling.matches('.page-navigation__link')) return sibling;
            sibling = sibling.nextElementSibling;
        }
    }
})();
