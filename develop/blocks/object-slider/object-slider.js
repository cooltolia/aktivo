(function () {
    const objectSlider = $('.object-slider');
    if (objectSlider.length === 0) return;

    const slider = $('.object-slider__slider');

    slider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
    });

    $('.object-slider__play').modalVideo({
        allowAutoplay: true,
    });
})();
