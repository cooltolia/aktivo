(function () {
    tippy('.object-card .tooltip', {
        placement: 'bottom',
        arrow:
            '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>',
    });

    $('.object-card__play').modalVideo();
})();
