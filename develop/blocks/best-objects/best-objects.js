(function () {
    const bestObjects = $('.best-objects');
    if (bestObjects.length === 0) return;

    const sliderWrapper = $('.best-objects__objects');

    sliderWrapper.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        mobileFirst: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2.25,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    });
})();
