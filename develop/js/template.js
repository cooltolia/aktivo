/**
 * some global settings and functions
 */
const API = '/app/ajax/';

Inputmask.extendDefinitions({
    f: {
        //masksymbol
        validator: '[0-7|9]',
    },
});
const phoneMask = '+7 (f99) 999-99-99';

const scrollBarWidth = getScrollbarWidth();

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

AOS.init({
    disable: 'mobile',
    once: true,
    duration: 750,
});

$.noConflict();

document.addEventListener('DOMContentLoaded', (e) => {
    document.body.classList.add('js-loaded');
});

jQuery(document).ready(function ($) {
    if (typeof Promise !== 'function') {
        document.createElement('picture');
        loadScript('/js/polyfills/browser.js', globalInitFunction);
        // loadScript('/js/polyfills/browser.js', globalInitFunction);
    } else {
        const start = performance.now();
        globalInitFunction();
        const end = performance.now();

        console.log('globalInitFunction took ' + Math.floor(end - start) + 'ms.');
    }

    function globalInitFunction() {
        //=require helpers.js
        //=require ../blocks/**/*.js
    }

    function loadScript(url, done) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = function () {
            done();
        };
        script.onerror = function () {
            throw new Error('Failed to load script ' + url);
        };
        document.head.appendChild(script);
    }
    // $(window).on('resize', globalInitFunction);
});
