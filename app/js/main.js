"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * some global settings and functions
 */
var API = '/app/ajax/';
Inputmask.extendDefinitions({
  f: {
    //masksymbol
    validator: '[0-7|9]'
  }
});
var phoneMask = '+7 (f99) 999-99-99';
var scrollBarWidth = getScrollbarWidth();

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

AOS.init({
  disable: 'mobile',
  once: true,
  duration: 750
});
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

    function hideInputErrors(wrapper) {
      var inputs = wrapper.find('input.error');
      inputs.each(function () {
        $(this).removeClass('error');
        $(this).siblings('.error').slideUp(0);
      });
    }

    function showInputError(input, text) {
      var inputNode = $(input);
      var errorNode = inputNode.siblings('.error');
      inputNode.addClass('error');
      errorNode.text(text);
      errorNode.slideDown(200);
    }

    function hideSingleInputError(input) {
      var inputNode = $(input);
      var errorNode = inputNode.siblings('.error');
      inputNode.removeClass('error');
      errorNode.slideUp(200);
    }
    /**
     * @param {string} value email input value
     * @returns {boolean}
     */


    function isEmailValid(value) {
      var emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]/i;
      var result = value.match(emailRegex);
      if (result && result[0]) return true;
      return false;
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
            var response = safelyParseJSON(data);
            resolve(response);
          },
          error: function error(data) {
            reject(data);
          }
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

    function scrollTo(element) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var elementOffset = $(element).offset().top;
      $('html, body').animate({
        scrollTop: elementOffset - offset
      }, speed);
    }

    var scrollToLinks = $('[data-scroll-to]');
    scrollToLinks.on('click', function (e) {
      var clickedLink = $(this);
      var targetId = clickedLink.data('scroll-to');
      var target = $("#".concat(targetId));
      var offset = clickedLink.data('scroll-offset') || 0;

      if (target.length === 1) {
        scrollTo(target, 300, offset);
      }
    });

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

    function safelyParseJSON(json) {
      var parsed;

      try {
        parsed = JSON.parse(json);
      } catch (e) {}

      return parsed;
    }

    (function () {
      var aboutTeamSlider = $('.about-team__slider');
      if (aboutTeamSlider.length === 0) return;
      if (window.matchMedia('(max-width: 767px)').matches) return;
      aboutTeamSlider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true // variableWidth: true

      });
    })();

    (function () {
      $('.about-top__video-snippet').modalVideo({
        allowAutoplay: true
      });
    })();

    (function () {
      var accountDetails = document.querySelector('.account-details');
      if (!accountDetails) return;
      var dropdowns = document.querySelectorAll('.tt-dropdown-menu');
      dropdowns.forEach(function (dd) {
        new SimpleBar(dd, {
          autoHide: false
        });
      });
      /** upload files logic */

      var dropzones = document.querySelectorAll('.account-details__file-upload');
      dropzones.forEach(function (dz) {
        initNewDropZone(dz);
      });

      function initNewDropZone(target) {
        var status = target.querySelector('.account-details__upload-status');
        var dropz = new Dropzone(target, {
          url: 'upload.php',
          maxFiles: 1,
          maxFilesize: 2,
          autoProcessQueue: false,
          acceptedFiles: 'image/*',
          dictFileTooBig: 'Слишком большой вес файла',
          dictInvalidFileType: 'Выберите изображение' // addRemoveLinks: true,
          // thumbnailWidth: '190',
          // thumbnailHeight: '250',

        });
        dropz.on('uploadprogress', function (file) {});
        dropz.on('addedfile', function (file, e) {
          target.classList.remove('error');
          target.classList.add('success');
          status.textContent = '';
        });
        dropz.on('success', function (file) {});
        dropz.on('error', function (file, reason) {
          target.classList.remove('success');
          target.classList.add('error');
          status.textContent = reason;
        });
      }
    })();

    (function () {
      var accountDocuments = document.querySelectorAll('.account-document');

      if (accountDocuments.length > 0) {
        accountDocuments.forEach(function (doc) {
          var header = doc.querySelector('.account-document__header');
          var body = doc.querySelector('.account-document__body');
          header.addEventListener('click', function () {
            doc.classList.toggle('active');
            header.classList.toggle('active');
            $(body).slideToggle(250);
          });
        });
      }
    })(); // function accountFeedbackModalLogic(modal) {
    //     const form = modal.querySelector('.account-feedback-modal__form');
    // }


    (function () {
      var accountNav = document.querySelector('.account-nav');
      if (!accountNav) return;
      var navList = accountNav.querySelector('.account-nav__list');
      var activeNavLink = accountNav.querySelector('.account-nav__link.active');

      var navItems = _toConsumableArray(navList.children);

      var navItemsLength = 0;
      navItems.forEach(function (item) {
        navItemsLength += item.getBoundingClientRect().width;
      });
      var $navList = $(navList);

      if (navItemsLength > navList.clientWidth + 1) {
        $navList.slick({
          dots: false,
          rows: 0,
          arrows: false,
          infinite: false,
          variableWidth: true,
          touchThreshold: 10,
          speed: 200,
          swipeToSlide: true // edgeFriction: 1,

        });

        if (activeNavLink) {
          var parentSlide = activeNavLink.parentNode;

          var index = _toConsumableArray($navList.slick('getSlick').$slides).indexOf(parentSlide);

          $navList.slick('slickGoTo', index);
        }
      } else {
        accountNav.classList.add('full');
      }
    })();

    function accountSettingsModalLogic(modal) {
      var form = modal.querySelector('.account-settings-modal__form');
      var inputs = form.querySelectorAll('input');
      var inputEmail = $('#settingsEmail');
      var inputPhone = $('#settingsPhone');
      var phoneMask = '+7 (f99) 999-99-99';
      inputPhone.inputmask({
        mask: phoneMask,
        showMaskOnHover: false
      });

      function inputPhoneValidate() {
        var enteredPhone = inputPhone.val();
        return Inputmask.isValid(enteredPhone, {
          mask: phoneMask
        });
      }

      inputs.forEach(function (input) {
        return input.addEventListener('focus', function () {
          return hideSingleInputError(input);
        });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!inputPhoneValidate()) {
          showInputError(inputPhone, 'Неверно указан телефон');
          return;
        }

        var formData = $(form).serialize();
        postData('url', formData).then(function (data) {
          MicroModal.close('accountSettingsModal');
        });
      });
    }

    function accountSettingsLogic() {
      var form = document.querySelector('.account-settings__form');
      if (!form) return;
      var inputs = form.querySelectorAll('input');
      var inputEmail = $('#settingsEmail');
      var inputPhone = $('#settingsPhone');
      var phoneMask = '+7 (f99) 999-99-99';
      inputPhone.inputmask({
        mask: phoneMask,
        showMaskOnHover: false
      });

      function inputPhoneValidate() {
        var enteredPhone = inputPhone.val();
        return Inputmask.isValid(enteredPhone, {
          mask: phoneMask
        });
      }

      inputs.forEach(function (input) {
        return input.addEventListener('focus', function () {
          return hideSingleInputError(input);
        });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!inputPhoneValidate()) {
          showInputError(inputPhone, 'Неверно указан телефон');
          return;
        }

        var formData = $(form).serialize();
        postData('url', formData).then(function (data) {
          MicroModal.close('accountSettingsModal');
        });
      });
    }

    accountSettingsLogic();
    {
      var triggerButtons = document.querySelectorAll('.application-trigger');

      if (triggerButtons.length > 0) {
        triggerButtons.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            MicroModal.show('applicationModal', {
              disableScroll: true,
              awaitCloseAnimation: true,
              onShow: function onShow(modal) {
                onModalOpen(modal);
                applicationModalLogic(modal);
              },
              onClose: function onClose(modal) {
                onModalClose(modal, false);
              }
            });
          });
        });
      }
    }

    function applicationModalLogic(modal) {
      var form = modal.querySelector('.modal__form');
      var inputs = form.querySelectorAll('input');
      console.log(inputs);
      var inputEmail = $('#applicationEmail');
      var inputPhone = $('#applicationPhone');
      var phoneMask = '+7 (f99) 999-99-99';
      inputPhone.inputmask({
        mask: phoneMask,
        showMaskOnHover: false
      });

      function inputPhoneValidate() {
        var enteredPhone = inputPhone.val();
        return Inputmask.isValid(enteredPhone, {
          mask: phoneMask
        });
      }

      inputs.forEach(function (input) {
        return input.addEventListener('focus', function () {
          return hideSingleInputError(input);
        });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!inputPhoneValidate()) {
          showInputError(inputPhone, 'Неверно указан телефон');
          return;
        }

        var formData = $(form).serialize();
        postData('url', formData).then(function (data) {
          MicroModal.close('applicationModal');
        });
      });
    }
    /** code for monitoring-sale-modal */


    (function () {
      var modal = document.querySelector('.monitoring-sale-modal');
      if (!modal) return;
      var form = modal.querySelector('form');
      if (!form) return;
      var formatPatterns = {
        amount: wNumb({
          decimals: 5,
          thousand: ' '
        }),
        price: wNumb({
          decimals: 2,
          thousand: ' '
        }),
        ruble: wNumb({
          decimals: 2,
          thousand: ' ',
          suffix: " \u20BD"
        })
      };
      var $shareAmount = modal.querySelector('#shareAmount');
      var $sharePrice = modal.querySelector('#sharePrice');
      var $shareResult = modal.querySelector('#shareResult');
      $shareAmount.addEventListener('change', function (e) {
        var value = parseFloat(e.target.value);
        if (!value) value = 0;
        value = parseFloat(value.toFixed(5));
        e.target.value = formatPatterns.amount.to(value);
        updateResult();
      });
      $sharePrice.addEventListener('change', function (e) {
        var value = parseFloat(e.target.value);
        if (!value) value = 0;
        value = parseFloat(value.toFixed(2));
        e.target.value = formatPatterns.price.to(value);
        updateResult();
      });
      $shareAmount.value = formatPatterns.amount.to(parseFloat($shareAmount.value));
      $sharePrice.value = formatPatterns.price.to(parseFloat($sharePrice.value));
      $shareResult.textContent = formatPatterns.ruble.to(parseFloat($shareResult.textContent));

      function updateResult() {
        var shareAmount = formatPatterns.amount.from($shareAmount.value);
        var sharePrice = formatPatterns.price.from($sharePrice.value);
        $shareResult.textContent = formatPatterns.ruble.to(shareAmount * sharePrice);
      }
      /** hope this will help */


      form.addEventListener('submit', function (e) {
        $shareAmount.value = formatPatterns.amount.from($shareAmount.value);
        $sharePrice.value = formatPatterns.price.from($sharePrice.value);
        $shareResult.textContent = formatPatterns.ruble.from($shareResult.textContent);
      });
    })();

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
      var settingsTriggers = document.querySelectorAll('.authorization__settings');
      settingsTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          MicroModal.show('accountSettingsModal', {
            disableScroll: true,
            disableFocus: true,
            awaitCloseAnimation: true,
            onShow: function onShow(modal) {
              onModalOpen(modal);
              accountSettingsModalLogic(modal);
            },
            onClose: function onClose(modal) {
              onModalClose(modal, false);
            }
          });
        });
      });
      var feedbackTriggers = document.querySelectorAll('.feedback-trigger');
      feedbackTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          MicroModal.show('accountFeedbackModal', {
            disableScroll: true,
            disableFocus: true,
            awaitCloseAnimation: true,
            onShow: function onShow(modal) {
              onModalOpen(modal);
            },
            onClose: function onClose(modal) {
              onModalClose(modal, false);
            }
          });
        });
      });
    })();

    (function () {
      var $inputs = $('.base-input__input, .base-input__textarea');
      console.log('$inputs: ', $inputs);
      var $autocompleteInputs = $('.base-input-autocomplete');
      $inputs.each(function () {
        if ($(this).val().trim() !== '') {
          $(this).closest('.base-input').addClass('hasValue');
        }

        $(this).on('blur', function () {
          if ($(this).val().trim() !== '') {
            $(this).closest('.base-input').addClass('hasValue');
          } else {
            $(this).closest('.base-input').removeClass('hasValue');
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
      var bestObjects = $('.best-objects');
      if (bestObjects.length === 0) return;
      var sliderWrapper = $('.best-objects__objects');
      sliderWrapper.slick({
        rows: 0,
        slidesToScroll: 1,
        swipeToSlide: true,
        slidesToShow: 1,
        arrows: true,
        mobileFirst: true,
        infinite: false,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2.25
          }
        }, {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    })();

    (function () {
      var contacts = $('.contacts');
      if (contacts.length === 0) return;
      ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
          center: [55.749511, 37.537083],
          zoom: 15,
          controls: ['zoomControl']
        });
        var myPlacemark = new ymaps.Placemark([55.749511, 37.537083], {
          hintContent: '123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»',
          balloonContent: '123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»'
        }, {
          preset: 'islands#icon',
          iconColor: '#fed63f'
        });
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(myPlacemark);
      });
    })();

    var CustomSelect =
    /*#__PURE__*/
    function () {
      /**
       * @param {HTMLElement} select
       * @param {Object} options
       * @param {Function} options.onSelect - callback for selected element
       */
      function CustomSelect(select) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, CustomSelect);

        if (!select) {
          throw new Error('No element has been passed');
        }

        this.select = select;
        this.options = options;
        this.setup();
      }

      _createClass(CustomSelect, [{
        key: "setup",
        value: function setup() {
          this.valueInput = this.select.querySelector('.custom-select__value');
          this.selected = this.select.querySelector('.custom-select__selected');
          this.dropdown = this.select.querySelector('.custom-select__dropdown');
          this.optionsList = this.select.querySelector('.custom-select__options');
          this.inititalPlaceholder = this.selected.textContent.trim();
          new SimpleBar(this.dropdown, {
            autoHide: false
          });
          /** keycodes */

          this.keyCodes = {
            enter: 13,
            down_arrow: 40,
            up_arrow: 38,
            escape: 27
          };
          this.setEventHandlers();
        }
      }, {
        key: "setEventHandlers",
        value: function setEventHandlers() {
          var _this = this;

          this.selected.addEventListener('keydown', function (e) {
            return _this.toggleOptionsList(e);
          });
          this.selected.addEventListener('click', function (e) {
            return _this.toggleOptionsList(e);
          });
          this.optionsList.addEventListener('click', function (e) {
            var target = e.target;

            if (target.classList.contains('custom-select__option')) {
              e.preventDefault();

              _this.selectItem(e);
            }
          });
          this.optionsList.addEventListener('keydown', function (e) {
            var target = e.target;

            if (target.classList.contains('custom-select__option')) {
              switch (e.keyCode) {
                case _this.keyCodes.enter:
                  _this.selectItem(e);

                  return;

                case _this.keyCodes.down_arrow:
                  e.preventDefault();

                  _this.focusNextListItem(_this.keyCodes.down_arrow);

                  return;

                case _this.keyCodes.up_arrow:
                  e.preventDefault();

                  _this.focusNextListItem(_this.keyCodes.up_arrow);

                  return;

                case _this.keyCodes.escape:
                  _this.closeOptionsList();

                  return;

                default:
                  return;
              }
            }
          });
          document.addEventListener('click', function (e) {
            if (!_this.select.contains(e.target) && _this.dropdown.classList.contains('opened')) {
              _this.closeOptionsList();
            }
          });
        }
      }, {
        key: "toggleOptionsList",
        value: function toggleOptionsList(e) {
          if (e.keyCode === this.keyCodes.escape) {
            this.closeOptionsList();
          }

          if (e.type === 'click') {
            this.dropdown.classList.toggle('opened');
            this.selected.classList.toggle('opened');
            this.dropdown.setAttribute('aria-expanded', this.dropdown.classList.contains('opened')); // $$.fadeToggle(this.dropdown);

            $(this.dropdown).fadeToggle(120);
          }

          if (e.keyCode === this.keyCodes.down_arrow) {
            e.preventDefault();
            this.focusNextListItem(this.keyCodes.down_arrow);
          }

          if (e.keyCode === this.keyCodes.up_arrow) {
            e.preventDefault();
            this.focusNextListItem(this.keyCodes.up_arrow);
          }
        }
      }, {
        key: "closeOptionsList",
        value: function closeOptionsList() {
          this.dropdown.classList.remove('opened');
          this.selected.classList.remove('opened');
          this.dropdown.setAttribute('aria-expanded', false); // $$.fadeOut(this.dropdown);

          $(this.dropdown).fadeOut(120);
        }
      }, {
        key: "focusNextListItem",
        value: function focusNextListItem(direction) {
          var activeElement = document.activeElement;

          var options = _toConsumableArray(this.optionsList.children);

          if (activeElement.classList.contains('custom-select__selected')) {
            this.optionsList.children[0].focus();
          } else {
            var currentActiveElementIndex = options.indexOf(activeElement);

            if (direction === this.keyCodes.down_arrow) {
              var currentActiveElementIsNotLastItem = currentActiveElementIndex < options.length - 1;

              if (currentActiveElementIsNotLastItem) {
                var nextListItem = options[currentActiveElementIndex + 1];
                nextListItem.focus();
              }
            } else if (direction === this.keyCodes.up_arrow) {
              var currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;

              if (currentActiveElementIsNotFirstItem) {
                var _nextListItem = options[currentActiveElementIndex - 1];

                _nextListItem.focus();
              }
            }
          }
        }
      }, {
        key: "selectItem",
        value: function selectItem(e) {
          var selectedValue = e.target.textContent.trim();
          this.singleSelectLogic(e, selectedValue);
        }
      }, {
        key: "setSelected",
        value: function setSelected(value) {
          this.selected.textContent = value;
          if (this.valueInput) this.valueInput.value = value;
        }
      }, {
        key: "clearSelected",
        value: function clearSelected() {
          this.selected.textContent = this.inititalPlaceholder;

          if (this.valueInput) {
            this.valueInput.value = null;
          }
        }
      }, {
        key: "singleSelectLogic",
        value: function singleSelectLogic(e, selectedValue) {
          /** clicked item was already selected */
          if (this.selected.textContent === selectedValue) {
            this.closeOptionsList();
            return;
          }

          this.selected.textContent = selectedValue;
          if (this.valueInput) this.valueInput.value = selectedValue;
          this.closeOptionsList();

          if (typeof this.options.onSelect === 'function') {
            this.options.onSelect(selectedValue);
          }
        }
      }]);

      return CustomSelect;
    }();

    (function () {
      var selects = document.querySelectorAll('.custom-select');
      selects.forEach(function (select) {
        return new CustomSelect(select);
      });
    })();

    (function () {
      var faq = $('.faq');
      if (faq.length === 0) return;
      var faqLinks = $('.faq__questions-link');
      var faqAnswers = $('.faq__answer');
      var content = $('.faq__content');
      var scrollOffset = 0;

      if (window.matchMedia('(max-width: 768px)').matches) {
        scrollOffset = 50;
      } else {
        scrollOffset = 150;
      }

      faqLinks.on('click', function (e) {
        e.preventDefault();
        var link = $(this);
        if (link.hasClass('active')) return;
        var activeAnswer = faqAnswers.filter('.active');
        var activeLink = faqLinks.filter('.active');
        var targetId = link.data('target');
        var targetAnswer = faqAnswers.filter('#' + targetId);
        activeLink.removeClass('active');
        activeAnswer.fadeOut(300, function () {
          activeAnswer.removeClass('active');
          link.addClass('active');
          targetAnswer.addClass('active');
          targetAnswer.fadeIn(300);
          scrollTo(content, 300, scrollOffset);
        });
      });
    })();

    (function () {
      var $mainNav = $('.main-header__navigation');
      var $alertBanner = $('.alert-banner');
      var topPosition = $alertBanner.length > 0 ? $alertBanner.height() + 75 : 75;
      $mainNav.css('top', topPosition + 'px');
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

    {
      var _triggerButtons = document.querySelectorAll('.info-trigger');

      console.log(_triggerButtons);

      if (_triggerButtons.length > 0) {
        _triggerButtons.forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            MicroModal.show('infoModal', {
              disableScroll: true,
              awaitCloseAnimation: true,
              onShow: function onShow(modal) {
                onModalOpen(modal);
              },
              onClose: function onClose(modal) {
                onModalClose(modal, false);
              }
            });
          });
        });
      }
    }

    (function () {
      var subNavLinks = $('.main-nav__link.has-subnav');

      if (window.matchMedia('(max-width: 1023px)').matches) {
        subNavLinks.on('click', function (e) {
          e.preventDefault();
          var subnav = $(this).next();
          subnav.slideToggle(300);
        });
      }
    })();

    function onModalOpen(modal) {
      modal.children[0].style.paddingRight = scrollBarWidth + 'px';
      document.body.style.paddingRight = scrollBarWidth + 'px';
    }

    function onModalClose(modal) {
      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      modal.children[0].style.paddingRight = '';
      document.body.style.paddingRight = '';
      var focusedElement = document.activeElement;

      if (focusedElement && focusedElement.focus) {
        focusedElement.blur();
      }

      if (remove) {
        modal.addEventListener('animationend', function removeModal() {
          this.remove();
          this.removeEventListener('animationend', removeModal);
        });
      }
    }

    (function () {
      var chart = document.getElementById('income-monitoring');
      if (!chart) return; // const profitData = [2500, 1700, 22200, 1600, 1250, 650, 2500, 1700, 1200, 1600, 1250, 650];
      // const dividendsData = [5, 10, 20, 85, 20, 15, 5, 20, 20, 35, 20, 15];

      var profitData = [122442.8, 5786.51, 174648.8, 65352.25, 21275.49, 748878.0, 82916.36, 49460.5, 65876.33, 50389.35, 53762.3, 11285.56];
      var dividendsData = [87.2, 195.3, 13.8, 13.9, 4.3, 309.7, 17.9, 10.3, 14, 10.6, 11.4, 2.3];
      var chartDates = ['02.18', '03.18', '04.18', '05.18', '06.18', '07.18', '08.18', '09.18', '10.18', '11.18', '12.18', '01.19'];
      var dividendsMax = Math.max.apply(Math, dividendsData);
      var profitMax = Math.max.apply(Math, profitData);
      setTimeout(function () {
        var scrolledArea = chart.querySelector('.highcharts-scrolling');
        if (scrolledArea.length === 0) return;
        var scroll = new SimpleBar(scrolledArea, {
          autoHide: false
        }); // const scrolledContent = scroll.getScrollElement();
        // scrolledContent.scrollLeft = scrolledContent.scrollWidth;
      }, 1000);
      var columnWidth = 65;
      var chartMinWidth = columnWidth * 1.05 * profitData.length;

      var onChartLoad = function onChartLoad() {
        var points0 = this.series[0].data;
        var points1 = this.series[1].data;
        points0.forEach(function (point, i) {
          var _point$dataLabel$attr = point.dataLabel.attr(),
              y = _point$dataLabel$attr.y;

          var _point$dataLabel$getB = point.dataLabel.getBBox(),
              height = _point$dataLabel$getB.height;

          var _points1$i$dataLabel$ = points1[i].dataLabel.attr(),
              y1 = _points1$i$dataLabel$.y,
              opacity1 = _points1$i$dataLabel$.opacity;

          var _points1$i$dataLabel$2 = points1[i].dataLabel.getBBox(),
              height1 = _points1$i$dataLabel$2.height;

          if (opacity1 === 0 && y + height > y1 + 5) {
            y1 = y + height1 - 30;
          }

          points1[i].dataLabel.attr({
            y: y1,
            opacity: 1
          });
        });
      };

      Highcharts.chart('income-monitoring', {
        chart: {
          marginTop: 30,
          marginRight: 24,
          marginLeft: 24,
          scrollablePlotArea: {
            minWidth: chartMinWidth
          },
          events: {
            render: onChartLoad
          }
        },
        title: {
          text: ''
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          series: {
            dataLabels: {},
            states: {
              inactive: {
                opacity: 1
              }
            }
          },
          spline: {
            dataLabels: {
              align: 'center',
              enabled: true,
              color: 'black',
              // padding: 10,
              padding: 0,
              y: 20,
              crop: false,
              overflow: 'none',
              style: {
                textOutline: 'none',
                fontSize: '10px',
                fontWeight: 500,
                fontFamily: 'Montserrat'
              },
              formatter: function formatter() {
                return this.y + '%';
              }
            }
          },
          column: {
            pointWidth: columnWidth,
            pointPadding: 0,
            dataLabels: {
              align: 'center',
              enabled: true,
              color: 'black',
              padding: 0,
              y: -6,
              x: -5,
              crop: false,
              overflow: 'none',
              style: {
                textOutline: 'none',
                fontSize: '10px',
                fontWeight: 500,
                fontFamily: 'Montserrat'
              },
              formatter: function formatter() {
                if (this.y >= 1000000) return (this.y / 1000000).toFixed(2) + '<span> млн. ₽</span>';else if (this.y >= 1000) return (this.y / 1000).toFixed(2) + '<span> тыс. ₽</span>';else return this.y + ' ₽';
              }
            }
          }
        },
        xAxis: [{
          categories: chartDates,
          crosshair: false,
          offset: 20,
          labels: {
            style: {
              color: '#696969',
              fontSize: '10px',
              fontFamily: 'Montserrat',
              fontWeight: 500
            }
          }
        }],
        yAxis: [{
          visible: false,
          min: 0,
          max: dividendsMax,
          title: {
            text: ''
          },
          opposite: true,
          labels: {
            x: 5
          }
        }, {
          visible: false,
          max: profitMax,
          title: {
            text: ''
          },
          width: 40,
          labels: {
            x: -6
          }
        }],
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Сумма выплат',
          type: 'column',
          yAxis: 1,
          data: profitData,
          color: '#CBCBCB',
          tooltip: {
            // valueSuffix: " 000 руб"
            pointFormatter: function pointFormatter() {
              return 'Сумма выплат: <b>' + this.y.toLocaleString() + ' 000 руб</b><br>' + 'Доля от общих выплат: <b>' + Math.floor(this.y / profitData.reduce(function (x, y) {
                return x + y;
              }, 0) * 100) + '%</b>';
            }
          },
          states: {
            hover: {
              color: '#fff6d4'
            },
            inactive: {
              opacity: 1
            }
          }
        }, {
          name: 'Доходность',
          type: 'spline',
          data: dividendsData,
          color: '#000',
          tooltip: {
            valueSuffix: '%'
          }
        }]
      });
    })();

    (function () {
      var chart = document.querySelector('.monitoring-header__chart');
      if (!chart) return;
      var line = chart.querySelector('.line');
      var barData = [{
        name: 'Активо восемь',
        data: [{
          y: 20,
          url: '/aktivo-8'
        }]
      }, {
        name: 'Активо семь',
        data: [{
          y: 16,
          url: '/aktivo-7'
        }]
      }, {
        name: 'Активо шесть',
        data: [{
          y: 16,
          url: '/aktivo-6'
        }]
      }, {
        name: 'Активо пять',
        data: [{
          y: 14,
          url: '/aktivo-5'
        }]
      }, {
        name: 'Активо четыре',
        data: [{
          y: 12,
          url: '/aktivo-4'
        }]
      }, {
        name: 'Активо три',
        data: [{
          y: 9,
          url: '/aktivo-3'
        }]
      }, {
        name: 'Активо два',
        data: [{
          y: 7,
          url: '/aktivo-2'
        }]
      }, {
        name: 'Активо один',
        data: [{
          y: 6,
          url: '/aktivo-1'
        }]
      }];
      var barColors = ['#79A0FF', '#C29BF6', '#F598E2', '#FF9BC6', '#FFA9AB', '#FFBD96', '#FFD48C', '#FFEB93'].reverse();
      /** to save hovered point */

      var selectedPoint = null;
      Highcharts.chart('funds-chart', {
        chart: {
          type: 'bar',
          height: 90,
          margin: 0
        },
        colors: barColors,
        title: {
          text: ''
        },
        exporting: {
          enabled: false
        },
        xAxis: [{
          categories: ['Фонды'],
          crosshair: false,
          labels: {
            enabled: false
          },
          title: {
            enabled: false
          },
          visible: false // labels: {
          //     style: {
          //         color: 'rgba(0, 0, 0, 0.4)',
          //         fontSize: '9px',
          //     },
          // },

        }],
        yAxis: {
          max: 100,
          labels: {
            enabled: false
          },
          title: {
            enabled: false
          },
          visible: false
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          bar: {
            pointWidth: 30
          },
          series: {
            stacking: 'normal',
            borderWidth: 0,
            cursor: 'pointer',
            point: {
              events: {
                mouseOver: function mouseOver(e) {
                  selectedPoint = this;
                  line.style.backgroundColor = this.color;
                  line.style.right = this.shapeArgs.y + 'px';
                  line.style.top = this.shapeArgs.x + this.shapeArgs.width + 'px';
                  line.style.width = this.shapeArgs.height + 'px';
                  line.classList.add('visible');
                },
                mouseOut: function mouseOut() {
                  selectedPoint = null;
                  line.classList.remove('visible');
                },
                click: function click(e) {
                  window.location.href = e.point.url;
                }
              }
            },
            // pointPadding: 0,
            // groupPadding: 0,
            states: {
              hover: {
                enabled: false
              },
              inactive: {
                opacity: 1
              }
            }
          }
        },
        tooltip: {
          positioner: function positioner(lw, lh, point) {
            var chartWidth = this.chart.plotSizeY;
            var pointWidth = selectedPoint.shapeArgs.height;
            var pointLeftPosition = chartWidth - selectedPoint.plotY - pointWidth;
            var leftOffset = pointLeftPosition + (pointWidth - lw) / 2;
            leftOffset = leftOffset < 0 ? 6 : leftOffset;
            leftOffset = leftOffset + lw > chartWidth ? chartWidth - lw : leftOffset;
            return {
              x: leftOffset,
              y: point.plotY + 30
            };
          },
          shadow: false,
          padding: 0,
          borderWidth: 0,
          style: {
            fontSize: '10px',
            fontWeight: 600,
            fontFamily: 'Montserrat'
          },
          backgroundColor: 'transparent',
          headerFormat: '',
          hideDelay: 100,
          pointFormatter: function pointFormatter() {
            return "".concat(this.series.name, " | ").concat(this.y, " %");
          }
        },
        series: barData
      });
    })();

    (function () {
      var steps = document.querySelector('.monitoring-steps');
      if (!steps) return;
      var container = steps.querySelector('.monitoring-steps__container');
      new SimpleBar(container, {
        autoHide: false
      });
    })();

    (function () {
      var objectCalc = document.querySelector('.object-calc');
      if (!objectCalc) return;
      /** DOM varaibles */

      var investmentRangeSlider = document.querySelector('.object-calc__investment-range');
      var invsestmentValue = document.querySelector('.object-calc__investment-value');
      var submitDataButton = document.querySelector('.object-calc__button');
      /**
       * result column nodes
       */

      var dataWrapper = document.querySelector('.object-calc__income-data');
      var $incomeValue = dataWrapper.querySelector('.object-calc__income .value');
      var $shareValue = dataWrapper.querySelector('.object-calc__share .value');
      var $stepValue = dataWrapper.querySelector('.object-calc__step .value');
      var $rateValue = dataWrapper.querySelector('.object-calc__rate .value');
      /**
       *  initial values for calculation
       */

      var initialValue = parseInt(dataWrapper.dataset.initial);
      var minValue = parseInt(dataWrapper.dataset.min);
      var maxValue = parseInt(dataWrapper.dataset.max);
      var basicStep = parseInt(dataWrapper.dataset.step);
      var basicRate = parseFloat(dataWrapper.dataset.rate);
      var minStepDivider = minValue / basicStep;
      /** step and rate can be overwritten by user */

      var customRate = null;
      var customStep = null;
      var format = wNumb({
        decimals: 0,
        thousand: ' '
      });
      /**
       *editing default values
       */

      $incomeValue.addEventListener('blur', function (e) {
        var newIncome = format.from($incomeValue.textContent.trim());
        $incomeValue.textContent = format.to(newIncome);
        var currentRate = parseFloat($rateValue.textContent);
        var newSliderValue = newIncome * 12 / currentRate * 100;
        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
      });
      $shareValue.addEventListener('blur', function (e) {
        var newShare = parseInt($shareValue.textContent.trim());
        if (isNaN(newShare)) newShare = minValue / basicStep;
        var step = customStep ? customStep : basicStep;
        var newSliderValue = newShare * step;
        investmentRangeSlider.noUiSlider.set(newSliderValue);
        animateRangeSlider();
      });
      $stepValue.addEventListener('blur', function (e) {
        var newStep = format.from($stepValue.textContent.trim());
        if (isNaN(newStep) || !newStep) newStep = parseInt(basicStep);
        customStep = newStep;
        updateRangesStep(customStep);
      });
      $rateValue.addEventListener('blur', function (e) {
        var newRate = parseFloat($rateValue.textContent.trim());
        if (isNaN(newRate)) newRate = parseFloat(basicRate);
        customRate = newRate;
        $incomeValue.textContent = format.to(investmentRangeSlider.noUiSlider.get() * (newRate / 100) / 12);
      });
      document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && e.target.classList.contains('value') && e.target.isContentEditable) {
          e.preventDefault();
          e.stopPropagation();
          e.target.blur();
        }
      });
      initRangeSlider();
      submitDataButton.addEventListener('click', submitData);
      /*
       * interactions with range slider
       */

      investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        console.log('update');
        var value = +values[handle];
        invsestmentValue.textContent = format.to(value);
        var rate = customRate ? customRate : basicRate;
        var step = customStep ? customStep : basicStep;
        updateResultData(value, rate, step);
      });
      /**
       * helper functions
       */

      function initRangeSlider() {
        noUiSlider.create(investmentRangeSlider, {
          start: initialValue,
          step: basicStep,
          animate: false,
          connect: 'lower',
          range: {
            min: 0,
            max: maxValue
          },
          padding: [minValue, 0]
        });
      }

      function updateResultData(value, rate, step) {
        $incomeValue.textContent = format.to(value * rate / 100 / 12);
        $shareValue.textContent = value / step;
        $rateValue.textContent = rate;
        $stepValue.textContent = format.to(step);
      }

      function updateRangesStep(step) {
        var minPadding = step >= minValue ? step : step * Math.ceil(minValue / step);
        var maxPadding = maxValue % step === 0 ? 0 : step;
        investmentRangeSlider.noUiSlider.updateOptions({
          step: step,
          padding: [minPadding, maxPadding]
        }, false);
      }

      function animateRangeSlider() {
        var rangeLine = document.querySelector('.noUi-connect');
        var rangeHandle = document.querySelector('.noUi-origin');
        rangeLine.classList.add('transition');
        rangeHandle.classList.add('transition');
        setTimeout(function () {
          rangeLine.classList.remove('transition');
          rangeHandle.classList.remove('transition');
        }, 300);
      }

      function submitData() {
        var finalSelectedValue = investmentRangeSlider.noUiSlider.get();
        postData('url', "investment=".concat(finalSelectedValue)).then(function (data) {});
      }
    })();

    (function () {
      tippy('.object-card .tooltip', {
        placement: 'bottom',
        arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'
      });
      $('.object-card__play').modalVideo({
        allowAutoplay: true
      });
    })();

    (function () {
      var objectFinances = $('.object-finances');
      if (objectFinances.length === 0) return;
      var financesTable = document.querySelector('.object-finances__table');
      var lineChart = document.querySelector('#lineChart');
      var lineChartPadding = parseInt(window.getComputedStyle(lineChart.parentNode).paddingLeft);
      var scrolledLineChart = null;
      var columnChart = document.querySelector('#columnChart');
      var columnChartPadding = parseInt(window.getComputedStyle(columnChart.parentNode).paddingLeft);
      var scrolledColumnChart = null;
      var tableWidth = financesTable.firstElementChild.clientWidth;
      var tableWrapperWidth = financesTable.clientWidth;
      if (tableWidth > tableWrapperWidth) financesTable.firstElementChild.style.width = '100%';
      var dataCells = financesTable.querySelectorAll('tr:not(:first-child) td');
      var cellHeight = dataCells[0].getBoundingClientRect().height;
      var regularCellWidth = dataCells[1].getBoundingClientRect().width;
      var hr = document.querySelector('.object-finances__hr');
      var vr = document.querySelector('.object-finances__vr');
      var formatValue = wNumb({
        decimals: 2,
        thousand: ' '
      });
      var labelFontSize = '12px';
      var showGridLine = false;
      var plotColumnWidth = 52;

      if (window.matchMedia('(min-width: 1024px)').matches) {
        labelFontSize = '15px';
        plotColumnWidth = 62;
        showGridLine = true;
      }

      dataCells.forEach(function (cell) {
        cell.addEventListener('mouseover', function () {
          var offsetTop = cell.offsetParent.offsetTop + cell.offsetTop + cellHeight;
          hr.style.top = "".concat(offsetTop, "px");

          var index = _toConsumableArray(cell.parentNode.children).indexOf(cell);

          var leftPadding = -5;

          if (index === 1) {
            leftPadding = parseInt(window.getComputedStyle(cell).paddingLeft) - 5;
          }

          console.log(financesTable.scrollLeft);
          var offsetLeft = cell.offsetParent.offsetLeft + cell.offsetLeft + leftPadding - financesTable.scrollLeft;
          vr.style.left = "".concat(offsetLeft, "px");
          vr.style.marginLeft = '8px';
          hr.classList.add('active');
          vr.classList.add('active');
        });
        cell.addEventListener('mouseout', function () {
          hr.classList.remove('active');
          vr.classList.remove('active');
        });
      });
      var scrollNext = document.querySelector('.object-finances__scroll-next');
      var scrollPrev = document.querySelector('.object-finances__scroll-prev');
      var jumpNext = document.querySelector('.object-finances__jump-next');
      var jumpPrev = document.querySelector('.object-finances__jump-prev');
      var maxScrollLeft = financesTable.scrollWidth - financesTable.clientWidth;

      if (tableWidth < tableWrapperWidth) {
        $(scrollNext).hide();
        $(scrollPrev).hide();
        $(jumpNext).hide();
        $(jumpPrev).hide();
      }

      var debouncedNextClick = debounce(nextClick, 200, true);
      var debouncedPrevClick = debounce(prevClick, 200, true);
      var debouncedJumpNext = debounce(jumpingNext, 200, true);
      var debouncedJumpPrev = debounce(jumpingPrev, 200, true);
      jumpNext.addEventListener('click', debouncedJumpNext);
      jumpPrev.addEventListener('click', debouncedJumpPrev);
      var touchDevice = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      console.log('touchDevice: ', touchDevice);

      if (touchDevice) {
        scrollNext.addEventListener('touchstart', debouncedNextClick);
        scrollNext.addEventListener('touchend', function () {
          return clearInterval(mouseTimer);
        });
        scrollPrev.addEventListener('touchstart', debouncedPrevClick);
        scrollPrev.addEventListener('touchend', function () {
          return clearInterval(mouseTimer);
        });
      } else {
        scrollNext.addEventListener('mousedown', debouncedNextClick);
        scrollNext.addEventListener('mouseup', function () {
          return clearInterval(mouseTimer);
        });
        scrollPrev.addEventListener('mousedown', debouncedPrevClick);
        scrollPrev.addEventListener('mouseup', function () {
          return clearInterval(mouseTimer);
        });
      }

      var mouseTimer;

      function nextClick(e) {
        update();
        mouseTimer = setInterval(update, 500);

        function update() {
          var value = financesTable.scrollLeft + regularCellWidth;
          scrollPrev.classList.add('active');
          jumpPrev.classList.add('active');

          if (value > maxScrollLeft) {
            clearInterval(mouseTimer); // return;
          }

          if (value >= maxScrollLeft - regularCellWidth) {
            scrollNext.classList.remove('active');
            jumpNext.classList.remove('active');
          }

          smoothLeftScroll(value);
        }
      }

      function prevClick() {
        update();
        mouseTimer = setInterval(update, 500);

        function update() {
          var value = financesTable.scrollLeft - regularCellWidth;

          if (value <= -regularCellWidth) {
            clearInterval(mouseTimer);
            return;
          }

          if (value <= 0) {
            scrollPrev.classList.remove('active');
            jumpPrev.classList.remove('active');
          }

          if (value <= maxScrollLeft) {
            scrollNext.classList.add('active');
            jumpNext.classList.add('active');
            smoothLeftScroll(value);
          }
        }
      }

      function jumpingNext(e) {
        var value = financesTable.scrollLeft + regularCellWidth * 6;
        jumpPrev.classList.add('active');
        scrollPrev.classList.add('active');

        if (value >= maxScrollLeft - regularCellWidth * 6) {
          smoothLeftScroll(maxScrollLeft);
          jumpNext.classList.remove('active');
          scrollNext.classList.remove('active');
        } else {
          smoothLeftScroll(value);
        }
      }

      function jumpingPrev() {
        var value = financesTable.scrollLeft - regularCellWidth * 6;

        if (value <= -regularCellWidth) {
          smoothLeftScroll(0);
        }

        if (value <= 0) {
          jumpPrev.classList.remove('active');
          scrollPrev.classList.remove('active');
        }

        if (value <= maxScrollLeft) {
          jumpNext.classList.add('active');
          scrollNext.classList.add('active');
          smoothLeftScroll(value);
        }
      }

      if (lineChart) {
        var data = [242277.779, 3172259.31, 1669890.65, 1647254.72, 2863786.35, 2513992.47, 2795352.5, 4823505.42, 2925765.61, 99999.8, 242277.779, 3172259.31, 1669890.65, 1647254.72, 2863786.35, 2513992.47, 2795352.5, 4823505.42, 2925765.61, // 2570890.35,
        // 4195441.54,
        // 1001971.62,
        // 3348942.76,
        // 4656600.96,
        // 3395237.74,
        // 2890238.47,
        // 3082031.01,
        // 2952247,
        // 4196775.21,
        // 3602760.57,
        // 4025475.32,
        // 2729290.73,
        // 3654850.22,
        // 1135382.72,
        // 2504889.49,
        // 2557290.57,
        // 1795512.88,
        // 3098144.21,
        null];
        var categories = ['Сентябрь 2022', 'Октябрь 2017', 'Ноябрь 2017', 'Декабрь 2017', 'Январь 2018', 'Февраль 2018', 'Март 2018', 'Апрель 2018', 'Май 2018', 'Август 2017', 'Сентябрь 2022', 'Октябрь 2017', 'Ноябрь 2017', 'Декабрь 2017', 'Январь 2018', 'Февраль 2018', 'Март 2018', 'Апрель 2018', 'Май 2018', // 'Июнь 2018',
        // 'Июль 2018',
        // 'Август 2018',
        // 'Сентябрь 2018',
        // 'Октябрь 2018',
        // 'Ноябрь 2018',
        // 'Декабрь 2018',
        // 'Январь 2019',
        // 'Февраль 2019',
        // 'Март 2019',
        // 'Апрель 2019',
        // 'Май 2019',
        // 'Июнь 2019',
        // 'Июль 2019',
        // 'Август 2019',
        // 'Сентябрь 2019',
        // 'Октябрь 2019',
        // 'Ноябрь 2019',
        // 'Декабрь 2019',
        // 'Январь 2020',
        ''];
        var columnWidth = regularCellWidth;
        console.log(columnWidth);
        var chartMinWidth = columnWidth * data.length;
        Highcharts.chart('lineChart', {
          chart: {
            type: 'spline',
            scrollablePlotArea: {
              minWidth: chartMinWidth // opacity: 0,

            },
            marginTop: 60,
            marginLeft: 70
          },
          title: false,
          credits: {
            enabled: false
          },
          xAxis: {
            categories: categories,
            opposite: true,
            tickPixelInterval: columnWidth,
            width: columnWidth * data.length,
            gridLineColor: '#197F07',
            // height: 40,
            offset: 30,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
              align: 'left',
              // x: 2,
              style: {
                color: '#9e9e9e',
                fontSize: labelFontSize,
                fontWeight: '600',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                paddingLeft: '5px',
                whiteSpace: 'nowrap'
              }
            }
          },
          yAxis: {
            title: false,
            gridLineColor: '#f2f2f2',
            // offset: 10,
            labels: {
              // padding: 5,
              style: {
                color: '#9e9e9e',
                fontSize: labelFontSize,
                fontWeight: '600',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                paddingLeft: '5px'
              },
              formatter: function formatter() {
                return this.value / 1000000 + 'M';
              }
            }
          },
          plotOptions: {
            spline: {
              color: '#fed63f' // dataLabels: {
              //     enabled: false,
              // },

            },
            series: {
              dataLabels: {
                enabled: true,
                align: 'left',
                y: -5,
                style: {
                  fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                  fontSize: '14px',
                  fontWeight: '400'
                },
                formatter: function formatter(a) {
                  var value = parseFloat(this.y);

                  if (value < 100000) {
                    return formatValue.to(+value.toFixed(2)) + " \u20BD";
                  } else {
                    return formatValue.to(value.toFixed(2) / 1000) + " \u0442\u044B\u0441. \u20BD";
                  }
                }
              },
              point: {
                events: {
                  mouseOver: function mouseOver(_ref) {
                    var target = _ref.target;
                    if (!showGridLine) return;
                    var magicNumber = 69;
                    vr.style.left = "".concat(target.clientX + lineChartPadding + magicNumber - scrolledLineChart.scrollLeft, "px");
                    vr.style.marginLeft = '';
                    vr.classList.add('active');
                  },
                  mouseOut: function mouseOut() {
                    vr.classList.remove('active');
                  }
                }
              }
            }
          },
          tooltip: {
            enabled: false
          },
          series: [{
            data: data
          }],
          legend: false
        });
        scrolledLineChart = lineChart.querySelector('.highcharts-scrolling');
      }

      if (columnChart) {
        var _data = [80, 70, 0, 0, 0, 0, 0, 0, 70, 489, 89, 70, 0, 0, 0, 0, 0, 0, 7, null];
        var percentage = [8, 7, 0, 0, 0, 0, 0, 0, 7, 48, 8, 7, 0, 0, 0, 0, 0, 0, 7, null];
        var _categories = ['Сентябрь 2022', 'Октябрь 2017', 'Ноябрь 2017', 'Декабрь 2017', 'Январь 2018', 'Февраль 2018', 'Март 2018', 'Апрель 2018', 'Май 2018', 'Август 2017', 'Сентябрь 2022', 'Октябрь 2017', 'Ноябрь 2017', 'Декабрь 2017', 'Январь 2018', 'Февраль 2018', 'Март 2018', 'Апрель 2018', 'Май 2018', // 'Июнь 2018',
        // 'Июль 2018',
        // 'Август 2018',
        // 'Сентябрь 2018',
        // 'Октябрь 2018',
        // 'Ноябрь 2018',
        // 'Декабрь 2018',
        // 'Январь 2019',
        // 'Февраль 2019',
        // 'Март 2019',
        // 'Апрель 2019',
        // 'Май 2019',
        // 'Июнь 2019',
        // 'Июль 2019',
        // 'Август 2019',
        // 'Сентябрь 2019',
        // 'Октябрь 2019',
        // 'Ноябрь 2019',
        // 'Декабрь 2019',
        // 'Январь 2020',
        ''];
        var _columnWidth = regularCellWidth;

        var _chartMinWidth = _columnWidth * _data.length;

        Highcharts.chart('columnChart', {
          chart: {
            scrollablePlotArea: {
              minWidth: _chartMinWidth // opacity: 0,

            },
            marginTop: 60,
            marginLeft: 70
          },
          title: false,
          credits: {
            enabled: false
          },
          xAxis: {
            categories: _categories,
            opposite: true,
            tickPixelInterval: _columnWidth,
            width: _columnWidth * _data.length,
            offset: 30,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
              align: 'left',
              style: {
                color: '#9e9e9e',
                fontSize: labelFontSize,
                fontWeight: '600',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                paddingLeft: '5px',
                whiteSpace: 'nowrap'
              }
            }
          },
          yAxis: [{
            title: false,
            gridLineColor: '#f2f2f2',
            labels: {
              padding: 0,
              style: {
                color: '#9e9e9e',
                fontSize: labelFontSize,
                fontWeight: '600',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                whiteSpace: 'nowrap'
              },
              formatter: function formatter() {
                return this.value + 'шт.';
              }
            }
          }, {
            visible: true,
            gridLineColor: 'transparent',
            title: false,
            opposite: true,
            labels: {
              padding: 0,
              style: {
                color: '#9e9e9e',
                fontSize: labelFontSize,
                fontWeight: '600',
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                whiteSpace: 'nowrap'
              },
              formatter: function formatter() {
                return this.value + '%';
              }
            }
          }],
          plotOptions: {
            column: {
              color: '#d8d8d8',
              pointWidth: plotColumnWidth,
              pointPlacement: 0.22
            },
            sline: {
              dataLabels: {
                formatter: function formatter() {
                  return this.y + '%';
                }
              }
            }
          },
          tooltip: {
            enabled: false
          },
          series: [{
            data: _data,
            type: 'column',
            color: 'transparent',
            dataLabels: {
              enabled: true,
              align: 'left',
              y: -5,
              format: '{y} шт.',
              style: {
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                fontSize: '14px',
                fontWeight: '400'
              }
            },
            states: {
              hover: {
                enabled: false,
                color: '#fed63f'
              },
              inactive: {
                opacity: 1
              }
            },
            minPointLength: 10
          }, {
            data: percentage,
            name: 'Доходность',
            type: 'spline',
            color: '#fed63f',
            yAxis: 1,
            dataLabels: {
              enabled: true,
              y: 30,
              format: '{y} %',
              style: {
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                fontSize: '14px',
                fontWeight: '400'
              }
            },
            states: {
              hover: {
                enabled: true,
                color: '#fed63f'
              },
              inactive: {
                opacity: 1
              }
            },
            point: {
              events: {
                mouseOver: function mouseOver(_ref2) {
                  var target = _ref2.target;
                  if (!showGridLine) return;
                  var magicNumber = 69;
                  vr.style.left = "".concat(target.clientX + columnChartPadding + magicNumber - scrolledColumnChart.scrollLeft, "px"); // vr.style.left = `${
                  //     target.clientX -
                  //     target.pointWidth / 2 +
                  //     columnChartPadding +
                  //     magicNumber -
                  //     scrolledColumnChart.scrollLeft
                  // }px`;

                  vr.style.marginLeft = '';
                  vr.classList.add('active');
                },
                mouseOut: function mouseOut() {
                  vr.classList.remove('active');
                }
              }
            }
          }],
          legend: false
        });
        scrolledColumnChart = columnChart.querySelector('.highcharts-scrolling');
      }

      function smoothLeftScroll(value) {
        financesTable.scrollTo({
          left: value,
          behavior: 'smooth'
        });
        scrolledLineChart.scrollTo({
          left: value,
          behavior: 'smooth'
        });
        scrolledColumnChart.scrollTo({
          left: value,
          behavior: 'smooth'
        });
      }
    })(); // (function () {
    //     const objectLocation = $('.object-location');
    //     if (objectLocation.length === 0) return;
    //     ymaps.ready(function () {
    //         const myMap = new ymaps.Map('map', {
    //             center: [55.749511, 37.537083],
    //             zoom: 15,
    //             controls: ['zoomControl'],
    //         });
    //         const myPlacemark = new ymaps.Placemark(
    //             [55.749511, 37.537083],
    //             {
    //                 hintContent: '123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»',
    //                 balloonContent: '123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»',
    //             },
    //             {
    //                 preset: 'islands#icon',
    //                 iconColor: '#fed63f',
    //             }
    //         );
    //         myMap.behaviors.disable('scrollZoom');
    //         myMap.geoObjects.add(myPlacemark);
    //     });
    // })();


    (function () {
      var object = $('.object-new');
      if (object.length === 0) return;
      var objectLinks = $('.object__navigation-link');
      var objectSections = document.querySelectorAll('.object__section');

      if (window.matchMedia('(min-width: 768px)').matches) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              objectLinks.removeClass('active');
              var sectionId = entry.target.id;
              if (!sectionId) return;
              var relatedLink = objectLinks.filter("[data-scroll-to=".concat(sectionId, "]"));
              relatedLink.addClass('active');
            }
          });
        }, {
          rootMargin: '-50% 0% -50% 0%',
          root: null
        });
        objectSections.forEach(function (section) {
          return observer.observe(section);
        });
      }

      objectLinks.on('click', function (e) {
        e.preventDefault();
        var link = $(this);
        if (link.hasClass('locked')) return;
        objectLinks.removeClass('active');
        link.addClass('active');
      });
      var navigation = document.querySelector('.object-new__navigation');

      if (window.matchMedia('(max-width: 1199px)').matches) {
        var navList = navigation.querySelector('.object-new__navigation-list');
        var activeNavLink = navigation.querySelector('.object-new__navigation-link.active');

        var navItems = _toConsumableArray(navList.children);

        var navItemsLength = 0;
        navItems.forEach(function (item) {
          navItemsLength += item.getBoundingClientRect().width;
        });
        var $navList = $(navList);

        if (navItemsLength > navList.clientWidth + 1) {
          $navList.slick({
            dots: false,
            rows: 0,
            arrows: false,
            infinite: false,
            variableWidth: true,
            touchThreshold: 10,
            speed: 200,
            swipeToSlide: true // edgeFriction: 1,

          });

          if (activeNavLink) {
            var parentSlide = activeNavLink.parentNode;

            var index = _toConsumableArray($navList.slick('getSlick').$slides).indexOf(parentSlide);

            $navList.slick('slickGoTo', index);
          }
        } else {
          navigation.classList.add('full');
        }
      }
    })();

    (function () {
      var objectPlans = $('.object-plans');
      if (objectPlans.length === 0) return;
      var slider = $('.object-plans__slider');
      slider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true
      });
    })();

    (function () {
      var progressBars = document.querySelectorAll('.object-progress');
      if (progressBars.length === 0) return;
      progressBars.forEach(function (el) {
        var bar = el.querySelector('.object-progress__bar');
        var label = el.querySelector('.object-progress__label');
        var widths = {
          el: el.getBoundingClientRect().width,
          bar: bar.getBoundingClientRect().width,
          label: label.getBoundingClientRect().width
        };
        var rightEmptySpace = widths.el - widths.bar; // if (widths.bar < widths.label) {
        //     label.style.left = widths.bar + 'px';
        // } else {
        //     label.style.right = widths.el - widths.bar + 'px';
        // }

        if (widths.label < rightEmptySpace) {
          label.style.left = widths.bar + 'px';
        } else {
          label.style.right = rightEmptySpace + 'px';
        }
      });
    })();

    (function () {
      var objectSlider = $('.object-slider');
      if (objectSlider.length === 0) return;
      var slider = $('.object-slider__slider');
      slider.slick({
        rows: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true
      });
      $('.object-slider__play').modalVideo({
        allowAutoplay: true
      });
    })();

    (function () {
      var object = $('.object');
      if (object.length === 0) return;
      var objectLinks = $('.object__navigation-link');
      var objectSections = document.querySelectorAll('.object__section');

      if (window.matchMedia('(min-width: 768px)').matches) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              objectLinks.removeClass('active');
              var sectionId = entry.target.id;
              if (!sectionId) return;
              var relatedLink = objectLinks.filter("[data-scroll-to=".concat(sectionId, "]"));
              relatedLink.addClass('active');
            }
          });
        }, {
          rootMargin: '-50% 0% -50% 0%',
          root: null
        });
        objectSections.forEach(function (section) {
          return observer.observe(section);
        });
      }

      objectLinks.on('click', function (e) {
        e.preventDefault();
        var link = $(this);
        if (link.hasClass('locked')) return;
        objectLinks.removeClass('active');
        link.addClass('active');
      });
    })();

    (function () {
      var partnerFriends = document.querySelector('.partner-friends');
      if (!partnerFriends) return;
      var headers = partnerFriends.querySelectorAll('.partner-friends__header');
      headers.forEach(function (header) {
        header.addEventListener('click', function (e) {
          var content = header.nextElementSibling;
          header.classList.toggle('active');
          header.parentElement.classList.toggle('active');
          $(content).slideToggle(200);
        });
      });
      var wrapper = partnerFriends.querySelector('.partner-friends__wrapper');
      new SimpleBar(wrapper, {
        autoHide: false
      });
    })();

    (function () {
      var partnerLinks = document.querySelector('.partner-links');
      if (!partnerLinks) return;
      var copyBtns = partnerLinks.querySelectorAll('.copy');
      copyBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var input = btn.previousElementSibling;
          input.disabled = false;
          input.select();
          input.setSelectionRange(0, 99999);
          document.execCommand('copy');
          input.disabled = true;
        });
      });
      var headers = partnerLinks.querySelectorAll('.partner-links__header');
      headers.forEach(function (header) {
        header.addEventListener('click', function (e) {
          console.log(e.target);
          var content = header.nextElementSibling;
          header.classList.toggle('active');
          header.parentElement.classList.toggle('active');
          $(content).slideToggle(200);
        });
      });
      var wrapper = partnerLinks.querySelector('.partner-links__wrapper');
      new SimpleBar(wrapper, {
        autoHide: false
      });
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
      stepsIcons[0].classList.add('active');

      function changeStepNumber() {
        var options = {
          rootMargin: '0px 0px -90% 0px',
          root: null,
          threshold: [0, 0.1, 0.3]
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
                var targetStepIcon = stepsIcons[targetIndex];
                if (currentStepIndex === targetIndex) return;
                currentStep.classList.remove('active');
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
          }, 0);
        }
      }
    })();

    (function () {
      var profitCalc = document.querySelector('.profit-calc');
      if (!profitCalc) return;
      var investmentRangeSlider = document.querySelector('.profit-calc__investment-range');
      var invsestmentValue = document.querySelector('.profit-calc__investment-value'); // const incomeRangeSlider = document.querySelector('.profit-calc__income-range');

      var objectLink = document.querySelector('.profit-calc__object-link');
      var format = wNumb({
        decimals: 0,
        thousand: ' '
      });
      var objectsNav = $('.profit-calc__objects-nav');
      var objectsSlider = $('.profit-calc__objects-slider');
      var objects = objectsSlider.find('.profit-object');
      objects.each(function (_, object) {
        initValueEdit($(object));
      });
      var initialValue = 1000000;
      initRangeSlider();
      /** init and interact with sliders */

      objectsSlider.on('init', function (e, slick) {
        var currentSlide = $(slick.$slides[slick.currentSlide]);
        var object = $(currentSlide.children()[0]);
        updateObjectData(object, initialValue);
        updateObjectLink(object);
      });
      objectsSlider.on('afterChange', function (e, slick, currentSlide, nextSlide) {
        // if (currentSlide === nextSlide) return;
        var slide = $(slick.$slides[currentSlide]);
        var object = $(slide.children()[0]);
        var minValue = object.data('min');
        var maxValue = object.data('max');
        var step = object.data('step');
        var currentRangeValue = parseInt(investmentRangeSlider.noUiSlider.get());
        var startValue = maxValue < currentRangeValue ? maxValue : currentRangeValue;
        investmentRangeSlider.noUiSlider.updateOptions({
          start: startValue,
          step: step,
          range: {
            min: 0,
            max: maxValue
          },
          padding: [minValue, 0]
        });
        animateRangeSlider(); // updateObjectData(object, startValue);
        // updateObjectLink(object);
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
        accessibility: false,
        asNavFor: objectsNav
      });
      /**
       * interactions with range slider
       */

      investmentRangeSlider.noUiSlider.on('update', function (values, handle) {
        var value = +values[handle];
        invsestmentValue.textContent = format.to(value);
        var currentSlide = objectsSlider.find('.slick-current');
        var object = $(currentSlide.children()[0]);
        updateObjectData(object, value);
        updateObjectLink(object);
      });
      investmentRangeSlider.noUiSlider.on('change', function () {
        animateRangeSlider();
      }); // helper functions

      function initRangeSlider() {
        var firstObject = $($(profitCalc).find('.profit-object')[0]);
        var minValue = firstObject.data('min');
        var maxValue = firstObject.data('max');
        var stepValue = firstObject.data('step');
        noUiSlider.create(investmentRangeSlider, {
          start: initialValue,
          step: stepValue,
          animate: false,
          connect: 'lower',
          range: {
            min: 0,
            max: maxValue
          },
          padding: [minValue, 0]
        });
        updateObjectData(firstObject, initialValue); // incomeRangeSliderInit(minValue, maxValue, stepValue, initialValue, basicRate);
      }

      function initValueEdit(object) {
        var incomeNode = object.find('.profit-object__income .value');
        var shareNode = object.find('.profit-object__share .value');
        var rateNode = object.find('.profit-object__rate .value');
        var stepNode = object.find('.profit-object__step .value');
        var minValue = object.data('min');
        var maxValue = object.data('max');
        var stepValue = object.data('step');
        var rateValue = object.data('rate');
        incomeNode.on('blur', function (e) {
          var newIncome = format.from(incomeNode.text().trim());
          incomeNode.text(format.to(newIncome));
          var currentRate = parseFloat(rateNode.text());
          var newSliderValue = newIncome * 12 / currentRate * 100;
          investmentRangeSlider.noUiSlider.set(newSliderValue);
          animateRangeSlider();
        });
        shareNode.on('blur', function (e) {
          var newShare = format.from(shareNode.text().trim());
          if (isNaN(newShare)) newShare = minValue / stepValue;
          var newSliderValue = newShare * stepValue;
          investmentRangeSlider.noUiSlider.set(newSliderValue);
          animateRangeSlider();
        });
        stepNode.on('blur', function (e) {
          var newStep = format.from(stepNode.text().trim());
          if (isNaN(newStep) || !newStep) newStep = parseInt(stepValue);
          object.attr('data-custom-step', newStep);
          updateRangesStep(object, newStep);
        });
        rateNode.on('blur', function (e) {
          var newRate = parseFloat(rateNode.text().trim());
          if (isNaN(newRate)) newRate = parseFloat(rateValue);
          object.attr('data-custom-rate', newRate);
          incomeNode.text(format.to(investmentRangeSlider.noUiSlider.get() * (newRate / 100) / 12));
        });
      }

      document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && e.target.classList.contains('value') && e.target.isContentEditable) {
          e.preventDefault();
          e.stopPropagation();
          e.target.blur();
        }
      });

      function updateObjectData(object, value) {
        var incomeNode = object.find('.profit-object__income .value');
        var shareNode = object.find('.profit-object__share .value');
        var rateNode = object.find('.profit-object__rate .value');
        var stepNode = object.find('.profit-object__step .value');
        var basicRate = object.data('rate');
        var customRate = parseInt(object.attr('data-custom-rate'));
        var basicStep = object.data('step');
        var customStep = parseInt(object.attr('data-custom-step'));
        var rate = customRate ? customRate : basicRate;
        var step = customStep ? customStep : basicStep;
        shareNode.text(format.to(Math.floor(value / step)));
        incomeNode.text(format.to(value * rate / 100 / 12));
        rateNode.text(rate);
        stepNode.text(format.to(step));
      }

      function updateObjectLink(object) {
        var value = parseInt(investmentRangeSlider.noUiSlider.get());
        objectLink.href = object.data('link') + '/' + value;
      }

      function updateRangesStep(object, step) {
        var minValue = object.data('min');
        var maxValue = object.data('max');
        var minPadding = step >= minValue ? step : step * Math.ceil(minValue / step);
        var maxPadding = maxValue % step === 0 ? 0 : step;
        investmentRangeSlider.noUiSlider.updateOptions({
          step: step,
          padding: [minPadding, maxPadding]
        }, false);
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

    (function () {
      var projectCalc = $('.project-calc');
      if (projectCalc.length === 0) return;
      var form = $('.project-calc__form');
      var formatedInputs = projectCalc.find('input[data-format]');
      var allFormInputs = projectCalc.find('input');
      var allRequiredInputs = allFormInputs.filter('[required]');

      function formLogic() {
        // check whether all required inputs are filled
        var requiredInputsFilled = _toConsumableArray(allRequiredInputs).every(function (input) {
          return input.value.trim().length > 0;
        }); // hideInputErrors(form);
        // if (!requiredInputsFilled) {
        //     [...allRequiredInputs].map(input => {
        //         if (input.value.length === 0) showInputError(input, 'Поле обязательно для заполнения')
        //     })
        //     return;
        // };


        if (!requiredInputsFilled) return;

        _toConsumableArray(formatedInputs).map(function (input) {
          var val = input.value;
          var type = input.dataset.format;

          if (val.length > 0) {
            var newVal = formatPatterns[type].from(val);
            input.value = newVal;
          }
        });

        var formData = form.serialize(); //format inputs back

        _toConsumableArray(formatedInputs).map(function (input) {
          var val = parseInt(input.value);
          var type = input.dataset.format;

          if (val) {
            var newVal = formatPatterns[type].to(val);
            input.value = newVal;
          }
        }); // postData('url', formData).then((data) => {
        //     //if all is fine
        //     updateData(data);
        // });

      }

      allFormInputs.each(function (_, input) {
        $(input).on('change', function (e) {
          formLogic();
        });
      });

      function updateData(data) {
        $('#monthIncome').text(data.monthIncome);
        $('#monthExpanses').text(data.monthExpanses);
        $('#objectValue').text(data.objectValue);
        $('#operatingIncome').text(data.operatingIncome);
        $('#vatRecovery').text(data.vatRecovery);
        $('#vatOffset').text(data.vatOffset);
      }

      var formatPatterns = {
        meter: wNumb({
          decimals: 0,
          thousand: ' ',
          suffix: ' м²'
        }),
        ruble: wNumb({
          decimals: 0,
          thousand: ' ',
          suffix: " \u20BD"
        })
      };
      formatedInputs.each(function (_, input) {
        var type = $(input).data('format');
        var currentValue = $(input).val() || '';
        $(input).on('input', function (e) {
          var val = $(input).val();
          /^[0-9\s]*$/.test(val) ? currentValue = val : input.value = currentValue;
        });
        $(input).on('blur', function (e) {
          var val = parseInt($(input).val().split(' ').join(''));
          if (!val) return;
          $(input).val(formatPatterns[type].to(val));
        });
        $(input).on('focus', function (e) {
          var val = $(input).val();
          if (val.length === 0) return;
          $(input).val(formatPatterns[type].from(val));
        });
      });
    })();

    (function () {
      var projectSelects = $('.project-select');
      var options = $('.project-select__option');
      var taxTypeSelects = projectSelects.filter('[data-type="taxType"]');
      projectSelects.on('click', function (e) {
        e.stopPropagation();
        var optionsWrap = $(this).find('.project-select__options');
        showSelect(this, optionsWrap);
      });
      options.on('click', function (e) {
        e.stopPropagation();
        var val = $(this).data('value');
        var labelValue = $(this).html();
        var parentSelect = $(this).parents('.project-select');
        var optionsWrap = parentSelect.find('.project-select__options');
        var selected = parentSelect.find('.project-select__selected');
        var input = parentSelect.find('.project-select__input');
        selected.html(labelValue);
        input.val(val);
        input.trigger('change');

        if (parentSelect.attr('id') === 'ownerType') {
          var type = $(this).attr('data-type');
          taxTypeSelects.each(function (_, select) {
            var input = $(select).find('.project-select__input');
            var selected = $(select).find('.project-select__selected');
            var sameTypeoption = $(select).find(".project-select__option[data-type=".concat(type, "]"));
            input.val(sameTypeoption.data('value'));
            selected.text(sameTypeoption.data('value'));
          });
        }

        hideSelect(parentSelect, optionsWrap);
      });
      $(document).on('click', function () {
        hideActiveSelects();
      });

      function showSelect(select, optionsWrap) {
        hideActiveSelects();
        $(select).addClass('active');
        optionsWrap.fadeIn(300);
      }

      function hideSelect(select, optionsWrap) {
        $(select).removeClass('active');
        optionsWrap.fadeOut(300);
      }

      function hideActiveSelects() {
        var activeSelects = projectSelects.filter('.active');
        if (activeSelects.length === 0) return;
        activeSelects.each(function (_, select) {
          var options = $(select).find('.project-select__options');
          $(select).removeClass('active');
          options.fadeOut(300);
        });
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