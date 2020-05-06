(function() {
    const partnersWrapper = document.querySelector('.partners-wrapper');
    if (!partnersWrapper) return;

    const stepsIcons = [...document.querySelectorAll('.partners-wrapper__step')];
    const step1 = document.querySelector('.partners-choice');
    const step2 = document.querySelector('.partners-status');
    const step3 = document.querySelector('.partners-income');
    const obserevedSteps = [step1, step2, step3];

    changeStepNumber();

    stepsIcons[0].classList.add('active')

    function changeStepNumber() {
        const options = {
            rootMargin: '0px 0px -90% 0px',
            root: null,
            threshold: 0,
        };

        let previousY = 0;
        let previousRatio = 0;

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        const isIntersecting = entry.isIntersecting;
                        if (isIntersecting) {
                            const targetIndex = obserevedSteps.indexOf(entry.target);
                            const currentStep = stepsIcons.find(step => step.classList.contains('active'));
                            const currentStepIndex = stepsIcons.indexOf(currentStep);
                            const targetStepIcon = stepsIcons[targetIndex];

                            if (currentStepIndex === targetIndex) return;

                            currentStep.classList.remove('active');
                            targetStepIcon.classList.add('active');
                        }
                    });
                },
                { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
            );
            obserevedSteps.forEach(step => observer.observe(step));
        } else {
            setTimeout(() => {
                items.forEach(item => {
                    item.classList.add('animated');
                });
            }, 300);
        }
    }
})();
