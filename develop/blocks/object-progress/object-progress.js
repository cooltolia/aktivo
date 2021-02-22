(function () {
    const progressBars = document.querySelectorAll('.object-progress');
    if (progressBars.length === 0) return;

    progressBars.forEach((el) => {
        const bar = el.querySelector('.object-progress__bar');
        const label = el.querySelector('.object-progress__label');

        const widths = {
            el: el.getBoundingClientRect().width,
            bar: bar.getBoundingClientRect().width,
            label: label.getBoundingClientRect().width,
        };

        const rightEmptySpace = widths.el - widths.bar;

        // if (widths.bar < widths.label) {
        //     label.style.left = widths.bar + 'px';
        // } else {
        //     label.style.right = widths.el - widths.bar + 'px';
        // }

        if (widths.label < rightEmptySpace) {
            label.style.left = widths.bar + 'px';
        } else {
            label.style.right = rightEmptySpace + 'px'
        }
    });
})();
