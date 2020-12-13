(function () {
    const steps = document.querySelector('.monitoring-steps');
    if (!steps) return;

    const container = steps.querySelector('.monitoring-steps__container');
    new SimpleBar(container, {
        autoHide: false,
    });
})();
