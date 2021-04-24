(function () {
    const object = $('.object-new');
    if (object.length === 0) return;

    const objectLinks = object.find('.page-navigation__link');

    const objectSections = document.querySelectorAll('.object-new__section');

    const linkChangedEvent = createNewEvent('linkChanged');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    objectLinks.removeClass('active');
                    const sectionId = entry.target.id;
                    if (!sectionId) return;
                    const relatedLink = objectLinks.filter(`[data-scroll-to=${sectionId}]`);
                    if (relatedLink[0]) {
                        relatedLink.addClass('active');
                        relatedLink[0].dispatchEvent(linkChangedEvent);
                    }
                }
            });
        },
        { rootMargin: '-50% 0% -50% 0%', root: null }
    );

    objectSections.forEach((section) => observer.observe(section));

    objectLinks.on('click', function (e) {
        e.preventDefault();
        const link = $(this);

        if (link.hasClass('locked')) return;

        objectLinks.removeClass('active');
        link.addClass('active');
    });
})();
