(function () {
    const object = $('.object');
    if (object.length === 0) return;

    const objectLinks = $('.object__navigation-link');

    tippy('.object__navigation-link[data-tippy-content]', {
        placement: 'bottom',
        arrow:
            '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>',
    });

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
})();
