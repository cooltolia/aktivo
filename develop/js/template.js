/**
 * some global settings and functions
 */
const API = '/app/ajax/';

$.noConflict();
jQuery(document).ready(function($) {
    $('body').removeClass('pageload');

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
        //=require SimpleSlider.js
        //=require TopScreenSlider.js
        //=require ../blocks/**/*.js
    }

    function loadScript(url, done) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = function() {
            done();
        };
        script.onerror = function() {
            throw new Error('Failed to load script ' + url);
        };
        document.head.appendChild(script);
    }
    // $(window).on('resize', globalInitFunction);
});
