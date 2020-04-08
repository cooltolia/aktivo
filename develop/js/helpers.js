$.fancybox.defaults.hash = false;

const debounce = function (func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

const measureScrollbar = function ($) {
    const element = document.createElement('div');
    (element.className = 'modal-scrollbar-measure'), $('body').append(element);
    const scrollBarWidth = element.offsetWidth - element.clientWidth;
    return $('body')[0].removeChild(element), scrollBarWidth;
};

const setCookie = function (key, value, expiry) {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + '=' + value + '; path=/ ;expires=' + expires.toUTCString();
};

Inputmask.extendDefinitions({
    f: {
        //masksymbol
        validator: '[0-7|9]',
    },
});

function hideInputErrors(wrapper) {
    let inputs = wrapper.find('input.error');
    inputs.each(function () {
        $(this).removeClass('error');
        $(this).siblings('.error').slideUp(0);
    });
}

function showInputError(input, text) {
    let inputNode = $(input);
    let errorNode = inputNode.siblings('.error');
    inputNode.addClass('error');
    errorNode.text(text);
    errorNode.slideDown(200);
}

function hideSingleInputError(input) {
    let inputNode = $(input);
    let errorNode = inputNode.siblings('.error');
    inputNode.removeClass('error');
    errorNode.slideUp(200);
}

function postData(
    url,
    formData,
    options = {
        processData: true,
        contentType: 'application/x-www-form-urlencoded',
    }
) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API + url,
            type: 'POST',
            data: formData,
            processData: options.processData,
            contentType: options.contentType,
            success: function (data) {
                const response = safelyParseJSON(data);

                resolve(response);
            },
            error: function (data) {
                reject(data);
            },
        });
    });
}

function createNewEvent(eventName, data) {
    (function () {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined,
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();

    let event = new CustomEvent(eventName, data);
    return event;
}

function scrollTo(element, speed) {
    const scrollSpeed = parseInt(speed) || 300;
    const elementOffset = $(element).offset().top;

    $('html, body').animate(
        {
            scrollTop: elementOffset - 50,
        },
        scrollSpeed
    );
}

function numberWithSpaces(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function loadYandexMap(url) {
    return new Promise((resolve) => {
        var yandexMapUrl = url;
        var yandexMapScript = document.createElement('script');
        yandexMapScript.type = 'text/javascript';
        yandexMapScript.src = yandexMapUrl;
        document.body.appendChild(yandexMapScript);

        yandexMapScript.onload = function () {
            resolve();
        };
    });
}

function addLoadEvent(func) {
    var oldonloadevent = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonloadevent) {
                oldonloadevent();
            }
            setTimeout(() => {
                func();
                // alert('😎');
            }, 3000);
        };
    }
}

function lazyLoadImages(imagesNodes, opts = {}) {
    const options = {
        rootMargin: opts.rootMargin || '0px 0px 100% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0,
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const src = image.getAttribute('data-src');
                        if (!src) return;
                        image.src = src;

                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
        );

        imagesNodes.forEach((image) => observer.observe(image));
    } else {
        imagesNodes.forEach((image) => {
            const src = image.getAttribute('data-src');
            if (!src) return;
            image.src = src;
        });
    }
}

function lazyLoadPictures(imagesContainers, opts = {}) {
    const options = {
        rootMargin: opts.rootMargin || '0px 0px 100% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0,
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const imageContainer = entry.target;
                        const image = imageContainer.querySelectorAll('img, source');

                        image.forEach((img) => {
                            if (img.dataset && img.dataset.src) {
                                img.src = img.dataset.src;
                            }

                            if (img.dataset && img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
        );

        imagesContainers.forEach((container) => observer.observe(container));
    } else {
        imagesContainers.forEach((container) => {
            const image = container.querySelector('img');
            const source = container.querySelector('source');

            image.src = source.dataset.srcset;
        });
    }
}

function forwardingZero(val) {
    return val < 10 ? '0' + val : val;
}

function triggerAnimation(items, opts = {}) {
    const options = {
        rootMargin: opts.rootMargin || '0px 0px -20% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0,
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');

                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: options.rootMargin, root: options.root, threshold: options.threshold }
        );
        items.forEach((item) => observer.observe(item));
    } else {
        setTimeout(() => {
            items.forEach((item) => {
                item.classList.add('animated');
            });
        }, 300);
    }
}

function safelyParseJSON(json) {
    let parsed;

    try {
        parsed = JSON.parse(json);
    } catch (e) {}

    return parsed;
}
