(function () {
    const aboutTeamSlider = $('.about-team__slider');
    if (aboutTeamSlider.length === 0) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    aboutTeamSlider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true,
        // variableWidth: true
    });
})();
