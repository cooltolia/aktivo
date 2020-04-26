(function () {
    const objectPlans = $('.object-plans');
    if (objectPlans.length === 0) return;

    const slider = $('.object-plans__slider');

    slider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
    });
})();
