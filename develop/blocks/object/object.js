(function () {
    const object = $('.object');
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

        objectLinks.removeClass('active');
        link.addClass('active');
    });
})();
