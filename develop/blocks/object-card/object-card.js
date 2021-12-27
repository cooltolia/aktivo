(function () {
    tippy('.object-card .tooltip', {
        placement: 'bottom',
        arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>',
    });

    $('.object-card__play').modalVideo({
        allowAutoplay: true,
    });

    const reserveForms = document.querySelectorAll('.object-card__reserve');
    reserveForms.forEach((form) => {
        const price = parseInt(form.dataset.price);
        const shareInput = form.querySelector('[data-id="reserveShare"]');
        const sumInput = form.querySelector('[data-id="reserveSum"]');

        updateSumInput(shareInput, sumInput, price);

        shareInput.addEventListener('input', function (e) {
            updateSumInput(shareInput, sumInput, price);
        });
    });

    function updateSumInput(shareInput, sumInput, price) {
        sumInput.value = (+shareInput.value * price).toLocaleString();
    }
})();
