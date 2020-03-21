(function() {
    const indexSlider = $('.index-slider');
    if (indexSlider.length === 0) return;
    
    indexSlider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
    })
})();