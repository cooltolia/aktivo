function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}jQuery;var API="/app/ajax/";Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}});var phoneMask="+7 (f99) 999-99-99",scrollBarWidth=getScrollbarWidth();function getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}$.noConflict(),jQuery(document).ready(function(t){if(t("body").removeClass("pageload"),"function"!=typeof Promise)document.createElement("picture"),a="/js/polyfills/browser.js",o=r,(i=document.createElement("script")).src=a,i.onload=function(){o()},i.onerror=function(){throw new Error("Failed to load script "+a)},document.head.appendChild(i);else{var e=performance.now();r();var n=performance.now();console.log("globalInitFunction took "+Math.floor(n-e)+"ms.")}var a,o,i;function r(){t.fancybox.defaults.hash=!1;var e,n,a,o,i,r,c,s;function l(e,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{processData:!0,contentType:"application/x-www-form-urlencoded"};return new Promise(function(o,i){t.ajax({url:API+e,type:"POST",data:n,processData:a.processData,contentType:a.contentType,success:function(t){var e=function(t){var e;try{e=JSON.parse(t)}catch(t){}return e}(t);o(e)},error:function(t){i(t)}})})}Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}}),e=t(".authorization__toggle"),n=t(".authorization__logged"),a=t(".authorization__list"),n.on("click",function(){e.toggleClass("active"),a.hasClass("active")?(a.slideUp(),a.removeClass("active")):(a.slideDown(),a.addClass("active"))}),o=t(".base-input__input"),i=t(".base-input-autocomplete"),o.each(function(){""!==t(this).val().trim()&&t(this).addClass("hasValue"),t(this).on("blur",function(){""!==t(this).val().trim()?t(this).addClass("hasValue"):t(this).removeClass("hasValue")})}),i.each(function(){var e=t(this).find("input"),n=t(this).find("label");e.on("focus",function(){n.addClass("js-focus")}),e.on("blur",function(){n.removeClass("js-focus")})}),r=t(".base-select__input"),c=t(".base-select__options-list"),s=t(".base-select__options-item"),0!=r.length&&(""!==r.val().trim()&&r.addClass("hasValue"),r.on("blur",function(){""!==r.val().trim()?r.addClass("hasValue"):r.removeClass("hasValue")}),r.on("click",function(){r.parent().addClass("active"),c.slideDown()}),t(document).on("click",function(t){r.parent().hasClass("active")&&t.target!==r&&0===r.parent().has(t.target).length&&(r.parent().removeClass("active"),c.slideUp())}),s.each(function(){t(this).on("click",function(e){var n=t(this).text();r.val(n),r.addClass("hasValue"),r.parent().removeClass("active"),c.slideUp()})})),function(){var e=t(".best-object-card");if(0!==e.length){var n=["#1cb96f","#fed63f","#ffa30c"];e.each(function(e,a){var o=parseInt(t(a).data("rate")),i=t(a).find(".best-object-card__rate");o>=80?i.css("color",n[0]):o<80&&o>=50?i.css("color",n[1]):i.css("color",n[2]),t(a).css("top","calc(".concat(100-o,"% + ").concat(8,"px"))})}}();var u,d,f,p=document.querySelectorAll(".application-trigger");p.length>0&&p.forEach(function(e){e.addEventListener("click",function(e){MicroModal.show("applicationModal",{disableScroll:!0,awaitCloseAnimation:!0,onShow:function(e){!function(t){t.children[0].style.paddingRight=scrollBarWidth+"px",document.body.style.paddingRight=scrollBarWidth+"px"}(e),function(e){var n=e.querySelector(".modal__form"),a=n.querySelectorAll("input");console.log(a);t("#applicationEmail");var o=t("#applicationPhone"),i="+7 (f99) 999-99-99";o.inputmask({mask:i,showMaskOnHover:!1}),a.forEach(function(e){return e.addEventListener("focus",function(){return function(e){var n=t(e),a=n.siblings(".error");n.removeClass("error"),a.slideUp(200)}(e)})}),n.addEventListener("submit",function(e){if(e.preventDefault(),s=o.val(),!Inputmask.isValid(s,{mask:i}))return a="Неверно указан телефон",r=t(o),c=r.siblings(".error"),r.addClass("error"),c.text(a),void c.slideDown(200);var a,r,c,s,u=t(n).serialize();l("url",u).then(function(t){MicroModal.close("applicationModal")})})}(e)},onClose:function(t){!function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.children[0].style.paddingRight="",document.body.style.paddingRight="",e&&t.addEventListener("animationend",function t(){this.remove(),this.removeEventListener("animationend",t)})}(t,!1)}})})}),u=t(".main-header__navigation"),t(".hamburger").click(function(){t(this).toggleClass("active"),u.toggleClass("active"),t("body").toggleClass("menu-opened")}),0!==(d=t(".index-slider, .index-bottom__slider")).length&&d.each(function(e,n){t(n).slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0})}),f=t(".main-nav__link.has-subnav"),window.matchMedia("(max-width: 1024px)").matches&&f.on("click",function(e){e.preventDefault(),t(this).next().slideToggle(300)}),tippy(".object-card__tooltip",{placement:"bottom",arrow:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'}),function(){if(document.querySelector(".partners-wrapper")){var t=_toConsumableArray(document.querySelectorAll(".partners-wrapper__step")),e=[document.querySelector(".partners-choice"),document.querySelector(".partners-status"),document.querySelector(".partners-income")];!function(){var n={rootMargin:"0px 0px -90% 0px",root:null,threshold:0};if("IntersectionObserver"in window){var a=new IntersectionObserver(function(n){n.forEach(function(n){var a=n.isIntersecting;if(a){var o=e.indexOf(n.target),i=t.find(function(t){return t.classList.contains("active")}),r=t.indexOf(i);if(r===o)return;i.classList.remove("active");var c=t[o];c.classList.add("active")}})},{rootMargin:n.rootMargin,root:n.root,threshold:n.threshold});e.forEach(function(t){return a.observe(t)})}else setTimeout(function(){items.forEach(function(t){t.classList.add("animated")})},300)}()}}(),function(){var e=document.querySelector(".profit-calc");if(e){var n,a,o,i,r,c=document.querySelector(".profit-calc__investment-range"),s=document.querySelector(".profit-calc__investment-value"),l=document.querySelector(".profit-calc__income-range"),u=wNumb({decimals:0,suffix:" ₽",thousand:" "}),d=t(".profit-calc__objects-nav"),f=t(".profit-calc__objects-slider"),p=1e6;n=t(t(e).find(".profit-object")[0]),a=n.data("min"),o=n.data("max"),i=n.data("step"),r=n.find(".profit-object__rate").data("rate"),noUiSlider.create(c,{start:p,step:i,animate:!1,connect:"lower",range:{min:a,max:o}}),v(n,p),function(t,e,n,a,o){var i=t*o/100,r=e*o/100,c=a*o/100,s=n*o/100;noUiSlider.create(l,{start:c,step:s,animate:!1,range:{min:i,max:r}})}(a,o,i,p,r),f.on("init",function(e,n){var a=t(n.$slides[n.currentSlide]);v(t(a.children()[0]),p)}),f.on("beforeChange",function(e,n,a,o){if(a!==o){var i=t(n.$slides[o]),r=t(i.children()[0]),s=r.data("min"),u=r.data("max"),d=r.data("step"),f=r.find(".profit-object__rate").data("rate"),p=parseInt(c.noUiSlider.get()),h=u<p?u:p;c.noUiSlider.updateOptions({start:h,step:d,range:{min:s,max:u}});var g=s*f/100,_=u*f/100,b=h*f/100,y=d*f/100;l.noUiSlider.updateOptions({start:b,step:y,range:{min:g,max:_}}),m(),v(r,h)}}),d.slick({rows:0,slidesToScroll:1,variableWidth:!0,asNavFor:f,arrows:!1,focusOnSelect:!0}),f.slick({rows:0,slidesToShow:1,slidesToScroll:1,arrows:!1,asNavFor:d}),c.noUiSlider.on("update",function(e,n){s.textContent=u.to(+e[n]);var a=f.find(".slick-current"),o=t(a.children()[0]);v(o,e[n]),function(t,e){var n=t.find(".profit-object__rate").data("rate");l.noUiSlider.set(e*n/100)}(o,e[n])}),l.noUiSlider.on("slide",function(e,n){var a=f.find(".slick-current");!function(t,e){var n=t.find(".profit-object__rate").data("rate");c.noUiSlider.set(e/n*100)}(t(a.children()[0]),e[n])}),c.noUiSlider.on("change",function(){m()}),l.noUiSlider.on("change",function(){m()})}function v(t,e){var n=t.find(".profit-object__income"),a=t.find(".profit-object__share"),o=t.find(".profit-object__rate").data("rate"),i=t.data("step");a.text(Math.floor(e/i)),n.text(u.to(e*o/100/12))}function m(){var e=t(".noUi-connect"),n=t(".noUi-origin");e.addClass("transition"),n.addClass("transition"),setTimeout(function(){e.removeClass("transition"),n.removeClass("transition")},300)}}(),function(){var e=t(".project-calc");if(0!==e.length){var n=t(".project-calc__form"),a=e.find("input[data-format]"),o=e.find("input"),i=o.filter("[required]");o.each(function(e,n){t(n).on("change",function(t){c()})});var r={meter:wNumb({decimals:0,thousand:" ",suffix:" м²"}),ruble:wNumb({decimals:0,thousand:" ",suffix:" ₽"})};a.each(function(e,n){var a=t(n).data("format"),o=t(n).val()||"";t(n).on("input",function(e){var a=t(n).val();/^[0-9\s]*$/.test(a)?o=a:n.value=o}),t(n).on("blur",function(e){var o=parseInt(t(n).val().split(" ").join(""));o&&t(n).val(r[a].to(o))}),t(n).on("focus",function(e){var o=t(n).val();0!==o.length&&t(n).val(r[a].from(o))})})}function c(){if(_toConsumableArray(i).every(function(t){return t.value.trim().length>0})){_toConsumableArray(a).map(function(t){var e=t.value;if(e.length>0){var n=parseInt(e);t.value=n}});var e=n.serialize();_toConsumableArray(a).map(function(t){var e=parseInt(t.value),n=t.dataset.format;if(e.length>0){var a=r[n].to(e);t.value=a}}),l("url",e).then(function(e){!function(e){t("#monthIncome").text(e.monthIncome),t("#monthExpanses").text(e.monthExpanses),t("#objectValue").text(e.objectValue),t("#operatingIncome").text(e.operatingIncome),t("#vatRecovery").text(e.vatRecovery),t("#vatOffset").text(e.vatOffset)}(e)})}}}(),function(){var e=t(".project-select"),n=t(".project-select__option");function a(){var n=e.filter(".active");0!==n.length&&n.each(function(e,n){var a=t(n).find(".project-select__options");t(n).removeClass("active"),a.fadeOut(300)})}e.on("click",function(e){e.stopPropagation(),function(e,n){a(),t(e).addClass("active"),n.fadeIn(300)}(this,t(this).find(".project-select__options"))}),n.on("click",function(e){e.stopPropagation();var n=t(this).html(),a=t(this).parents(".project-select"),o=a.find(".project-select__options"),i=a.find(".project-select__selected"),r=a.find(".project-select__input");i.html(n),r.val(n),r.trigger("change"),function(e,n){t(e).removeClass("active"),n.fadeOut(300)}(a,o)}),t(document).on("click",function(){a()})}()}});