function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}jQuery;var API="/app/ajax/";Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}});var phoneMask="+7 (f99) 999-99-99",scrollBarWidth=getScrollbarWidth();function getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}AOS.init({disable:"mobile",once:!0,duration:750}),$.noConflict(),jQuery(document).ready(function(e){if(e("body").removeClass("pageload"),"function"!=typeof Promise)document.createElement("picture"),o="/js/polyfills/browser.js",a=r,(i=document.createElement("script")).src=o,i.onload=function(){a()},i.onerror=function(){throw new Error("Failed to load script "+o)},document.head.appendChild(i);else{var t=performance.now();r();var n=performance.now();console.log("globalInitFunction took "+Math.floor(n-t)+"ms.")}var o,a,i;function r(){var t,n,o=function(e,t,n){var o;return function(){var a=this,i=arguments,r=n&&!o;clearTimeout(o),o=setTimeout(function(){o=null,n||e.apply(a,i)},t),r&&e.apply(a,i)}};function a(t,n){var o=e(t),a=o.siblings(".error");o.addClass("error"),a.text(n),a.slideDown(200)}function i(t){var n=e(t),o=n.siblings(".error");n.removeClass("error"),o.slideUp(200)}function r(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{processData:!0,contentType:"application/x-www-form-urlencoded"};return new Promise(function(a,i){e.ajax({url:API+t,type:"POST",data:n,processData:o.processData,contentType:o.contentType,success:function(e){var t=function(e){var t;try{t=JSON.parse(e)}catch(e){}return t}(e);a(t)},error:function(e){i(e)}})})}function s(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=e(t).offset().top;e("html, body").animate({scrollTop:a-o},n)}function l(t){var n=t.querySelector(".account-settings-modal__form"),o=n.querySelectorAll("input"),s=(e("#settingsEmail"),e("#settingsPhone")),l="+7 (f99) 999-99-99";s.inputmask({mask:l,showMaskOnHover:!1}),o.forEach(function(e){return e.addEventListener("focus",function(){return i(e)})}),n.addEventListener("submit",function(t){var o;(t.preventDefault(),o=s.val(),Inputmask.isValid(o,{mask:l}))?r("url",e(n).serialize()).then(function(e){MicroModal.close("accountSettingsModal")}):a(s,"Неверно указан телефон")})}Inputmask.extendDefinitions({f:{validator:"[0-7|9]"}}),e("[data-scroll-to]").on("click",function(t){var n=e(this),o=n.data("scroll-to"),a=e("#".concat(o)),i=n.data("scroll-offset")||0;1===a.length&&s(a,300,i)}),0!==(t=e(".about-team__slider")).length&&(window.matchMedia("(max-width: 767px)").matches||t.slick({rows:0,slidesToScroll:1,slidesToShow:3,arrows:!0})),e(".about-top__video-snippet").modalVideo({allowAutoplay:!0}),function(){document.querySelector(".account-details")&&(document.querySelectorAll(".tt-dropdown-menu").forEach(function(e){new SimpleBar(e,{autoHide:!1})}),document.querySelectorAll(".account-details__file-upload").forEach(function(e){var t,n,o;n=(t=e).querySelector(".account-details__upload-status"),(o=new Dropzone(t,{url:"upload.php",maxFiles:1,maxFilesize:2,autoProcessQueue:!1,acceptedFiles:"image/*",dictFileTooBig:"Слишком большой вес файла",dictInvalidFileType:"Выберите изображение"})).on("uploadprogress",function(e){}),o.on("addedfile",function(e,o){t.classList.remove("error"),t.classList.add("success"),n.textContent=""}),o.on("success",function(e){}),o.on("error",function(e,o){t.classList.remove("success"),t.classList.add("error"),n.textContent=o})}))}(),(n=document.querySelectorAll(".account-document")).length>0&&n.forEach(function(t){var n=t.querySelector(".account-document__header"),o=t.querySelector(".account-document__body");n.addEventListener("click",function(){t.classList.toggle("active"),n.classList.toggle("active"),e(o).slideToggle(250)})}),function(){var t=document.querySelector(".account-nav");if(t){var n=t.querySelector(".account-nav__list"),o=t.querySelector(".account-nav__link.active"),a=_toConsumableArray(n.children),i=0;a.forEach(function(e){i+=e.getBoundingClientRect().width});var r=e(n);if(i>n.clientWidth+1){if(r.slick({dots:!1,rows:0,arrows:!1,infinite:!1,variableWidth:!0,touchThreshold:10,speed:200,swipeToSlide:!0}),o){var s=o.parentNode,l=_toConsumableArray(r.slick("getSlick").$slides).indexOf(s);r.slick("slickGoTo",l)}}else t.classList.add("full")}}(),function(){var t=document.querySelector(".account-settings__form");if(t){var n=t.querySelectorAll("input"),o=(e("#settingsEmail"),e("#settingsPhone")),s="+7 (f99) 999-99-99";o.inputmask({mask:s,showMaskOnHover:!1}),n.forEach(function(e){return e.addEventListener("focus",function(){return i(e)})}),t.addEventListener("submit",function(n){var i;n.preventDefault(),i=o.val(),Inputmask.isValid(i,{mask:s})?r("url",e(t).serialize()).then(function(e){MicroModal.close("accountSettingsModal")}):a(o,"Неверно указан телефон")})}}();var c,d,u,f,p,v,h=document.querySelectorAll(".application-trigger");h.length>0&&h.forEach(function(t){t.addEventListener("click",function(t){MicroModal.show("applicationModal",{disableScroll:!0,awaitCloseAnimation:!0,onShow:function(t){L(t),function(t){var n=t.querySelector(".modal__form"),o=n.querySelectorAll("input");console.log(o);e("#applicationEmail");var s=e("#applicationPhone"),l="+7 (f99) 999-99-99";s.inputmask({mask:l,showMaskOnHover:!1}),o.forEach(function(e){return e.addEventListener("focus",function(){return i(e)})}),n.addEventListener("submit",function(t){if(t.preventDefault(),o=s.val(),Inputmask.isValid(o,{mask:l})){var o,i=e(n).serialize();r("url",i).then(function(e){MicroModal.close("applicationModal")})}else a(s,"Неверно указан телефон")})}(t)},onClose:function(e){C(e,!1)}})})}),function(){var e=document.querySelector(".monitoring-sale-modal");if(e){var t=e.querySelector("form");if(t){var n={amount:wNumb({decimals:5,thousand:" "}),price:wNumb({decimals:2,thousand:" "}),ruble:wNumb({decimals:2,thousand:" ",suffix:" ₽"})},o=e.querySelector("#shareAmount"),a=e.querySelector("#sharePrice"),i=e.querySelector("#shareResult");o.addEventListener("change",function(e){var t=parseFloat(e.target.value);t||(t=0),t=parseFloat(t.toFixed(5)),e.target.value=n.amount.to(t),r()}),a.addEventListener("change",function(e){var t=parseFloat(e.target.value);t||(t=0),t=parseFloat(t.toFixed(2)),e.target.value=n.price.to(t),r()}),o.value=n.amount.to(parseFloat(o.value)),a.value=n.price.to(parseFloat(a.value)),i.textContent=n.ruble.to(parseFloat(i.textContent)),t.addEventListener("submit",function(e){o.value=n.amount.from(o.value),a.value=n.price.from(a.value),i.textContent=n.ruble.from(i.textContent)})}}function r(){var e=n.amount.from(o.value),t=n.price.from(a.value);i.textContent=n.ruble.to(e*t)}}(),c=e(".authorization__toggle"),d=e(".authorization__logged"),u=e(".authorization__list"),d.on("click",function(){c.toggleClass("active"),u.hasClass("active")?(u.slideUp(),u.removeClass("active")):(u.slideDown(),u.addClass("active"))}),document.querySelectorAll(".authorization__settings").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),MicroModal.show("accountSettingsModal",{disableScroll:!0,disableFocus:!0,awaitCloseAnimation:!0,onShow:function(e){L(e),l(e)},onClose:function(e){C(e,!1)}})})}),document.querySelectorAll(".feedback-trigger").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),MicroModal.show("accountFeedbackModal",{disableScroll:!0,disableFocus:!0,awaitCloseAnimation:!0,onShow:function(e){L(e)},onClose:function(e){C(e,!1)}})})}),function(){var t=e(".base-input__input, .base-input__textarea");console.log("$inputs: ",t);var n=e(".base-input-autocomplete");t.each(function(){""!==e(this).val().trim()&&e(this).closest(".base-input").addClass("hasValue"),e(this).on("blur",function(){""!==e(this).val().trim()?e(this).closest(".base-input").addClass("hasValue"):e(this).closest(".base-input").removeClass("hasValue")})}),n.each(function(){var t=e(this).find("input"),n=e(this).find("label");t.on("focus",function(){n.addClass("js-focus")}),t.on("blur",function(){n.removeClass("js-focus")})})}(),f=e(".base-select__input"),p=e(".base-select__options-list"),v=e(".base-select__options-item"),0!=f.length&&(""!==f.val().trim()&&f.addClass("hasValue"),f.on("blur",function(){""!==f.val().trim()?f.addClass("hasValue"):f.removeClass("hasValue")}),f.on("click",function(){f.parent().addClass("active"),p.slideDown()}),e(document).on("click",function(e){f.parent().hasClass("active")&&e.target!==f&&0===f.parent().has(e.target).length&&(f.parent().removeClass("active"),p.slideUp())}),v.each(function(){e(this).on("click",function(t){var n=e(this).text();f.val(n),f.addClass("hasValue"),f.parent().removeClass("active"),p.slideUp()})})),function(){var t=e(".best-object-card");if(0!==t.length){var n=["#1cb96f","#fed63f","#ffa30c"];t.each(function(t,o){var a=parseInt(e(o).data("rate")),i=e(o).find(".best-object-card__rate");a>=80?i.css("color",n[0]):a<80&&a>=50?i.css("color",n[1]):i.css("color",n[2]),e(o).css("top","calc(".concat(100-a,"% + ").concat(8,"px"))})}}(),0!==e(".best-objects").length&&e(".best-objects__objects").slick({rows:0,slidesToScroll:1,swipeToSlide:!0,slidesToShow:1,arrows:!0,mobileFirst:!0,infinite:!1,responsive:[{breakpoint:767,settings:{slidesToShow:2}},{breakpoint:1023,settings:{slidesToShow:2.25}},{breakpoint:1199,settings:{slidesToShow:3}}]}),0!==e(".contacts").length&&ymaps.ready(function(){var e=new ymaps.Map("map",{center:[55.749511,37.537083],zoom:15,controls:["zoomControl"]}),t=new ymaps.Placemark([55.749511,37.537083],{hintContent:"123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»",balloonContent:"123112, Москва, Пресненская наб., д. 12, МФК «Федерация Восток»"},{preset:"islands#icon",iconColor:"#fed63f"});e.behaviors.disable("scrollZoom"),e.geoObjects.add(t)});var m,g,y,b,_=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(_classCallCheck(this,t),!e)throw new Error("No element has been passed");this.select=e,this.options=n,this.setup()}return _createClass(t,[{key:"setup",value:function(){this.valueInput=this.select.querySelector(".custom-select__value"),this.selected=this.select.querySelector(".custom-select__selected"),this.dropdown=this.select.querySelector(".custom-select__dropdown"),this.optionsList=this.select.querySelector(".custom-select__options"),this.inititalPlaceholder=this.selected.textContent.trim(),new SimpleBar(this.dropdown,{autoHide:!1}),this.keyCodes={enter:13,down_arrow:40,up_arrow:38,escape:27},this.setEventHandlers()}},{key:"setEventHandlers",value:function(){var e=this;this.selected.addEventListener("keydown",function(t){return e.toggleOptionsList(t)}),this.selected.addEventListener("click",function(t){return e.toggleOptionsList(t)}),this.optionsList.addEventListener("click",function(t){t.target.classList.contains("custom-select__option")&&(t.preventDefault(),e.selectItem(t))}),this.optionsList.addEventListener("keydown",function(t){if(t.target.classList.contains("custom-select__option"))switch(t.keyCode){case e.keyCodes.enter:return void e.selectItem(t);case e.keyCodes.down_arrow:return t.preventDefault(),void e.focusNextListItem(e.keyCodes.down_arrow);case e.keyCodes.up_arrow:return t.preventDefault(),void e.focusNextListItem(e.keyCodes.up_arrow);case e.keyCodes.escape:return void e.closeOptionsList();default:return}}),document.addEventListener("click",function(t){!e.select.contains(t.target)&&e.dropdown.classList.contains("opened")&&e.closeOptionsList()})}},{key:"toggleOptionsList",value:function(t){t.keyCode===this.keyCodes.escape&&this.closeOptionsList(),"click"===t.type&&(this.dropdown.classList.toggle("opened"),this.selected.classList.toggle("opened"),this.dropdown.setAttribute("aria-expanded",this.dropdown.classList.contains("opened")),e(this.dropdown).fadeToggle(120)),t.keyCode===this.keyCodes.down_arrow&&(t.preventDefault(),this.focusNextListItem(this.keyCodes.down_arrow)),t.keyCode===this.keyCodes.up_arrow&&(t.preventDefault(),this.focusNextListItem(this.keyCodes.up_arrow))}},{key:"closeOptionsList",value:function(){this.dropdown.classList.remove("opened"),this.selected.classList.remove("opened"),this.dropdown.setAttribute("aria-expanded",!1),e(this.dropdown).fadeOut(120)}},{key:"focusNextListItem",value:function(e){var t=document.activeElement,n=_toConsumableArray(this.optionsList.children);if(t.classList.contains("custom-select__selected"))this.optionsList.children[0].focus();else{var o=n.indexOf(t);if(e===this.keyCodes.down_arrow){if(o<n.length-1)n[o+1].focus()}else if(e===this.keyCodes.up_arrow){if(o>0)n[o-1].focus()}}}},{key:"selectItem",value:function(e){var t=e.target.textContent.trim();this.singleSelectLogic(e,t)}},{key:"setSelected",value:function(e){this.selected.textContent=e,this.valueInput&&(this.valueInput.value=e)}},{key:"clearSelected",value:function(){this.selected.textContent=this.inititalPlaceholder,this.valueInput&&(this.valueInput.value=null)}},{key:"singleSelectLogic",value:function(e,t){this.selected.textContent!==t?(this.selected.textContent=t,this.valueInput&&(this.valueInput.value=t),this.closeOptionsList(),"function"==typeof this.options.onSelect&&this.options.onSelect(t)):this.closeOptionsList()}}]),t}();document.querySelectorAll(".custom-select").forEach(function(e){return new _(e)}),function(){if(0!==e(".faq").length){var t=e(".faq__questions-link"),n=e(".faq__answer"),o=e(".faq__content"),a=0;a=window.matchMedia("(max-width: 768px)").matches?50:150,t.on("click",function(i){i.preventDefault();var r=e(this);if(!r.hasClass("active")){var l=n.filter(".active"),c=t.filter(".active"),d=r.data("target"),u=n.filter("#"+d);c.removeClass("active"),l.fadeOut(300,function(){l.removeClass("active"),r.addClass("active"),u.addClass("active"),u.fadeIn(300),s(o,300,a)})}})}}(),m=e(".main-header__navigation"),g=e(".alert-banner"),y=g.length>0?g.height()+75:75,m.css("top",y+"px"),e(".hamburger").click(function(){e(this).toggleClass("active"),m.toggleClass("active"),e("body").toggleClass("menu-opened")}),0!==(b=e(".index-slider, .index-bottom__slider")).length&&b.each(function(t,n){e(n).slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0})});var w,S,x=document.querySelectorAll(".info-trigger");function L(e){e.children[0].style.paddingRight=scrollBarWidth+"px",document.body.style.paddingRight=scrollBarWidth+"px"}function C(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.children[0].style.paddingRight="",document.body.style.paddingRight="";var n=document.activeElement;n&&n.focus&&n.blur(),t&&e.addEventListener("animationend",function e(){this.remove(),this.removeEventListener("animationend",e)})}console.log(x),x.length>0&&x.forEach(function(e){e.addEventListener("click",function(e){MicroModal.show("infoModal",{disableScroll:!0,awaitCloseAnimation:!0,onShow:function(e){L(e)},onClose:function(e){C(e,!1)}})})}),w=e(".main-nav__link.has-subnav"),window.matchMedia("(max-width: 1023px)").matches&&w.on("click",function(t){t.preventDefault(),e(this).next().slideToggle(300)}),function(){var e=document.getElementById("income-monitoring");if(e){var t=[122442.8,5786.51,174648.8,65352.25,21275.49,748878,82916.36,49460.5,65876.33,50389.35,53762.3,11285.56],n=[87.2,195.3,13.8,13.9,4.3,309.7,17.9,10.3,14,10.6,11.4,2.3],o=Math.max.apply(Math,n),a=Math.max.apply(Math,t);setTimeout(function(){var t=e.querySelector(".highcharts-scrolling");if(0!==t.length)new SimpleBar(t,{autoHide:!1})},1e3);var i=68.25*t.length;Highcharts.chart("income-monitoring",{chart:{marginTop:30,marginRight:24,marginLeft:24,scrollablePlotArea:{minWidth:i},events:{render:function(){var e=this.series[0].data,t=this.series[1].data;e.forEach(function(e,n){var o=e.dataLabel.attr().y,a=e.dataLabel.getBBox().height,i=t[n].dataLabel.attr(),r=i.y,s=i.opacity,l=t[n].dataLabel.getBBox().height;0===s&&o+a>r+5&&(r=o+l-30),t[n].dataLabel.attr({y:r,opacity:1})})}}},title:{text:""},exporting:{enabled:!1},plotOptions:{series:{dataLabels:{},states:{inactive:{opacity:1}}},spline:{dataLabels:{align:"center",enabled:!0,color:"black",padding:0,y:20,crop:!1,overflow:"none",style:{textOutline:"none",fontSize:"10px",fontWeight:500,fontFamily:"Montserrat"},formatter:function(){return this.y+"%"}}},column:{pointWidth:65,pointPadding:0,dataLabels:{align:"center",enabled:!0,color:"black",padding:0,y:-6,x:-5,crop:!1,overflow:"none",style:{textOutline:"none",fontSize:"10px",fontWeight:500,fontFamily:"Montserrat"},formatter:function(){return this.y>=1e6?(this.y/1e6).toFixed(2)+"<span> млн. ₽</span>":this.y>=1e3?(this.y/1e3).toFixed(2)+"<span> тыс. ₽</span>":this.y+" ₽"}}}},xAxis:[{categories:["02.18","03.18","04.18","05.18","06.18","07.18","08.18","09.18","10.18","11.18","12.18","01.19"],crosshair:!1,offset:20,labels:{style:{color:"#696969",fontSize:"10px",fontFamily:"Montserrat",fontWeight:500}}}],yAxis:[{visible:!1,min:0,max:o,title:{text:""},opposite:!0,labels:{x:5}},{visible:!1,max:a,title:{text:""},width:40,labels:{x:-6}}],legend:{enabled:!1},credits:{enabled:!1},series:[{name:"Сумма выплат",type:"column",yAxis:1,data:t,color:"#CBCBCB",tooltip:{pointFormatter:function(){return"Сумма выплат: <b>"+this.y.toLocaleString()+" 000 руб</b><br>Доля от общих выплат: <b>"+Math.floor(this.y/t.reduce(function(e,t){return e+t},0)*100)+"%</b>"}},states:{hover:{color:"#fff6d4"},inactive:{opacity:1}}},{name:"Доходность",type:"spline",data:n,color:"#000",tooltip:{valueSuffix:"%"}}]})}}(),function(){var e=document.querySelector(".monitoring-header__chart");if(e){var t=e.querySelector(".line"),n=["#79A0FF","#C29BF6","#F598E2","#FF9BC6","#FFA9AB","#FFBD96","#FFD48C","#FFEB93"].reverse(),o=null;Highcharts.chart("funds-chart",{chart:{type:"bar",height:90,margin:0},colors:n,title:{text:""},exporting:{enabled:!1},xAxis:[{categories:["Фонды"],crosshair:!1,labels:{enabled:!1},title:{enabled:!1},visible:!1}],yAxis:{max:100,labels:{enabled:!1},title:{enabled:!1},visible:!1},legend:{enabled:!1},credits:{enabled:!1},plotOptions:{bar:{pointWidth:30},series:{stacking:"normal",borderWidth:0,cursor:"pointer",point:{events:{mouseOver:function(e){o=this,t.style.backgroundColor=this.color,t.style.right=this.shapeArgs.y+"px",t.style.top=this.shapeArgs.x+this.shapeArgs.width+"px",t.style.width=this.shapeArgs.height+"px",t.classList.add("visible")},mouseOut:function(){o=null,t.classList.remove("visible")},click:function(e){window.location.href=e.point.url}}},states:{hover:{enabled:!1},inactive:{opacity:1}}}},tooltip:{positioner:function(e,t,n){var a=this.chart.plotSizeY,i=o.shapeArgs.height,r=a-o.plotY-i+(i-e)/2;return{x:r=(r=r<0?6:r)+e>a?a-e:r,y:n.plotY+30}},shadow:!1,padding:0,borderWidth:0,style:{fontSize:"10px",fontWeight:600,fontFamily:"Montserrat"},backgroundColor:"transparent",headerFormat:"",hideDelay:100,pointFormatter:function(){return"".concat(this.series.name," | ").concat(this.y," %")}},series:[{name:"Активо восемь",data:[{y:20,url:"/aktivo-8"}]},{name:"Активо семь",data:[{y:16,url:"/aktivo-7"}]},{name:"Активо шесть",data:[{y:16,url:"/aktivo-6"}]},{name:"Активо пять",data:[{y:14,url:"/aktivo-5"}]},{name:"Активо четыре",data:[{y:12,url:"/aktivo-4"}]},{name:"Активо три",data:[{y:9,url:"/aktivo-3"}]},{name:"Активо два",data:[{y:7,url:"/aktivo-2"}]},{name:"Активо один",data:[{y:6,url:"/aktivo-1"}]}]})}}(),function(){var e=document.querySelector(".monitoring-steps");if(e){var t=e.querySelector(".monitoring-steps__container");new SimpleBar(t,{autoHide:!1})}}(),function(){if(document.querySelector(".object-calc")){var e=document.querySelector(".object-calc__investment-range"),t=document.querySelector(".object-calc__investment-value"),n=document.querySelector(".object-calc__button"),o=document.querySelector(".object-calc__income-data"),a=o.querySelector(".object-calc__income .value"),i=o.querySelector(".object-calc__share .value"),s=o.querySelector(".object-calc__step .value"),l=o.querySelector(".object-calc__rate .value"),c=parseInt(o.dataset.initial),d=parseInt(o.dataset.min),u=parseInt(o.dataset.max),f=parseInt(o.dataset.step),p=parseFloat(o.dataset.rate),v=null,h=null,m=wNumb({decimals:0,thousand:" "});a.addEventListener("blur",function(t){var n=m.from(a.textContent.trim());a.textContent=m.to(n);var o=12*n/parseFloat(l.textContent)*100;e.noUiSlider.set(o),g()}),i.addEventListener("blur",function(t){var n=parseInt(i.textContent.trim());isNaN(n)&&(n=d/f);var o=n*(h||f);e.noUiSlider.set(o),g()}),s.addEventListener("blur",function(t){var n,o,a,i=m.from(s.textContent.trim());!isNaN(i)&&i||(i=parseInt(f)),o=(n=h=i)>=d?n:n*Math.ceil(d/n),a=u%n==0?0:n,e.noUiSlider.updateOptions({step:n,padding:[o,a]},!1)}),l.addEventListener("blur",function(t){var n=parseFloat(l.textContent.trim());isNaN(n)&&(n=parseFloat(p)),v=n,a.textContent=m.to(e.noUiSlider.get()*(n/100)/12)}),document.addEventListener("keypress",function(e){13===e.keyCode&&e.target.classList.contains("value")&&e.target.isContentEditable&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}),noUiSlider.create(e,{start:c,step:f,animate:!1,connect:"lower",range:{min:0,max:u},padding:[d,0]}),n.addEventListener("click",function(){var t=e.noUiSlider.get();r("url","investment=".concat(t)).then(function(e){})}),e.noUiSlider.on("update",function(e,n){console.log("update");var o=+e[n];t.textContent=m.to(o),function(e,t,n){a.textContent=m.to(e*t/100/12),i.textContent=e/n,l.textContent=t,s.textContent=m.to(n)}(o,v||p,h||f)})}function g(){var e=document.querySelector(".noUi-connect"),t=document.querySelector(".noUi-origin");e.classList.add("transition"),t.classList.add("transition"),setTimeout(function(){e.classList.remove("transition"),t.classList.remove("transition")},300)}}(),tippy(".object-card .tooltip",{placement:"bottom",arrow:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'}),e(".object-card__play").modalVideo({allowAutoplay:!0}),function(){if(0!==e(".object-finances").length){var t=document.querySelector(".object-finances__table"),n=document.querySelector("#lineChart"),a=parseInt(window.getComputedStyle(n.parentNode).paddingLeft),i=null,r=document.querySelector("#columnChart"),s=parseInt(window.getComputedStyle(r.parentNode).paddingLeft),l=null,c=t.firstElementChild.clientWidth,d=t.clientWidth;c>d&&(t.firstElementChild.style.width="100%");var u=t.querySelectorAll("tr:not(:first-child) td"),f=u[0].getBoundingClientRect().height,p=u[1].getBoundingClientRect().width,v=document.querySelector(".object-finances__hr"),h=document.querySelector(".object-finances__vr"),m=wNumb({decimals:2,thousand:" "}),g="12px",y=!1,b=52;window.matchMedia("(min-width: 1024px)").matches&&(g="15px",b=62,y=!0),u.forEach(function(e){e.addEventListener("mouseover",function(){var n=e.offsetParent.offsetTop+e.offsetTop+f;v.style.top="".concat(n,"px");var o=-5;1===_toConsumableArray(e.parentNode.children).indexOf(e)&&(o=parseInt(window.getComputedStyle(e).paddingLeft)-5),console.log(t.scrollLeft);var a=e.offsetParent.offsetLeft+e.offsetLeft+o-t.scrollLeft;h.style.left="".concat(a,"px"),h.style.marginLeft="8px",v.classList.add("active"),h.classList.add("active")}),e.addEventListener("mouseout",function(){v.classList.remove("active"),h.classList.remove("active")})});var _=document.querySelector(".object-finances__scroll-next"),w=document.querySelector(".object-finances__scroll-prev"),S=document.querySelector(".object-finances__jump-next"),x=document.querySelector(".object-finances__jump-prev"),L=t.scrollWidth-t.clientWidth;c<d&&(e(_).hide(),e(w).hide(),e(S).hide(),e(x).hide());var C=o(function(e){function n(){var e=t.scrollLeft+p;w.classList.add("active"),x.classList.add("active"),e>L&&clearInterval(j),e>=L-p&&(_.classList.remove("active"),S.classList.remove("active")),N(e)}n(),j=setInterval(n,500)},200,!0),k=o(function(){function e(){var e=t.scrollLeft-p;e<=-p?clearInterval(j):(e<=0&&(w.classList.remove("active"),x.classList.remove("active")),e<=L&&(_.classList.add("active"),S.classList.add("active"),N(e)))}e(),j=setInterval(e,500)},200,!0),E=o(function(e){var n=t.scrollLeft+6*p;x.classList.add("active"),w.classList.add("active"),n>=L-6*p?(N(L),S.classList.remove("active"),_.classList.remove("active")):N(n)},200,!0),q=o(function(){var e=t.scrollLeft-6*p;e<=-p&&N(0);e<=0&&(x.classList.remove("active"),w.classList.remove("active"));e<=L&&(S.classList.add("active"),_.classList.add("active"),N(e))},200,!0);S.addEventListener("click",E),x.addEventListener("click",q);var j,A="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;if(console.log("touchDevice: ",A),A?(_.addEventListener("touchstart",C),_.addEventListener("touchend",function(){return clearInterval(j)}),w.addEventListener("touchstart",k),w.addEventListener("touchend",function(){return clearInterval(j)})):(_.addEventListener("mousedown",C),_.addEventListener("mouseup",function(){return clearInterval(j)}),w.addEventListener("mousedown",k),w.addEventListener("mouseup",function(){return clearInterval(j)})),n){var M=[242277.779,3172259.31,1669890.65,1647254.72,2863786.35,2513992.47,2795352.5,4823505.42,2925765.61,99999.8,242277.779,3172259.31,1669890.65,1647254.72,2863786.35,2513992.47,2795352.5,4823505.42,2925765.61,null],F=p;console.log(F);var I=F*M.length;Highcharts.chart("lineChart",{chart:{type:"spline",scrollablePlotArea:{minWidth:I},marginTop:60,marginLeft:70},title:!1,credits:{enabled:!1},xAxis:{categories:["Сентябрь 2022","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018","Август 2017","Сентябрь 2022","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018",""],opposite:!0,tickPixelInterval:F,width:F*M.length,gridLineColor:"#197F07",offset:30,lineWidth:0,tickWidth:0,labels:{align:"left",style:{color:"#9e9e9e",fontSize:g,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px",whiteSpace:"nowrap"}}},yAxis:{title:!1,gridLineColor:"#f2f2f2",labels:{style:{color:"#9e9e9e",fontSize:g,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px"},formatter:function(){return this.value/1e6+"M"}}},plotOptions:{spline:{color:"#fed63f"},series:{dataLabels:{enabled:!0,align:"left",y:-5,style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"},formatter:function(e){var t=parseFloat(this.y);return t<1e5?m.to(+t.toFixed(2))+" ₽":m.to(t.toFixed(2)/1e3)+" тыс. ₽"}},point:{events:{mouseOver:function(e){var t=e.target;if(y){h.style.left="".concat(t.clientX+a+69-i.scrollLeft,"px"),h.style.marginLeft="",h.classList.add("active")}},mouseOut:function(){h.classList.remove("active")}}}}},tooltip:{enabled:!1},series:[{data:M}],legend:!1}),i=n.querySelector(".highcharts-scrolling")}if(r){var T=[80,70,0,0,0,0,0,0,70,489,89,70,0,0,0,0,0,0,7,null],O=p,W=O*T.length;Highcharts.chart("columnChart",{chart:{scrollablePlotArea:{minWidth:W},marginTop:60,marginLeft:70},title:!1,credits:{enabled:!1},xAxis:{categories:["Сентябрь 2022","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018","Август 2017","Сентябрь 2022","Октябрь 2017","Ноябрь 2017","Декабрь 2017","Январь 2018","Февраль 2018","Март 2018","Апрель 2018","Май 2018",""],opposite:!0,tickPixelInterval:O,width:O*T.length,offset:30,lineWidth:0,tickWidth:0,labels:{align:"left",style:{color:"#9e9e9e",fontSize:g,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",paddingLeft:"5px",whiteSpace:"nowrap"}}},yAxis:[{title:!1,gridLineColor:"#f2f2f2",labels:{padding:0,style:{color:"#9e9e9e",fontSize:g,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",whiteSpace:"nowrap"},formatter:function(){return this.value+"шт."}}},{visible:!0,gridLineColor:"transparent",title:!1,opposite:!0,labels:{padding:0,style:{color:"#9e9e9e",fontSize:g,fontWeight:"600",fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",whiteSpace:"nowrap"},formatter:function(){return this.value+"%"}}}],plotOptions:{column:{color:"#d8d8d8",pointWidth:b,pointPlacement:.22},sline:{dataLabels:{formatter:function(){return this.y+"%"}}}},tooltip:{enabled:!1},series:[{data:T,type:"column",color:"transparent",dataLabels:{enabled:!0,align:"left",y:-5,format:"{y} шт.",style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"}},states:{hover:{enabled:!1,color:"#fed63f"},inactive:{opacity:1}},minPointLength:10},{data:[8,7,0,0,0,0,0,0,7,48,8,7,0,0,0,0,0,0,7,null],name:"Доходность",type:"spline",color:"#fed63f",yAxis:1,dataLabels:{enabled:!0,y:30,format:"{y} %",style:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif;",fontSize:"14px",fontWeight:"400"}},states:{hover:{enabled:!0,color:"#fed63f"},inactive:{opacity:1}},point:{events:{mouseOver:function(e){var t=e.target;if(y){h.style.left="".concat(t.clientX+s+69-l.scrollLeft,"px"),h.style.marginLeft="",h.classList.add("active")}},mouseOut:function(){h.classList.remove("active")}}}}],legend:!1}),l=r.querySelector(".highcharts-scrolling")}}function N(e){t.scrollTo({left:e,behavior:"smooth"}),i.scrollTo({left:e,behavior:"smooth"}),l.scrollTo({left:e,behavior:"smooth"})}}(),function(){if(0!==e(".object-new").length){var t=e(".object__navigation-link"),n=document.querySelectorAll(".object__section");if(tippy(".object__navigation-link[data-tippy-content]",{placement:"bottom",arrow:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'}),window.matchMedia("(min-width: 768px)").matches){var o=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){t.removeClass("active");var n=e.target.id;if(!n)return;t.filter("[data-scroll-to=".concat(n,"]")).addClass("active")}})},{rootMargin:"-50% 0% -50% 0%",root:null});n.forEach(function(e){return o.observe(e)})}t.on("click",function(n){n.preventDefault();var o=e(this);o.hasClass("locked")||(t.removeClass("active"),o.addClass("active"))});var a=document.querySelector(".object-new__navigation");if(window.matchMedia("(max-width: 1199px)").matches){var i=a.querySelector(".object-new__navigation-list"),r=a.querySelector(".object-new__navigation-link.active"),s=_toConsumableArray(i.children),l=0;s.forEach(function(e){l+=e.getBoundingClientRect().width});var c=e(i);if(l>i.clientWidth+1){if(c.slick({dots:!1,rows:0,arrows:!1,infinite:!1,variableWidth:!0,touchThreshold:10,speed:200,swipeToSlide:!0}),r){var d=r.parentNode,u=_toConsumableArray(c.slick("getSlick").$slides).indexOf(d);c.slick("slickGoTo",u)}}else a.classList.add("full")}}}(),0!==e(".object-plans").length&&e(".object-plans__slider").slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0}),0!==(S=document.querySelectorAll(".object-progress")).length&&S.forEach(function(e){var t=e.querySelector(".object-progress__bar"),n=e.querySelector(".object-progress__label"),o=e.getBoundingClientRect().width,a=t.getBoundingClientRect().width,i=o-a;n.getBoundingClientRect().width<i?n.style.left=a+"px":n.style.right=i+"px"}),0!==e(".object-slider").length&&(e(".object-slider__slider").slick({rows:0,slidesToScroll:1,slidesToShow:1,arrows:!0}),e(".object-slider__play").modalVideo({allowAutoplay:!0})),function(){if(0!==e(".object").length){var t=e(".object__navigation-link");tippy(".object__navigation-link[data-tippy-content]",{placement:"bottom",arrow:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="6" fill="none"><path d="M5.094 1.265a2 2 0 012.723 0L12.911 6H0l5.094-4.735z" fill="#fed63f"/></svg>'});var n=document.querySelectorAll(".object__section");if(window.matchMedia("(min-width: 768px)").matches){var o=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){t.removeClass("active");var n=e.target.id;if(!n)return;t.filter("[data-scroll-to=".concat(n,"]")).addClass("active")}})},{rootMargin:"-50% 0% -50% 0%",root:null});n.forEach(function(e){return o.observe(e)})}t.on("click",function(n){n.preventDefault();var o=e(this);o.hasClass("locked")||(t.removeClass("active"),o.addClass("active"))})}}(),function(){var t=document.querySelector(".partner-friends");if(t){t.querySelectorAll(".partner-friends__header").forEach(function(t){t.addEventListener("click",function(n){var o=t.nextElementSibling;t.classList.toggle("active"),t.parentElement.classList.toggle("active"),e(o).slideToggle(200)})});var n=t.querySelector(".partner-friends__wrapper");new SimpleBar(n,{autoHide:!1})}}(),function(){var t=document.querySelector(".partner-links");if(t){t.querySelectorAll(".copy").forEach(function(e){e.addEventListener("click",function(t){t.stopPropagation();var n=e.previousElementSibling;n.disabled=!1,n.select(),n.setSelectionRange(0,99999),document.execCommand("copy"),n.disabled=!0})}),t.querySelectorAll(".partner-links__header").forEach(function(t){t.addEventListener("click",function(n){console.log(n.target);var o=t.nextElementSibling;t.classList.toggle("active"),t.parentElement.classList.toggle("active"),e(o).slideToggle(200)})});var n=t.querySelector(".partner-links__wrapper");new SimpleBar(n,{autoHide:!1})}}(),function(){if(document.querySelector(".partners-wrapper")){var e=_toConsumableArray(document.querySelectorAll(".partners-wrapper__step")),t=[document.querySelector(".partners-choice"),document.querySelector(".partners-status"),document.querySelector(".partners-income")];!function(){var n={rootMargin:"0px 0px -90% 0px",root:null,threshold:[0,.1,.3]};if("IntersectionObserver"in window){var o=new IntersectionObserver(function(n){n.forEach(function(n){var o=n.isIntersecting;if(o){var a=t.indexOf(n.target),i=e.find(function(e){return e.classList.contains("active")}),r=e.indexOf(i),s=e[a];if(r===a)return;i.classList.remove("active"),s.classList.add("active")}})},{rootMargin:n.rootMargin,root:n.root,threshold:n.threshold});t.forEach(function(e){return o.observe(e)})}else setTimeout(function(){items.forEach(function(e){e.classList.add("animated")})},0)}(),e[0].classList.add("active")}}(),function(){var t=document.querySelector(".profit-calc");if(t){var n=document.querySelector(".profit-calc__investment-range"),o=document.querySelector(".profit-calc__investment-value"),a=document.querySelector(".profit-calc__object-link"),i=wNumb({decimals:0,thousand:" "}),r=e(".profit-calc__objects-nav"),s=e(".profit-calc__objects-slider");s.find(".profit-object").each(function(t,o){!function(e){var t=e.find(".profit-object__income .value"),o=e.find(".profit-object__share .value"),a=e.find(".profit-object__rate .value"),r=e.find(".profit-object__step .value"),s=e.data("min"),l=(e.data("max"),e.data("step")),c=e.data("rate");t.on("blur",function(e){var o=i.from(t.text().trim());t.text(i.to(o));var r=parseFloat(a.text()),s=12*o/r*100;n.noUiSlider.set(s),h()}),o.on("blur",function(e){var t=i.from(o.text().trim());isNaN(t)&&(t=s/l);var a=t*l;n.noUiSlider.set(a),h()}),r.on("blur",function(t){var o=i.from(r.text().trim());!isNaN(o)&&o||(o=parseInt(l)),e.attr("data-custom-step",o),function(e,t){var o=e.data("min"),a=e.data("max"),i=t>=o?t:t*Math.ceil(o/t),r=a%t==0?0:t;n.noUiSlider.updateOptions({step:t,padding:[i,r]},!1)}(e,o)}),a.on("blur",function(o){var r=parseFloat(a.text().trim());isNaN(r)&&(r=parseFloat(c)),e.attr("data-custom-rate",r),t.text(i.to(n.noUiSlider.get()*(r/100)/12))})}(e(o))});var l,c,d,u,f=1e6;l=e(e(t).find(".profit-object")[0]),c=l.data("min"),d=l.data("max"),u=l.data("step"),noUiSlider.create(n,{start:f,step:u,animate:!1,connect:"lower",range:{min:0,max:d},padding:[c,0]}),p(l,f),s.on("init",function(t,n){var o=e(n.$slides[n.currentSlide]),a=e(o.children()[0]);p(a,f),v(a)}),s.on("afterChange",function(t,o,a,i){var r=e(o.$slides[a]),s=e(r.children()[0]),l=s.data("min"),c=s.data("max"),d=s.data("step"),u=parseInt(n.noUiSlider.get()),f=c<u?c:u;n.noUiSlider.updateOptions({start:f,step:d,range:{min:0,max:c},padding:[l,0]}),h()}),r.slick({rows:0,slidesToScroll:1,variableWidth:!0,asNavFor:s,arrows:!1,focusOnSelect:!0}),s.slick({rows:0,slidesToShow:1,slidesToScroll:1,arrows:!1,accessibility:!1,asNavFor:r}),n.noUiSlider.on("update",function(t,n){var a=+t[n];o.textContent=i.to(a);var r=s.find(".slick-current"),l=e(r.children()[0]);p(l,a),v(l)}),n.noUiSlider.on("change",function(){h()}),document.addEventListener("keypress",function(e){13===e.keyCode&&e.target.classList.contains("value")&&e.target.isContentEditable&&(e.preventDefault(),e.stopPropagation(),e.target.blur())})}function p(e,t){var n=e.find(".profit-object__income .value"),o=e.find(".profit-object__share .value"),a=e.find(".profit-object__rate .value"),r=e.find(".profit-object__step .value"),s=e.data("rate"),l=parseInt(e.attr("data-custom-rate")),c=e.data("step"),d=parseInt(e.attr("data-custom-step")),u=l||s,f=d||c;o.text(i.to(Math.floor(t/f))),n.text(i.to(t*u/100/12)),a.text(u),r.text(i.to(f))}function v(e){var t=parseInt(n.noUiSlider.get());a.href=e.data("link")+"/"+t}function h(){var t=e(".noUi-connect"),n=e(".noUi-origin");t.addClass("transition"),n.addClass("transition"),setTimeout(function(){t.removeClass("transition"),n.removeClass("transition")},300)}}(),function(){var t=e(".project-calc");if(0!==t.length){var n=e(".project-calc__form"),o=t.find("input[data-format]"),a=t.find("input"),i=a.filter("[required]");a.each(function(t,a){e(a).on("change",function(e){_toConsumableArray(i).every(function(e){return e.value.trim().length>0})&&(_toConsumableArray(o).map(function(e){var t=e.value,n=e.dataset.format;if(t.length>0){var o=r[n].from(t);e.value=o}}),n.serialize(),_toConsumableArray(o).map(function(e){var t=parseInt(e.value),n=e.dataset.format;if(t){var o=r[n].to(t);e.value=o}}))})});var r={meter:wNumb({decimals:0,thousand:" ",suffix:" м²"}),ruble:wNumb({decimals:0,thousand:" ",suffix:" ₽"})};o.each(function(t,n){var o=e(n).data("format"),a=e(n).val()||"";e(n).on("input",function(t){var o=e(n).val();/^[0-9\s]*$/.test(o)?a=o:n.value=a}),e(n).on("blur",function(t){var a=parseInt(e(n).val().split(" ").join(""));a&&e(n).val(r[o].to(a))}),e(n).on("focus",function(t){var a=e(n).val();0!==a.length&&e(n).val(r[o].from(a))})})}}(),function(){var t=e(".project-select"),n=e(".project-select__option"),o=t.filter('[data-type="taxType"]');function a(){var n=t.filter(".active");0!==n.length&&n.each(function(t,n){var o=e(n).find(".project-select__options");e(n).removeClass("active"),o.fadeOut(300)})}t.on("click",function(t){t.stopPropagation(),function(t,n){a(),e(t).addClass("active"),n.fadeIn(300)}(this,e(this).find(".project-select__options"))}),n.on("click",function(t){t.stopPropagation();var n=e(this).data("value"),a=e(this).html(),i=e(this).parents(".project-select"),r=i.find(".project-select__options"),s=i.find(".project-select__selected"),l=i.find(".project-select__input");if(s.html(a),l.val(n),l.trigger("change"),"ownerType"===i.attr("id")){var c=e(this).attr("data-type");o.each(function(t,n){var o=e(n).find(".project-select__input"),a=e(n).find(".project-select__selected"),i=e(n).find(".project-select__option[data-type=".concat(c,"]"));o.val(i.data("value")),a.text(i.data("value"))})}!function(t,n){e(t).removeClass("active"),n.fadeOut(300)}(i,r)}),e(document).on("click",function(){a()})}()}});