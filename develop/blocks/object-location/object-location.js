// (function () {
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
