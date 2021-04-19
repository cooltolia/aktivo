(function () {
    const objectFinances = $('.object-finances');
    if (objectFinances.length === 0) return;

    const financesTable = document.querySelector('.object-finances__table');
    const lineChart = document.querySelector('#lineChart');
    const lineChartPadding = parseInt(window.getComputedStyle(lineChart.parentNode).paddingLeft);
    let scrolledLineChart = null;
    const columnChart = document.querySelector('#columnChart');
    const columnChartPadding = parseInt(window.getComputedStyle(columnChart.parentNode).paddingLeft);
    let scrolledColumnChart = null;

    const tableWidth = financesTable.firstElementChild.clientWidth;
    const tableWrapperWidth = financesTable.clientWidth;
    if (tableWidth > tableWrapperWidth) financesTable.firstElementChild.style.width = '100%';

    const dataCells = financesTable.querySelectorAll('tr:not(:first-child) td');
    const cellHeight = dataCells[0].getBoundingClientRect().height;
    const regularCellWidth = dataCells[1].getBoundingClientRect().width;

    const vr = document.querySelector('.object-finances__vr');

    const formatValue = wNumb({
        decimals: 2,
        thousand: ' ',
    });

    let labelFontSize = '12px';
    let showGridLine = false;
    let plotColumnWidth = 52;

    if (window.matchMedia('(min-width: 1024px)').matches) {
        labelFontSize = '14px';
        plotColumnWidth = 62;
        showGridLine = true;
    }

    dataCells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            const index = [...cell.parentNode.children].indexOf(cell);
            let leftPadding = 0;
            // if (index === 1) {
            //     leftPadding = -5;
            // }
            const offsetLeft = cell.offsetParent.offsetLeft + cell.offsetLeft + leftPadding - financesTable.scrollLeft;
            vr.style.left = `${offsetLeft}px`;

            vr.classList.add('active');
        });
        cell.addEventListener('mouseout', () => {
            vr.classList.remove('active');
        });
    });

    initScrollContols();

    if (lineChart) {
        const data = [
            242277.779,
            3172259.31,
            1669890.65,
            1647254.72,
            2863786.35,
            2513992.47,
            2795352.5,
            4823505.42,
            2925765.61,
            99999.8,
            242277.779,
            3172259.31,
            1669890.65,
            1647254.72,
            2863786.35,
            2513992.47,
            2795352.5,
            4823505.42,
            2925765.61,
            // 2570890.35,
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
            null,
        ];
        const categories = [
            'Сентябрь 2022',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            'Август 2017',
            'Сентябрь 2022',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            // 'Июнь 2018',
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
            '',
        ];
        const columnWidth = regularCellWidth;
        console.log('columnWidth', columnWidth);
        const chartMinWidth = columnWidth * data.length;
        console.log('chartMinWidth: ', chartMinWidth);

        Highcharts.chart('lineChart', {
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
                    // opacity: 0,
                },
                marginTop: 60,
                marginLeft: 70 + columnWidth / 2,
            },
            title: false,
            credits: {
                enabled: false,
            },
            xAxis: {
                categories,
                opposite: true,
                tickPixelInterval: columnWidth,
                width: columnWidth * data.length,
                gridLineColor: '#197F07',
                // height: 40,
                offset: 30,
                lineWidth: 0,
                tickWidth: 0,
                labels: {
                    align: 'center',
                    reserveSpace: true,
                    x: -2,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        paddingLeft: '5px',
                        whiteSpace: 'nowrap',
                        textAlign: 'right',
                    },
                },
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
                        paddingLeft: '5px',
                    },
                    formatter: function () {
                        return this.value / 1000000 + 'M';
                    },
                },
            },
            plotOptions: {
                spline: {
                    color: '#fed63f',
                    // dataLabels: {
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
                            fontWeight: '400',
                        },
                        formatter: function (a) {
                            const value = parseFloat(this.y);
                            if (value < 100000) {
                                return formatValue.to(+value.toFixed(2)) + ' \u20BD';
                            } else {
                                return formatValue.to(value.toFixed(2) / 1000) + ' тыс. \u20BD';
                            }
                        },
                    },
                    point: {
                        events: {
                            mouseOver: ({ target }) => {
                                if (!showGridLine) return;
                                const magicNumber = 67;
                                vr.style.left = `${
                                    target.clientX + lineChartPadding + magicNumber - scrolledLineChart.scrollLeft
                                }px`;
                                vr.style.marginLeft = '';
                                vr.classList.add('active');
                            },
                            mouseOut: () => {
                                vr.classList.remove('active');
                            },
                        },
                    },
                },
            },
            tooltip: {
                enabled: false,
            },
            series: [
                {
                    data,
                },
            ],
            legend: false,
        });
        scrolledLineChart = lineChart.querySelector('.highcharts-scrolling');
    }

    if (columnChart) {
        const data = [80, 70, 0, 0, 0, 0, 0, 0, 70, 489, 89, 70, 0, 0, 0, 0, 0, 0, 7, null];
        const percentage = [8, 7, 0, 0, 0, 0, 0, 0, 7, 48, 8, 7, 0, 0, 0, 0, 0, 0, 7, null];
        const categories = [
            'Сентябрь 2022',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            'Август 2017',
            'Сентябрь 2022',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            // 'Июнь 2018',
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
            '',
        ];
        const columnWidth = regularCellWidth;
        const chartMinWidth = columnWidth * data.length;

        Highcharts.chart('columnChart', {
            chart: {
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
                    // opacity: 1,
                },
                marginTop: 60,
                marginLeft: 70 + columnWidth / 2,
            },
            title: false,
            credits: {
                enabled: false,
            },
            xAxis: {
                categories,
                opposite: true,
                tickPixelInterval: columnWidth,
                width: columnWidth * data.length,
                offset: 30,
                lineWidth: 0,
                tickWidth: 0,
                labels: {
                    align: 'center',
                    x: -2,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        paddingLeft: '5px',
                        whiteSpace: 'nowrap',
                    },
                },
            },
            yAxis: [
                {
                    title: false,
                    gridLineColor: '#f2f2f2',
                    labels: {
                        padding: 0,
                        style: {
                            color: '#9e9e9e',
                            fontSize: labelFontSize,
                            fontWeight: '600',
                            fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                            whiteSpace: 'nowrap',
                        },
                        formatter: function () {
                            return this.value + 'шт.';
                        },
                    },
                },
                {
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
                            whiteSpace: 'nowrap',
                        },
                        formatter: function () {
                            return this.value + '%';
                        },
                    },
                },
            ],
            plotOptions: {
                column: {
                    color: '#d8d8d8',
                    pointWidth: plotColumnWidth,
                    pointPlacement: 0.22,
                },
                sline: {
                    dataLabels: {
                        formatter: function () {
                            return this.y + '%';
                        },
                    },
                },
            },
            tooltip: {
                enabled: false,
            },
            series: [
                {
                    data,
                    type: 'column',
                    color: 'transparent',
                    dataLabels: {
                        allowOverlap: true,
                        enabled: true,
                        align: 'left',
                        y: -5,
                        format: '{y} шт.',
                        style: {
                            fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                            fontSize: '14px',
                            fontWeight: '400',
                        },
                    },
                    states: {
                        hover: {
                            enabled: false,
                            color: '#fed63f',
                        },
                        inactive: {
                            opacity: 1,
                        },
                    },
                    minPointLength: 10,
                },
                {
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
                            fontWeight: '400',
                        },
                    },
                    states: {
                        hover: {
                            enabled: true,
                            color: '#fed63f',
                        },
                        inactive: {
                            opacity: 1,
                        },
                    },
                    point: {
                        events: {
                            mouseOver: ({ target }) => {
                                if (!showGridLine) return;
                                const magicNumber = 67;

                                vr.style.left = `${
                                    target.clientX + columnChartPadding + magicNumber - scrolledColumnChart.scrollLeft
                                }px`;

                                // vr.style.left = `${
                                //     target.clientX -
                                //     target.pointWidth / 2 +
                                //     columnChartPadding +
                                //     magicNumber -
                                //     scrolledColumnChart.scrollLeft
                                // }px`;
                                vr.style.marginLeft = '';
                                vr.classList.add('active');
                            },
                            mouseOut: () => {
                                vr.classList.remove('active');
                            },
                        },
                    },
                },
            ],
            legend: false,
        });
        scrolledColumnChart = columnChart.querySelector('.highcharts-scrolling');
    }

    function smoothLeftScroll(value) {
        financesTable.scrollTo({
            left: value,
            behavior: 'smooth',
        });

        scrolledLineChart.scrollTo({
            left: value,
            behavior: 'smooth',
        });

        scrolledColumnChart.scrollTo({
            left: value,
            behavior: 'smooth',
        });
    }

    function initScrollContols() {
        let mouseTimer;

        const controls = document.querySelectorAll('.object-finances__controls');

        const scrollNext = document.querySelector('.object-finances__scroll-next');
        const scrollPrev = document.querySelector('.object-finances__scroll-prev');
        const jumpNext = document.querySelector('.object-finances__jump-next');
        const jumpPrev = document.querySelector('.object-finances__jump-prev');
        const maxScrollLeft = financesTable.scrollWidth - financesTable.clientWidth;

        if (tableWidth < tableWrapperWidth) {
            controls.forEach((node) => $(node).hide());
        }

        const debouncedNextClick = debounce(nextClick, 200, true);
        const debouncedPrevClick = debounce(prevClick, 200, true);
        const debouncedJumpNext = debounce(jumpingNext, 200, true);
        const debouncedJumpPrev = debounce(jumpingPrev, 200, true);

        const jumpNextBtns = document.querySelectorAll('.object-finances__controls .jump.next');
        const jumpPrevBtns = document.querySelectorAll('.object-finances__controls .jump.prev');

        jumpNextBtns.forEach((btn) => {
            btn.addEventListener('click', debouncedJumpNext);
        });
        jumpPrevBtns.forEach((btn) => {
            btn.addEventListener('click', debouncedJumpPrev);
        });

        const scrollNextBtns = document.querySelectorAll('.object-finances__controls .scroll.next');
        const scrollPrevBtns = document.querySelectorAll('.object-finances__controls .scroll.prev');

        const touchDevice = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

        scrollNextBtns.forEach((btn) => {
            if (touchDevice) {
                btn.addEventListener('touchstart', debouncedNextClick);
                btn.addEventListener('touchend', () => clearInterval(mouseTimer));
            } else {
                btn.addEventListener('mousedown', debouncedNextClick);
                btn.addEventListener('mouseup', () => clearInterval(mouseTimer));
            }
        });
        scrollPrevBtns.forEach((btn) => {
            if (touchDevice) {
                btn.addEventListener('touchstart', debouncedPrevClick);
                btn.addEventListener('touchend', () => clearInterval(mouseTimer));
            } else {
                btn.addEventListener('mousedown', debouncedPrevClick);
                btn.addEventListener('mouseup', () => clearInterval(mouseTimer));
            }
        });

        function nextClick(e) {
            update();

            mouseTimer = setInterval(update, 500);

            function update() {
                const value = financesTable.scrollLeft + regularCellWidth;

                // show prev
                if (value > maxScrollLeft) {
                    clearInterval(mouseTimer);
                    // return;
                }

                if (value >= maxScrollLeft - regularCellWidth) {
                    toggleGradient('add');
                    //hide next
                }
                smoothLeftScroll(value);
            }
        }

        function prevClick() {
            update();

            toggleGradient('remove');

            mouseTimer = setInterval(update, 500);

            function update() {
                const value = financesTable.scrollLeft - regularCellWidth;

                if (value <= -regularCellWidth) {
                    clearInterval(mouseTimer);
                    return;
                }

                if (value <= 0) {
                    // hide prev
                }

                if (value <= maxScrollLeft) {
                    // show next
                    smoothLeftScroll(value);
                }
            }
        }
        function jumpingNext(e) {
            const value = financesTable.scrollLeft + regularCellWidth * 6;

            //show prev

            if (value >= maxScrollLeft - regularCellWidth * 6) {
                smoothLeftScroll(maxScrollLeft);
                toggleGradient('add');
                // hide next
            } else {
                smoothLeftScroll(value);
            }
        }

        function jumpingPrev(e) {
            const value = financesTable.scrollLeft - regularCellWidth * 6;
            toggleGradient('remove');

            if (value <= -regularCellWidth) {
                smoothLeftScroll(0);
            }

            if (value <= 0) {
                // hide prev
            }

            if (value <= maxScrollLeft) {
                // show next
                smoothLeftScroll(value);
            }
        }

        function toggleGradient(action) {
            financesTable.parentNode.classList[action]('finished');
        }
    }
})();
