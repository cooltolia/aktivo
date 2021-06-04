(function() {
    const bestObjectCards = $('.best-object-card');
    if (bestObjectCards.length === 0) return;

    const rateColors = ['#1cb96f', '#fed63f', '#ffa30c'];

    // bestObjectCards.each((_, card) => {
    //     const rate = parseInt($(card).data('rate'));
    //     const rateNode = $(card).find('.best-object-card__rate');

    //     const stepHeight = 8;

    //     if (rate >= 80) {
    //         rateNode.css('color', rateColors[0]);
    //     } else if (rate < 80 && rate >= 50) {
    //         rateNode.css('color', rateColors[1]);
    //     } else {
    //         rateNode.css('color', rateColors[2]);
    //     }

    //     $(card).css('top', `calc(${100 - rate}% + ${stepHeight}px`);
    // });
})();
