"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * some global settings and functions
 */
var API = '/app/ajax/';
$.noConflict();
jQuery(document).ready(function ($) {
  $('body').removeClass('pageload');

  if (typeof Promise !== 'function') {
    document.createElement('picture');
    loadScript('/js/polyfills/browser.js', globalInitFunction); // loadScript('/js/polyfills/browser.js', globalInitFunction);
  } else {
    var start = performance.now();
    globalInitFunction();
    var end = performance.now();
    console.log('globalInitFunction took ' + Math.floor(end - start) + 'ms.');
  }

  function globalInitFunction() {
    $.fancybox.defaults.hash = false;

    var debounce = function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var context = this,
            args = arguments;

        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    var throttle = function throttle(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};

      var later = function later() {
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

    var measureScrollbar = function measureScrollbar($) {
      var element = document.createElement('div');
      element.className = 'modal-scrollbar-measure', $('body').append(element);
      var scrollBarWidth = element.offsetWidth - element.clientWidth;
      return $('body')[0].removeChild(element), scrollBarWidth;
    };

    var setCookie = function setCookie(key, value, expiry) {
      var expires = new Date();
      expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
      document.cookie = key + '=' + value + '; path=/ ;expires=' + expires.toUTCString();
    };

    Inputmask.extendDefinitions({
      f: {
        //masksymbol
        validator: '[0-7|9]'
      }
    });

    function hideInputErrors(modal) {
      var inputs = modal.find('input.js-error');
      inputs.each(function () {
        $(this).removeClass('js-error');
        $(this).siblings('.custom-input__error').slideUp(0);
      });
    }

    function showInputError(input, text) {
      var inputNode = $(input);
      var errorNode = inputNode.siblings('.custom-input__error');
      inputNode.addClass('js-error');
      errorNode.text(text);
      errorNode.slideDown(200);
    }

    function hideSingleInputError(input) {
      var inputNode = $(input);
      var errorNode = inputNode.siblings('.custom-input__error');
      inputNode.removeClass('js-error');
      errorNode.slideUp(200);
    }

    function postData(url, formData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        processData: true,
        contentType: 'application/x-www-form-urlencoded'
      };
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: API + url,
          type: 'POST',
          data: formData,
          processData: options.processData,
          contentType: options.contentType,
          success: function success(data) {
            var response = function (raw) {
              try {
                return JSON.parse(raw);
              } catch (err) {
                return false;
              }
            }(data);

            resolve(response);
          },
          error: function error(data) {
            reject(data);
          }
        });
      });
    }

    function productLike(e) {
      var _this = this;

      var target = e.currentTarget;
      var productId = $(this).data('like');
      var formData = 'id=' + productId;
      var favoritesCounter = $('.main-header__favourites .number');
      var newTippy = tippy(target, {
        content: 'Добавлено в <a href="/favourites/">избранное</a>',
        placement: 'top',
        trigger: 'manual',
        arrow: true,
        theme: 'norman-tooltip',
        interactive: true // hideOnClick: false

      });
      var tippyInstance = target._tippy;

      if (!$(this).hasClass('active')) {
        tippyInstance.show();
        setTimeout(function () {
          tippyInstance.hide();
        }, 2000);
      }

      $(this).attr('disabled', true);
      /** find others cards with the same id */

      var sameProductCards = $('[data-like="' + productId + '"]');
      sameProductCards.toggleClass('active');
      postData('user/favorites.php', formData).then(function (res) {
        $(_this).attr('disabled', false);
        var favorites = parseInt(res.favorites) > 0 ? res.favorites : '';
        favoritesCounter.text(favorites);
      }, function (rej) {
        console.error(rej);
        $(_this).attr('disabled', false);
      });
    }

    function createNewEvent(eventName, data) {
      (function () {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent(event, params) {
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
          };
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
      })();

      var event = new CustomEvent(eventName, data);
      return event;
    }

    function scrollTo(element, speed) {
      var scrollSpeed = parseInt(speed) || 300;
      var elementOffset = $(element).offset().top;
      $('html, body').animate({
        scrollTop: elementOffset - 50
      }, scrollSpeed);
    }

    function getCities(currentValue) {
      return new Promise(function (resolve) {
        $.get(API + 'user/search_city.php?city=' + currentValue).then(function (res) {
          var listItems = JSON.parse(res);
          resolve(listItems);
        }).catch(function (err) {
          console.log(err.statusText);
        });
      });
    }

    function loadModal(endPoint) {
      return new Promise(function (resolve) {
        $.get(API + endPoint).then(function (response) {
          var data = JSON.parse(response);
          resolve(data);
        }, function (e) {
          throw new Error(e);
        });
      });
    }

    function numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function loadYandexMap(url) {
      return new Promise(function (resolve) {
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

          setTimeout(function () {
            func(); // alert('😎');
          }, 3000);
        };
      }
    }

    function lazyLoadImages(imagesNodes) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = {
        rootMargin: opts.rootMargin || '0px 0px 100% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0
      };

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              var src = image.getAttribute('data-src');
              if (!src) return;
              image.src = src;
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: options.rootMargin,
          root: options.root,
          threshold: options.threshold
        });
        imagesNodes.forEach(function (image) {
          return observer.observe(image);
        });
      } else {
        imagesNodes.forEach(function (image) {
          var src = image.getAttribute('data-src');
          if (!src) return;
          image.src = src;
        });
      }
    }

    function lazyLoadPictures(imagesContainers) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = {
        rootMargin: opts.rootMargin || '0px 0px 100% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0
      };

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var imageContainer = entry.target;
              var image = imageContainer.querySelectorAll('img, source');
              image.forEach(function (img) {
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
        }, {
          rootMargin: options.rootMargin,
          root: options.root,
          threshold: options.threshold
        });
        imagesContainers.forEach(function (container) {
          return observer.observe(container);
        });
      } else {
        imagesContainers.forEach(function (container) {
          var image = container.querySelector('img');
          var source = container.querySelector('source');
          image.src = source.dataset.srcset;
        });
      }
    }

    function forwardingZero(val) {
      return val < 10 ? '0' + val : val;
    }
    /** @param -- jQuery node object */


    function observeVideo(video) {
      var observerOptions = {
        rootMargin: '0px',
        threshold: 0
      };

      var observerCallback = function observerCallback(entries, observer) {
        if (!entries[0].isIntersecting && !video[0].paused) {
          if (!document.pictureInPictureEnabled) {
            console.log('picture-in-picture is not supported in this browser');
          }

          if (document.pictureInPictureElement) {
            document.exitPictureInPicture().then(function () {
              observer.unobserve(video[0]);
            });
          } else {
            video[0].requestPictureInPicture();
          }
        } else if (entries[0].isIntersecting && document.pictureInPictureElement) {
          document.exitPictureInPicture().then(function () {
            observer.unobserve(video[0]);
          });
        }
      };

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(video[0]);
      }
    }

    function triggerAnimation(items) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = {
        rootMargin: opts.rootMargin || '0px 0px -20% 0px',
        root: opts.root || null,
        threshold: opts.threshold || 0
      };

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: options.rootMargin,
          root: options.root,
          threshold: options.threshold
        });
        items.forEach(function (item) {
          return observer.observe(item);
        });
      } else {
        setTimeout(function () {
          items.forEach(function (item) {
            item.classList.add('animated');
          });
        }, 300);
      }
    }

    function inlineVideoLogic() {
      var clickedBnt = $(this);
      var video = clickedBnt.next();
      var wrapper = clickedBnt.parent();
      clickedBnt.fadeOut(300);
      wrapper.addClass('playing');
      video.addClass('active');
      video[0].play();
      video.on('ended', function () {
        wrapper.removeClass('playing');
        video.removeClass('active');
        clickedBnt.fadeIn(300);
      });
      video[0].addEventListener('leavepictureinpicture', function (event) {
        wrapper.removeClass('playing');
        video.removeClass('active');
        clickedBnt.fadeIn(300);
        video[0].pause();
      });
      observeVideo(video);
    }

    (function () {
      var btn = $('.authorization__toggle');
      var btnAccount = $('.authorization__logged');
      var btnAccountMenu = $('.authorization__list');
      btnAccount.on('click', function () {
        btn.toggleClass('active');

        if (btnAccountMenu.hasClass('active')) {
          btnAccountMenu.slideUp();
          btnAccountMenu.removeClass('active');
        } else {
          btnAccountMenu.slideDown();
          btnAccountMenu.addClass('active');
        }
      });
    })();

    (function () {
      var $inputs = $('.base-input__input');
      var $autocompleteInputs = $('.base-input-autocomplete');
      $inputs.each(function () {
        if ($(this).val().trim() !== '') {
          $(this).addClass('hasValue');
        }

        $(this).on('blur', function () {
          if ($(this).val().trim() !== '') {
            $(this).addClass('hasValue');
          } else {
            $(this).removeClass('hasValue');
          }
        });
      });
      $autocompleteInputs.each(function () {
        var input = $(this).find('input');
        var label = $(this).find('label');
        input.on('focus', function () {
          label.addClass('js-focus');
        });
        input.on('blur', function () {
          label.removeClass('js-focus');
        });
      });
    })();

    (function () {
      var $select = $('.base-select__input');
      var $options = $('.base-select__options-list');
      var $optionsItem = $('.base-select__options-item');
      if ($select.length == 0) return;

      if ($select.val().trim() !== '') {
        $select.addClass('hasValue');
      }

      $select.on('blur', function () {
        if ($select.val().trim() !== '') {
          $select.addClass('hasValue');
        } else {
          $select.removeClass('hasValue');
        }
      });
      $select.on('click', function () {
        $select.parent().addClass('active');
        $options.slideDown();
      });
      $(document).on('click', function (e) {
        if ($select.parent().hasClass('active') && e.target !== $select && $select.parent().has(e.target).length === 0) {
          $select.parent().removeClass('active');
          $options.slideUp();
        }
      });
      $optionsItem.each(function () {
        $(this).on('click', function (e) {
          var text = $(this).text();
          $select.val(text);
          $select.addClass('hasValue');
          $select.parent().removeClass('active');
          $options.slideUp();
        });
      });
    })();

    (function () {
      var bestObjectCards = $('.best-object-card');
      if (bestObjectCards.length === 0) return;
      var rateColors = ['#1cb96f', '#fed63f', '#ffa30c'];
      bestObjectCards.each(function (_, card) {
        var rate = parseInt($(card).data('rate'));
        var rateNode = $(card).find('.best-object-card__rate');
        var stepHeight = 8;

        if (rate >= 80) {
          rateNode.css('color', rateColors[0]);
        } else if (rate < 80 && rate >= 50) {
          rateNode.css('color', rateColors[1]);
        } else {
          rateNode.css('color', rateColors[2]);
        }

        $(card).css('top', "calc(".concat(100 - rate, "% + ").concat(stepHeight, "px"));
      });
    })();

    (function () {
      var $mainNav = $('.main-header__navigation');
      $('.hamburger').click(function () {
        $(this).toggleClass('active');
        $mainNav.toggleClass('active');
        $('body').toggleClass('menu-opened');
      });
    })();

    (function () {
      var indexSlider = $('.index-slider, .index-bottom__slider');
      if (indexSlider.length === 0) return;
      indexSlider.each(function (_, slider) {
        $(slider).slick({
          rows: 0,
          slidesToScroll: 1,
          slidesToShow: 1,
          arrows: true
        });
      });
    })();

    (function () {
      var subNavLinks = $('.main-nav__link.has-subnav');

      if (window.matchMedia('(max-width: 1024px)').matches) {
        subNavLinks.on('click', function (e) {
          e.preventDefault();
          var subnav = $(this).next();
          subnav.slideToggle(300);
        });
      }
    })();

    (function () {
      var partnersWrapper = document.querySelector('.partners-wrapper');
      if (!partnersWrapper) return;

      var stepsIcons = _toConsumableArray(document.querySelectorAll('.partners-wrapper__step'));

      var step1 = document.querySelector('.partners-choice');
      var step2 = document.querySelector('.partners-status');
      var step3 = document.querySelector('.partners-income');
      var obserevedSteps = [step1, step2, step3];
      changeStepNumber();

      function changeStepNumber() {
        var options = {
          rootMargin: '0px 0px -90% 0px',
          root: null,
          threshold: 0
        };
        var previousY = 0;
        var previousRatio = 0;

        if ('IntersectionObserver' in window) {
          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              var isIntersecting = entry.isIntersecting;

              if (isIntersecting) {
                var targetIndex = obserevedSteps.indexOf(entry.target);
                var currentStep = stepsIcons.find(function (step) {
                  return step.classList.contains('active');
                });
                var currentStepIndex = stepsIcons.indexOf(currentStep);
                if (currentStepIndex === targetIndex) return;
                currentStep.classList.remove('active');
                var targetStepIcon = stepsIcons[targetIndex];
                targetStepIcon.classList.add('active');
              }
            });
          }, {
            rootMargin: options.rootMargin,
            root: options.root,
            threshold: options.threshold
          });
          obserevedSteps.forEach(function (step) {
            return observer.observe(step);
          });
        } else {
          setTimeout(function () {
            items.forEach(function (item) {
              item.classList.add('animated');
            });
          }, 300);
        }
      }
    })();

    (function () {
      var profitCalc = document.querySelector('.profit-calc');
      if (!profitCalc) return;
      var investmentRangeSlider = document.querySelector('.profit-calc__investment-range');
      var invsestmentValue = document.querySelector('.profit-calc__investment-value');
      var incomeRangeSlider = document.querySelector('.profit-calc__income-range');
      var format = wNumb({
        decimals: 0,
        suffix: " \u20BD",
        thousand: ' '
      });
      var objectsNav = $('.profit-calc__objects-nav');
      var objectsSlider = $('.profit-calc__objects-slider');
      var initialValue = 1000000;
      initRangeSlider();
      /** init and interact with sliders */

      objectsSlider.on('init', function (e, slick) {
        var currentSlide = $(slick.$slides[slick.currentSlide]);
        var object = $(currentSlide.children()[0]);
        updateObjectData(object, initialValue);
      });
      objectsSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        if (currentSlide === nextSlide) return;
        var slide = $(slick.$slides[nextSlide]);
        var object = $(slide.children()[0]);
        var minValue = object.data('min');
        var maxValue = object.data('max');
        var stepValue = object.data('step');
        var rate = object.find('.profit-object__rate').data('rate');
        var currentRangeValue = parseInt(investmentRangeSlider.noUiSlider.get());
        var startValue = maxValue < currentRangeValue ? maxValue : currentRangeValue;
        investmentRangeSlider.noUiSlider.updateOptions({
          start: startValue,
          step: stepValue,
          range: {
            min: minValue,
            max: maxValue
          }
        });
        var incomeMinValue = minValue * rate / 100;
        var incomeMaxValue = maxValue * rate / 100;
        var incomeInitialValue = startValue * rate / 100;
        var incomeStepValue = stepValue * rate / 100;
        incomeRangeSlider.noUiSlider.updateOptions({
          start: incomeInitialValue,
          step: incomeStepValue,
          range: {
            min: incomeMinValue,
            max: incomeMaxValue
          }
        });
        animateRangeSlider();
        updateObjectData(object, startValue);
      });
      objectsNav.slick({
        rows: 0,
        slidesToScroll: 1,
        variableWidth: true,
        asNavFor: objectsSlider,
        arrows: false,
        focusOnSelect: true
      });
      objectsSlider.slick({
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: objectsNav
      });
      /**
       * interactions with range slider
       */

      investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        invsestmentValue.textContent = format.to(+values[handle]);
        var currentSlide = objectsSlider.find('.slick-current');
        var object = $(currentSlide.children()[0]);
        updateObjectData(object, values[handle]);
        incomeRangeSliderUpdate(object, values[handle]);
      });
      incomeRangeSlider.noUiSlider.on('slide', function (values, handle) {
        var currentSlide = objectsSlider.find('.slick-current');
        var object = $(currentSlide.children()[0]);
        investmentRangeSliderUpdate(object, values[handle]);
      });
      investmentRangeSlider.noUiSlider.on('change', function () {
        animateRangeSlider();
      });
      incomeRangeSlider.noUiSlider.on('change', function () {
        animateRangeSlider();
      }); // helper functions

      function initRangeSlider() {
        var firstObject = $($(profitCalc).find('.profit-object')[0]);
        var minValue = firstObject.data('min');
        var maxValue = firstObject.data('max');
        var stepValue = firstObject.data('step');
        var rate = firstObject.find('.profit-object__rate').data('rate');
        noUiSlider.create(investmentRangeSlider, {
          start: initialValue,
          step: stepValue,
          animate: false,
          connect: 'lower',
          range: {
            min: minValue,
            max: maxValue
          }
        });
        updateObjectData(firstObject, initialValue);
        incomeRangeSliderInit(minValue, maxValue, stepValue, initialValue, rate);
      }

      function incomeRangeSliderInit(min, max, step, initial, rate) {
        var minValue = min * rate / 100;
        var maxValue = max * rate / 100;
        var initialValue = initial * rate / 100;
        var stepValue = step * rate / 100;
        noUiSlider.create(incomeRangeSlider, {
          start: initialValue,
          step: stepValue,
          animate: false,
          range: {
            min: minValue,
            max: maxValue
          }
        });
      }

      function incomeRangeSliderUpdate(object, value) {
        var rate = object.find('.profit-object__rate').data('rate');
        incomeRangeSlider.noUiSlider.set(value * rate / 100);
      }

      function investmentRangeSliderUpdate(object, value) {
        var rate = object.find('.profit-object__rate').data('rate');
        investmentRangeSlider.noUiSlider.set(value / rate * 100);
      }

      function updateObjectData(object, value) {
        var income = object.find('.profit-object__income');
        var share = object.find('.profit-object__share');
        var rate = object.find('.profit-object__rate').data('rate');
        var step = object.data('step');
        share.text(Math.floor(value / step));
        income.text(format.to(value * rate / 100 / 12));
      }

      function animateRangeSlider() {
        var rangeLine = $('.noUi-connect');
        var rangeHandle = $('.noUi-origin');
        rangeLine.addClass('transition');
        rangeHandle.addClass('transition');
        setTimeout(function () {
          rangeLine.removeClass('transition');
          rangeHandle.removeClass('transition');
        }, 300);
      }
    })();
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
  } // $(window).on('resize', globalInitFunction);

});