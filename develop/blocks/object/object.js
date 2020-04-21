(function () {
    const object = $('.object');
    if (object.length === 0) return;

    const objectLinks = $('.object__navigation-link');
    const objectAnswers = $('.object__answer');

    const content = $('.object__content');

    let scrollOffset = 0;

    if (window.matchMedia('(max-width: 768px)').matches) {
        scrollOffset = 50;
    } else {
        scrollOffset = 150;
    }

    objectLinks.on('click', function (e) {
        e.preventDefault();
        const link = $(this);

        if (link.hasClass('active')) return;

        const activeAnswer = objectAnswers.filter('.active');
        const activeLink = objectLinks.filter('.active');
        const targetId = link.data('target');
        const targetAnswer = objectAnswers.filter('#' + targetId);

        activeLink.removeClass('active');
        activeAnswer.fadeOut(300, () => {
            activeAnswer.removeClass('active');
            link.addClass('active');

            targetAnswer.addClass('active');
            targetAnswer.fadeIn(300);

            scrollTo(content, 300, scrollOffset);
        });
    });
})();
