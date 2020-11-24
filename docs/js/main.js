function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}jQuery;var API="/app/ajax/";Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}});var phoneMask="+7 (f99) 999-99-99",scrollBarWidth=getScrollbarWidth();function getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}AOS.init({disable:"mobile",once:!0,duration:750}),$.noConflict(),jQuery(document).ready(function(t){if(t("body").removeClass("pageload"),"function"!=typeof Promise)document.createElement("picture"),a="/js/polyfills/browser.js",o=r,(i=document.createElement("script")).src=a,i.onload=function(){o()},i.onerror=function(){throw new Error("Failed to load script "+a)},document.head.appendChild(i);else{var e=performance.now();r();var n=performance.now();console.log("globalInitFunction took "+Math.floor(n-e)+"ms.")}var a,o,i;function r(){var e,n=function(t,e,n){var a;return function(){var o=this,i=arguments,r=n&&!a;clearTimeout(a),a=setTimeout(function(){a=null,n||t.apply(o,i)},e),r&&t.apply(o,i)}};function a(e,n){var a=t(e),o=a.siblings(".error");a.addClass("error"),o.text(n),o.slideDown(200)}function o(e){var n=t(e),a=n.siblings(".error");n.removeClass("error"),a.slideUp(200)}function i(e,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{processData:!0,contentType:"application/x-www-form-urlencoded"};return new Promise(function(o,i){t.ajax({url:API+e,type:"POST",data:n,processData:a.processData,contentType:a.contentType,success:function(t){var e=function(t){var e;try{e=JSON.parse(t)}catch(t){}return e}(t);o(e)},error:function(t){i(t)}})})}function r(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=t(e).offset().top;t("html, body").animate({scrollTop:o-a},n)}function s(e){var n=e.querySelector(".account-settings__form"),r=n.querySelectorAll("input"),s=(t("#settingsEmail"),t("#settingsPhone")),c="+7 (f99) 999-99-99";s.inputmask({mask:c,showMaskOnHover:!1}),r.forEach(function(t){return t.addEventListener("focus",function(){return o(t)})}),n.addEventListener("submit",function(e){var o;(e.preventDefault(),o=s.val(),Inputmask.isValid(o,{mask:c}))?i("url",t(n).serialize()).then(function(t){MicroModal.close("accountSettingsModal")}):a(s,"Неверно указан телефон")})}Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}}),t("[data-scroll-to]").on("click",function(e){var n=t(this),a=n.data("scroll-to"),o=t("#".concat(a)),i=n.data("scroll-offset")||0;1===o.length&&r(o,300,i)}),t(".about-top__video-snippet").modalVideo({allowAutoplay:!0}),function(){document.querySelector(".account-details")&&(document.querySelectorAll(".tt-dropdown-menu").forEach(function(t){new SimpleBar(t,{autoHide:!1})}),document.querySelectorAll(".account-details__file-upload").forEach(function(t){var e,n,a;n=(e=t).querySelector(".account-details__upload-status"),(a=new Dropzone(e,{url:"upload.php",maxFiles:1,maxFilesize:2,autoProcessQueue:!1,acceptedFiles:"image/*",dictFileTooBig:"Слишком большой вес файла",dictInvalidFileType:"Выберите изображение"})).on("uploadprogress",function(t){}),a.on("addedfile",function(t,a){e.classList.remove("error"),e.classList.add("success"),n.textContent=""}),a.on("success",function(t){}),a.on("error",function(t,a){e.classList.remove("success"),e.classList.add("error"),n.textContent=a})}))}(),(e=document.querySelectorAll(".account-document")).length>0&&e.forEach(function(e){var n=e.querySelector(".account-document__header"),a=e.querySelector(".account-document__body");n.addEventListener("click",function(){e.classList.toggle("active"),n.classList.toggle("active"),t(a).slideToggle(250)})}),function(){var e=document.querySelector(".account-nav");if(e&&window.matchMedia("(max-width: 1199px)").matches){var n=e.querySelector(".account-nav__list"),a=e.querySelector(".account-nav__link.active"),o=_toConsumableArray(n.children),i=0;o.forEach(function(t){i+=t.getBoundingClientRect().width});var r=t(n);if(i>n.clientWidth+1){if(r.slick({dots:!1,rows:0,arrows:!1,infinite:!1,variableWidth:!0,touchThreshold:10,speed:200,swipeToSlide:!0}),a){var s=a.parentNode,c=_toConsumableArray(r.slick("getSlick").$slides).indexOf(s);r.slick("slickGoTo",c)}}else e.classList.add("full")}}();var c,l,d,u,f,v,p,m,h=document.querySelectorAll(".application-trigger");h.length>0&&h.forEach(function(e){e.addEventListener("click",function(e){MicroModal.show("applicationModal",{disableScroll:!0,awaitCloseAnimation:!0,onShow:function(e){S(e),function(e){var n=e.querySelector(".modal__form"),r=n.querySelectorAll("input");console.log(r);t("#applicationEmail");var s=t("#applicationPhone"),c="+7 (f99) 999-99-99";s.inputmask({mask:c,showMaskOnHover:!1}),r.forEach(function(t){return t.addEventListener("focus",function(){return o(t)})}),n.addEventListener("submit",function(e){if(e.preventDefault(),o=s.val(),Inputmask.isValid(o,{mask:c})){var o,r=t(n).serialize();i("url",r).then(function(t){MicroModal.close("applicationModal")})}else a(s,"Неверно указан телефон")})}(e)},onClose:function(t){L(t,!1)}})})}),c=t(".authorization__toggle"),l=t(".authorization__logged"),d=t(".authorization__list"),l.on("click",function(){c.toggleClass("active"),d.hasClass("active")?(d.slideUp(),d.removeClass("active")):(d.slideDown(),d.addClass("active"))}),document.querySelectorAll(".authorization__settings").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),MicroModal.show("accountSettingsModal",{disableScroll:!0,disableFocus:!0,awaitCloseAnimation:!0,onShow:function(t){S(t),s(t)},onClose:function(t){L(t,!1)}})})}),u=t(".base-input__input"),f=t(".base-input-autocomplete"),u.each(function(){""!==t(this).val().trim()&&t(this).addClass("hasValue"),t(this).on("blur",function(){""!==t(this).val().trim()?t(this).addClass("hasValue"):t(this).removeClass("hasValue")})}),f.each(function(){var e=t(this).find("input"),n=t(this).find("label");e.on("focus",function(){n.addClass("js-focus")}),e.on("blur",function(){n.removeClass("js-focus")})}),v=t(".base-select__input"),p=t(".base-select__options-list"),m=t(".base-select__options-item"),0!=v.length&&(""!==v.val().trim()&&v.addClass("hasValue"),v.on("blur",function(){""!==v.val().trim()?v.addClass("hasValue"):v.removeClass("hasValue")}),v.on("click",function(){v.parent().addClass("active"),p.slideDown()}),t(document).on("click",function(t){v.parent().hasClass("active")&&t.target!==v&&0===v.parent().has(t.target).length&&(v.parent().removeClass("active"),p.slideUp())}),m.each(function(){t(this).on("click",function(e){var n=t(this).text();v.val(n),v.addClass("hasValue"),v.parent().removeClass("active"),p.slideUp()})})),function(){var e=t(".best-object-card");if(0!==e.length){var n=["#1cb96f","#fed63f","#ffa30c"];e.each(function(e,a){var o=parseInt(t(a).data("rate")),i=t(a).find(".best-object-card__rate");o>=80?i.css("color",n[0]):o<80&&o>=50?i.css("color",n[1]):i.css("color",n[2]),t(a).css("top","calc(".concat(100-o,"% + ").concat(8,"px"))})}}(),0!==t(".best-objects").length&&t(".best-objects__objects").slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0,mobileFirst:!0,infinite:!1,responsive:[{breakpoint:767,settings:{slidesToShow:2}},{breakpoint:1023,settings:{slidesToShow:2.25}},{breakpoint:1199,settings:{slidesToShow:3}}]}),0!==t(".contacts").length&&ymaps.ready(function(){var t=new ymaps.Map("map",{center:[55.749511,37.537083],zoom:15,controls:["zoomControl"]}),e=new ymaps.Placemark([55.749511,37.537083],{hintContent:"123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»",balloonContent:"123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»"},{preset:"islands#icon",iconColor:"#fed63f"});t.behaviors.disable("scrollZoom"),t.geoObjects.add(e)});var g,b,_,y,w;function S(t){t.children[0].style.paddingRight=scrollBarWidth+"px",document.body.style.paddingRight=scrollBarWidth+"px"}function L(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.children[0].style.paddingRight="",document.body.style.paddingRight="";var n=document.activeElement;n&&n.focus&&n.blur(),e&&t.addEventListener("animationend",function t(){this.remove(),this.removeEventListener("animationend",t)})}!function(){if(0!==t(".faq").length){var e=t(".faq__questions-link"),n=t(".faq__answer"),a=t(".faq__content"),o=0;o=window.matchMedia("(max-width: 768px)").matches?50:150,e.on("click",function(i){i.preventDefault();var s=t(this);if(!s.hasClass("active")){var c=n.filter(".active"),l=e.filter(".active"),d=s.data("target"),u=n.filter("#"+d);l.removeClass("active"),c.fadeOut(300,function(){c.removeClass("active"),s.addClass("active"),u.addClass("active"),u.fadeIn(300),r(a,300,o)})}})}}(),g=t(".main-header__navigation"),b=t(".alert-banner"),_=b.length>0?b.height()+75:75,g.css("top",_+"px"),t(".hamburger").click(function(){t(this).toggleClass("active"),g.toggleClass("active"),t("body").toggleClass("menu-opened")}),0!==(y=t(".index-slider, .index-bottom__slider")).length&&y.each(function(e,n){t(n).slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0})}),w=t(".main-nav__link.has-subnav"),window.matchMedia("(max-width: 1024px)").matches&&w.on("click",function(e){e.preventDefault(),t(this).next().slideToggle(300)}),function(){if(document.querySelector(".object-calc")){var t=document.querySelector(".object-calc__investment-range"),e=document.querySelector(".object-calc__investment-value"),n=document.querySelector(".object-calc__button"),a=document.querySelector(".object-calc__income-data"),o=a.querySelector(".object-calc__income .value"),r=a.querySelector(".object-calc__share .value"),s=a.querySelector(".object-calc__step .value"),c=a.querySelector(".object-calc__rate .value"),l=parseInt(a.dataset.initial),d=parseInt(a.dataset.min),u=parseInt(a.dataset.max),f=parseInt(a.dataset.step),v=parseFloat(a.dataset.rate),p=null,m=null,h=wNumb({decimals:0,thousand:" "});o.addEventListener("blur",function(e){var n=h.from(o.textContent.trim());o.textContent=h.to(n);var a=12*n/parseFloat(c.textContent)*100;t.noUiSlider.set(a),g()}),r.addEventListener("blur",function(e){var n=parseInt(r.textContent.trim());isNaN(n)&&(n=d/f);var a=n*(m||f);t.noUiSlider.set(a),g()}),s.addEventListener("blur",function(e){var n,a,o,i=h.from(s.textContent.trim());isNaN(i)&&(i=parseInt(f)),a=(n=m=i)>=d?n:n*Math.ceil(d/n),o=u%n==0?0:n,t.noUiSlider.updateOptions({step:n,padding:[a,o]},!1)}),c.addEventListener("blur",function(e){var n=parseFloat(c.textContent.trim());isNaN(n)&&(n=parseFloat(v)),p=n,o.textContent=h.to(t.noUiSlider.get()*(n/100)/12)}),document.addEventListener("keypress",function(t){13===t.keyCode&&t.target.classList.contains("value")&&t.target.isContentEditable&&(t.preventDefault(),t.stopPropagation(),t.target.blur())}),noUiSlider.create(t,{start:l,step:f,animate:!1,connect:"lower",range:{min:0,max:u},padding:[d,0]}),n.addEventListener("click",function(){var e=t.noUiSlider.get();i("url","investment=".concat(e)).then(function(t){})}),t.noUiSlider.on("update",function(t,n){console.log("update");var a=+t[n];e.textContent=h.to(a),function(t,e,n){o.textContent=h.to(t*e/100/12),r.textContent=t/n,c.textContent=e,s.textContent=h.to(n)}(a,p||v,m||f)})}function g(){var t=document.querySelector(".noUi-connect"),e=document.querySelector(".noUi-origin");t.classList.add("transition"),e.classList.add("transition"),setTimeout(function(){t.classList.remove("transition"),e.classList.remove("transition")},300)}}(),tippy(".object-card .tooltip",{placement:"bottom",arrow:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'}),t(".object-card__play").modalVideo({allowAutoplay:!0}),function(){if(0!==t(".object-finances").length){var e=document.querySelector(".object-finances__table"),a=document.querySelector("#lineChart"),o=parseInt(window.getComputedStyle(a.parentNode).paddingLeft),i=null,r=document.querySelector("#columnChart"),s=parseInt(window.getComputedStyle(r.parentNode).paddingLeft),c=null,l=e.querySelectorAll("tr:not(:first-child) td"),d=l[0].getBoundingClientRect().height,u=l[1].getBoundingClientRect().width,f=document.querySelector(".object-finances__hr"),v=document.querySelector(".object-finances__vr"),p=wNumb({decimals:2,thousand:" "}),m="12px",h=!1,g=52;window.matchMedia("(min-width: 1024px)").matches&&(m="15px",g=62,h=!0),l.forEach(function(t){t.addEventListener("mouseover",function(){var n=t.offsetParent.offsetTop+t.offsetTop+d;f.style.top="".concat(n,"px");var a=-5;1===_toConsumableArray(t.parentNode.children).indexOf(t)&&(a=parseInt(window.getComputedStyle(t).paddingLeft)-5);var o=t.offsetParent.offsetLeft+t.offsetLeft+a-e.scrollLeft;v.style.left="".concat(o,"px"),v.style.marginLeft="16px",f.classList.add("active"),v.classList.add("active")}),t.addEventListener("mouseout",function(){f.classList.remove("active"),v.classList.remove("active")})});var b=document.querySelector(".object-finances__scroll-next"),_=document.querySelector(".object-finances__scroll-prev"),y=document.querySelector(".object-finances__jump-next"),w=document.querySelector(".object-finances__jump-prev"),S=e.scrollWidth-e.clientWidth,L=n(function(t){function n(){var t=e.scrollLeft+u;_.classList.add("active"),w.classList.add("active"),t>S&&clearInterval(k),t>=S-u&&(b.classList.remove("active"),y.classList.remove("active")),W(t)}n(),k=setInterval(n,500)},200,!0),x=n(function(){function t(){var t=e.scrollLeft-u;t<=-u?clearInterval(k):(t<=0&&(_.classList.remove("active"),w.classList.remove("active")),t<=S&&(b.classList.add("active"),y.classList.add("active"),W(t)))}t(),k=setInterval(t,500)},200,!0),C=n(function(t){var n=e.scrollLeft+6*u;w.classList.add("active"),_.classList.add("active"),n>=S-6*u?(W(S),y.classList.remove("active"),b.classList.remove("active")):W(n)},200,!0),j=n(function(){var t=e.scrollLeft-6*u;t<=-u&&W(0);t<=0&&(w.classList.remove("active"),_.classList.remove("active"));t<=S&&(y.classList.add("active"),b.classList.add("active"),W(t))},200,!0);y.addEventListener("click",C),w.addEventListener("click",j);var k,q="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;if(console.log("touchDevice: ",q),q?(b.addEventListener("touchstart",L),b.addEventListener("touchend",function(){return clearInterval(k)}),_.addEventListener("touchstart",x),_.addEventListener("touchend",function(){return clearInterval(k)})):(b.addEventListener("mousedown",L),b.addEventListener("mouseup",function(){return clearInterval(k)}),_.addEventListener("mousedown",x),_.addEventListener("mouseup",function(){return clearInterval(k)})),a){var E=[99999.8,242277.779,3172259.31,1669890.65,1647254.72,2863786.35,2513992.47,2795352.5,4823505.42,2925765.61,99999.8,242277.779,3172259.31,1669890.65,1647254.72,2863786.35,2513992.47,2795352.5,4823505.42,2925765.61,null],A=u;console.log(A);var I=A*E.length;Highcharts.chart("lineChart",{chart:{type:"line",scrollablePlotArea:{minWidth:I},marginTop:60,marginLeft:60},title:!1,credits:{enabled:!1},xAxis:{categories:["Август 2017","Сентябрь 2017","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018","Август 2017","Сентябрь 2017","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018",""],opposite:!0,tickPixelInterval:A,width:A*E.length,gridLineColor:"#197F07",offset:30,lineWidth:0,tickWidth:0,labels:{align:"left",style:{color:"#9e9e9e",fontSize:m,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px"}}},yAxis:{title:!1,gridLineColor:"#f2f2f2",labels:{style:{color:"#9e9e9e",fontSize:m,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px"},formatter:function(){return this.value/1e6+"M"}}},plotOptions:{line:{color:"#fed63f"},series:{dataLabels:{enabled:!0,align:"left",y:-5,style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"},formatter:function(t){var e=parseFloat(this.y);return e<1e5?p.to(+e.toFixed(2))+" ₽":p.to(e.toFixed(2)/1e3)+" тыс. ₽"}},point:{events:{mouseOver:function(t){var e=t.target;if(h){v.style.left="".concat(e.clientX+o+54-i.scrollLeft,"px"),v.style.marginLeft="",v.classList.add("active")}},mouseOut:function(){v.classList.remove("active")}}}}},tooltip:{enabled:!1},series:[{data:E}],legend:!1}),i=a.querySelector(".highcharts-scrolling")}if(r){var T=[480,80,70,0,0,0,0,0,0,70,489,89,70,0,0,0,0,0,0,7,null],M=u,F=M*T.length;Highcharts.chart("columnChart",{chart:{scrollablePlotArea:{minWidth:F},marginTop:60,marginLeft:60},title:!1,credits:{enabled:!1},xAxis:{categories:["Август 2017","Сентябрь 2017","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018","Август 2017","Сентябрь 2017","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018",""],opposite:!0,tickPixelInterval:M,width:M*T.length,offset:30,lineWidth:0,tickWidth:0,labels:{align:"left",style:{color:"#9e9e9e",fontSize:m,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px",whiteSpace:"nowrap"}}},yAxis:[{title:!1,gridLineColor:"#f2f2f2",labels:{padding:0,style:{color:"#9e9e9e",fontSize:m,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",whiteSpace:"nowrap"}}},{visible:!0,gridLineColor:"transparent",title:!1,opposite:!0,labels:{padding:0,style:{color:"#9e9e9e",fontSize:m,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",whiteSpace:"nowrap"}}}],plotOptions:{column:{color:"#d8d8d8",pointWidth:g,pointPlacement:.22},line:{dataLabels:{formatter:function(){return this.y+"%"}}}},tooltip:{enabled:!1},series:[{data:T,type:"column",dataLabels:{enabled:!0,align:"left",y:-5,format:"{y} шт.",style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"}},states:{hover:{color:"#fed63f"},inactive:{opacity:1}},minPointLength:10,point:{events:{mouseOver:function(t){var e=t.target;if(h){v.style.left="".concat(e.clientX-e.pointWidth/2+s+59-c.scrollLeft,"px"),v.style.marginLeft="",v.classList.add("active")}},mouseOut:function(){v.classList.remove("active")}}}},{data:[48,8,7,0,0,0,0,0,0,7,48,8,7,0,0,0,0,0,0,7,null],name:"Доходность",type:"line",color:"#000",yAxis:1,dataLabels:{enabled:!0,y:30,format:"{y} %",style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"}},states:{hover:{enabled:!1},inactive:{opacity:1}}}],legend:!1}),c=r.querySelector(".highcharts-scrolling")}}function W(t){e.scrollTo({left:t,behavior:"smooth"}),i.scrollTo({left:t,behavior:"smooth"}),c.scrollTo({left:t,behavior:"smooth"})}}(),0!==t(".object-plans").length&&t(".object-plans__slider").slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0}),0!==t(".object-slider").length&&(t(".object-slider__slider").slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0}),t(".object-slider__play").modalVideo({allowAutoplay:!0})),function(){if(0!==t(".object").length){var e=t(".object__navigation-link"),n=document.querySelectorAll(".object__section");if(window.matchMedia("(min-width: 768px)").matches){var a=new IntersectionObserver(function(t){t.forEach(function(t){if(t.isIntersecting){e.removeClass("active");var n=t.target.id;if(!n)return;e.filter("[data-scroll-to=".concat(n,"]")).addClass("active")}})},{rootMargin:"-50% 0% -50% 0%",root:null});n.forEach(function(t){return a.observe(t)})}e.on("click",function(n){n.preventDefault();var a=t(this);a.hasClass("locked")||(e.removeClass("active"),a.addClass("active"))})}}(),function(){if(document.querySelector(".partners-wrapper")){var t=_toConsumableArray(document.querySelectorAll(".partners-wrapper__step")),e=[document.querySelector(".partners-choice"),document.querySelector(".partners-status"),document.querySelector(".partners-income")];!function(){var n={rootMargin:"0px 0px -90% 0px",root:null,threshold:0};if("IntersectionObserver"in window){var a=new IntersectionObserver(function(n){n.forEach(function(n){var a=n.isIntersecting;if(a){var o=e.indexOf(n.target),i=t.find(function(t){return t.classList.contains("active")}),r=t.indexOf(i),s=t[o];if(r===o)return;i.classList.remove("active"),s.classList.add("active")}})},{rootMargin:n.rootMargin,root:n.root,threshold:n.threshold});e.forEach(function(t){return a.observe(t)})}else setTimeout(function(){items.forEach(function(t){t.classList.add("animated")})},300)}(),t[0].classList.add("active")}}(),function(){var e=document.querySelector(".profit-calc");if(e){var n=document.querySelector(".profit-calc__investment-range"),a=document.querySelector(".profit-calc__investment-value"),o=document.querySelector(".profit-calc__object-link"),i=wNumb({decimals:0,thousand:" "}),r=t(".profit-calc__objects-nav"),s=t(".profit-calc__objects-slider");s.find(".profit-object").each(function(e,a){!function(t){var e=t.find(".profit-object__income .value"),a=t.find(".profit-object__share .value"),o=t.find(".profit-object__rate .value"),r=t.find(".profit-object__step .value"),s=t.data("min"),c=(t.data("max"),t.data("step")),l=t.data("rate");e.on("blur",function(t){var a=i.from(e.text().trim());e.text(i.to(a));var r=parseFloat(o.text()),s=12*a/r*100;n.noUiSlider.set(s),m()}),a.on("blur",function(t){var e=parseInt(a.text().trim());isNaN(e)&&(e=s/c);var o=e*c;n.noUiSlider.set(o),m()}),r.on("blur",function(e){var a=i.from(r.text().trim());isNaN(a)&&(a=parseInt(c)),t.attr("data-custom-step",a),function(t,e){var a=t.data("min"),o=t.data("max"),i=e>=a?e:e*Math.ceil(a/e),r=o%e==0?0:e;n.noUiSlider.updateOptions({step:e,padding:[i,r]},!1)}(t,a)}),o.on("blur",function(a){var r=parseFloat(o.text().trim());isNaN(r)&&(r=parseFloat(l)),t.attr("data-custom-rate",r),e.text(i.to(n.noUiSlider.get()*(r/100)/12))})}(t(a))});var c,l,d,u,f=1e6;c=t(t(e).find(".profit-object")[0]),l=c.data("min"),d=c.data("max"),u=c.data("step"),noUiSlider.create(n,{start:f,step:u,animate:!1,connect:"lower",range:{min:0,max:d},padding:[l,0]}),v(c,f),s.on("init",function(e,n){var a=t(n.$slides[n.currentSlide]),o=t(a.children()[0]);v(o,f),p(o)}),s.on("afterChange",function(e,a,o,i){var r=t(a.$slides[o]),s=t(r.children()[0]),c=s.data("min"),l=s.data("max"),d=s.data("step"),u=parseInt(n.noUiSlider.get()),f=l<u?l:u;n.noUiSlider.updateOptions({start:f,step:d,range:{min:0,max:l},padding:[c,0]}),m()}),r.slick({rows:0,slidesToScroll:1,variableWidth:!0,asNavFor:s,arrows:!1,focusOnSelect:!0}),s.slick({rows:0,slidesToShow:1,slidesToScroll:1,arrows:!1,accessibility:!1,asNavFor:r}),n.noUiSlider.on("update",function(e,n){var o=+e[n];a.textContent=i.to(o);var r=s.find(".slick-current"),c=t(r.children()[0]);v(c,o),p(c)}),n.noUiSlider.on("change",function(){m()}),document.addEventListener("keypress",function(t){13===t.keyCode&&t.target.classList.contains("value")&&t.target.isContentEditable&&(t.preventDefault(),t.stopPropagation(),t.target.blur())})}function v(t,e){var n=t.find(".profit-object__income .value"),a=t.find(".profit-object__share .value"),o=t.find(".profit-object__rate .value"),r=t.find(".profit-object__step .value"),s=t.data("rate"),c=parseInt(t.attr("data-custom-rate")),l=t.data("step"),d=parseInt(t.attr("data-custom-step")),u=c||s,f=d||l;a.text(Math.floor(e/f)),n.text(i.to(e*u/100/12)),o.text(u),r.text(i.to(f))}function p(t){var e=parseInt(n.noUiSlider.get());o.href=t.data("link")+"/"+e}function m(){var e=t(".noUi-connect"),n=t(".noUi-origin");e.addClass("transition"),n.addClass("transition"),setTimeout(function(){e.removeClass("transition"),n.removeClass("transition")},300)}}(),function(){var e=t(".project-calc");if(0!==e.length){var n=t(".project-calc__form"),a=e.find("input[data-format]"),o=e.find("input"),i=o.filter("[required]");o.each(function(e,o){t(o).on("change",function(t){_toConsumableArray(i).every(function(t){return t.value.trim().length>0})&&(_toConsumableArray(a).map(function(t){var e=t.value,n=t.dataset.format;if(e.length>0){var a=r[n].from(e);t.value=a}}),n.serialize(),_toConsumableArray(a).map(function(t){var e=parseInt(t.value),n=t.dataset.format;if(e){var a=r[n].to(e);t.value=a}}))})});var r={meter:wNumb({decimals:0,thousand:" ",suffix:" м²"}),ruble:wNumb({decimals:0,thousand:" ",suffix:" ₽"})};a.each(function(e,n){var a=t(n).data("format"),o=t(n).val()||"";t(n).on("input",function(e){var a=t(n).val();/^[0-9\s]*$/.test(a)?o=a:n.value=o}),t(n).on("blur",function(e){var o=parseInt(t(n).val().split(" ").join(""));o&&t(n).val(r[a].to(o))}),t(n).on("focus",function(e){var o=t(n).val();0!==o.length&&t(n).val(r[a].from(o))})})}}(),function(){var e=t(".project-select"),n=t(".project-select__option"),a=e.filter('[data-type="taxType"]');function o(){var n=e.filter(".active");0!==n.length&&n.each(function(e,n){var a=t(n).find(".project-select__options");t(n).removeClass("active"),a.fadeOut(300)})}e.on("click",function(e){e.stopPropagation(),function(e,n){o(),t(e).addClass("active"),n.fadeIn(300)}(this,t(this).find(".project-select__options"))}),n.on("click",function(e){e.stopPropagation();var n=t(this).data("value"),o=t(this).html(),i=t(this).parents(".project-select"),r=i.find(".project-select__options"),s=i.find(".project-select__selected"),c=i.find(".project-select__input");if(s.html(o),c.val(n),c.trigger("change"),"ownerType"===i.attr("id")){var l=t(this).attr("data-type");a.each(function(e,n){var a=t(n).find(".project-select__input"),o=t(n).find(".project-select__selected"),i=t(n).find(".project-select__option[data-type=".concat(l,"]"));a.val(i.data("value")),o.text(i.data("value"))})}!function(e,n){t(e).removeClass("active"),n.fadeOut(300)}(i,r)}),t(document).on("click",function(){o()})}()}});