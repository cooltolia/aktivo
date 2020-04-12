(function () {
    const faq = $('.faq');
    if (faq.length === 0) return;

    const faqLinks = $('.faq__questions-link');
    const faqAnswers = $('.faq__answer');

    const content = $('.faq__content');

    let scrollOffset = 0;

    if (window.matchMedia('(max-width: 768px)').matches) {
        scrollOffset = 50;
    } else {
        scrollOffset = 150;
    }

    faqLinks.on('click', function (e) {
        e.preventDefault();
        const link = $(this);

        if (link.hasClass('active')) return;

        const activeAnswer = faqAnswers.filter('.active');
        const activeLink = faqLinks.filter('.active');
        const targetId = link.data('target');
        const targetAnswer = faqAnswers.filter('#' + targetId);

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
