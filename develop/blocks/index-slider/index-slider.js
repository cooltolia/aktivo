(function() {
    const indexSlider = $('.index-slider, .index-bottom__slider');
    if (indexSlider.length === 0) return;

    indexSlider.each((_, slider) => {
        $(slider).slick({
            rows: 0,
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: true,
        });
    });
})();
