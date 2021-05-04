(function () {
    tippy('.page-navigation [data-tippy-content]', {
        placement: 'bottom',
        arrow:
            '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>',
    });

    const fontObserver = new FontFaceObserver('Montserrat', {
        weight: 400,
    });

    fontObserver.load().then(function () {
        init();
    });

    function init() {
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

        const debouncedScrollEvent = debounce(toggleControlsBtns, 100);
        navigationScrollWrapper.addEventListener('scroll', debouncedScrollEvent);

        navLinksObserver(navLinks);

        controls.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let target;
                if (btn.classList.contains('prev')) {
                    // target = previousLinkTag();
                    target = previousHiddenLinkTag()
                    if (!target) {
                        navigationScrollWrapper.scrollLeft = 0;
                        return;
                    }
                    // console.log(target);
                    // console.log(elIsVisible(target));
                    // if (elIsVisible(target)) {
                    //     console.log('pff');
                    // }
                    const val = target.offsetLeft;
                    scroll(val, target);
                } else {
                    target = nextLinkTag();
                    if (!target) {
                        navigationScrollWrapper.scrollLeft = navListScrollWidth;
                        return;
                    }
                    if (elIsVisible(target)) {
                        console.log('pff');
                    }
                    const val = target.offsetLeft;
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
            console.log('elIsVisible', link, elIsVisible(link));

            if (!elIsVisible(link)) {
                navigationScrollWrapper.scrollLeft = link.offsetLeft;
            }

            toggleControlsBtns(link);
        }

        function scroll(val, target) {
            navigationScrollWrapper.scrollLeft = val;

            navLinks.forEach((link) => link.classList.remove('current'));
            target.classList.add('current');

            // setTimeout(toggleControlsBtns, 300);
            toggleControlsBtns(val);
        }

        function elIsVisible(el) {
            if (!el) return;

            debugger;

            const left = el.offsetLeft;
            const { width } = el.getBoundingClientRect();
            const scrollLeft = Math.round(navigationScrollWrapper.scrollLeft);

            if (left === scrollLeft) return true;
            if (left < scrollLeft) return false;
            else if (left - scrollLeft > navListWidth - width) return false;
            else return true;
        }

        function resetActiveNavs() {
            navLinks.forEach((el) => {
                el.classList.remove('active');
                el.classList.remove('current');
            });
        }

        function toggleControlsBtns(val = 0) {
            controls.forEach((el) => el.classList.remove('disabled'));
            const scrollLeft = Math.round(navigationScrollWrapper.scrollLeft);

            if (scrollLeft >= navListScrollWidth - navigationScrollWrapperWidth) {
                controls.find((el) => el.classList.contains('next')).classList.add('disabled');
            } else if (scrollLeft <= 0) {
                controls.find((el) => el.classList.contains('prev')).classList.add('disabled');
            }
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
                sibling = sibling.previousElementSibling;
            }
        }

        function previousHiddenLinkTag() {
            const currentLink = getCurrentLink();
            let sibling = currentLink.previousElementSibling;

            while (sibling) {
                console.log(sibling, elIsVisible(sibling));
                if (sibling.matches('.page-navigation__link') && !elIsVisible(sibling)) return sibling;
                sibling = sibling.previousElementSibling;
            }
        }

        function navLinksObserver(links) {
            links.forEach((link) => {
                link.addEventListener('linkChanged', (e) => {
                    debugger;
                    setActiveNavLink(link);
                });
            });
        }
    }
})();
