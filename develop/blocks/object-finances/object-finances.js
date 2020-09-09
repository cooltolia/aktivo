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

    const dataCells = financesTable.querySelectorAll('tr:not(:first-child) td');
    const cellHeight = dataCells[0].getBoundingClientRect().height;
    const regularCellWidth = dataCells[1].getBoundingClientRect().width;

    const hr = document.querySelector('.object-finances__hr');
    const vr = document.querySelector('.object-finances__vr');

    const formatValue = wNumb({
        decimals: 2,
        thousand: ' ',
    });

    let labelFontSize = '12px';
    let showGridLine = false;
    let plotColumnWidth = 52;

    if (window.matchMedia('(min-width: 1024px)').matches) {
        labelFontSize = '15px';
        plotColumnWidth = 62;
        showGridLine = true;
    }

    dataCells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            const offsetTop = cell.offsetParent.offsetTop + cell.offsetTop + cellHeight;
            hr.style.top = `${offsetTop}px`;
            const index = [...cell.parentNode.children].indexOf(cell);
            let leftPadding = -5;
            if (index === 1) {
                leftPadding = parseInt(window.getComputedStyle(cell).paddingLeft) - 5;
            }
            const offsetLeft = cell.offsetParent.offsetLeft + cell.offsetLeft + leftPadding - financesTable.scrollLeft;
            vr.style.left = `${offsetLeft}px`;
            vr.style.marginLeft = '16px';

            hr.classList.add('active');
            vr.classList.add('active');
        });
        cell.addEventListener('mouseout', () => {
            hr.classList.remove('active');
            vr.classList.remove('active');
        });
    });

    const scrollNext = document.querySelector('.object-finances__scroll-next');
    const scrollPrev = document.querySelector('.object-finances__scroll-prev');
    const jumpNext = document.querySelector('.object-finances__jump-next');
    const jumpPrev = document.querySelector('.object-finances__jump-prev');
    const maxScrollLeft = financesTable.scrollWidth - financesTable.clientWidth;

    const debouncedNextClick = debounce(nextClick, 200, true);
    const debouncedPrevClick = debounce(prevClick, 200, true);
    const debouncedJumpNext = debounce(jumpingNext, 200, true);
    const debouncedJumpPrev = debounce(jumpingPrev, 200, true);

    jumpNext.addEventListener('click', debouncedJumpNext);
    jumpPrev.addEventListener('click', debouncedJumpPrev);

    const touchDevice = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    console.log('touchDevice: ', touchDevice);

    if (touchDevice) {
        scrollNext.addEventListener('touchstart', debouncedNextClick);
        scrollNext.addEventListener('touchend', () => clearInterval(mouseTimer));
        scrollPrev.addEventListener('touchstart', debouncedPrevClick);
        scrollPrev.addEventListener('touchend', () => clearInterval(mouseTimer));
    } else {
        scrollNext.addEventListener('mousedown', debouncedNextClick);
        scrollNext.addEventListener('mouseup', () => clearInterval(mouseTimer));
        scrollPrev.addEventListener('mousedown', debouncedPrevClick);
        scrollPrev.addEventListener('mouseup', () => clearInterval(mouseTimer));
    }

    let mouseTimer;

    function nextClick(e) {
        update();

        mouseTimer = setInterval(update, 500);

        function update() {
            const value = financesTable.scrollLeft + regularCellWidth;

            scrollPrev.classList.add('active');
            jumpPrev.classList.add('active');
            if (value > maxScrollLeft) {
                clearInterval(mouseTimer);
                // return;
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
            const value = financesTable.scrollLeft - regularCellWidth;

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
        const value = financesTable.scrollLeft + regularCellWidth * 6;

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
        const value = financesTable.scrollLeft - regularCellWidth * 6;

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
        const data = [
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
            'Август 2017',
            'Сентябрь 2017',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            'Август 2017',
            'Сентябрь 2017',
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
        console.log(columnWidth);
        const chartMinWidth = columnWidth * data.length;

        Highcharts.chart('lineChart', {
            chart: {
                type: 'line',
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
                    // opacity: 0,
                },
                marginTop: 60,
                marginLeft: 60,
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
                    align: 'left',
                    // x: -5,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        paddingLeft: '5px',
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
                line: {
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
                                const magicNumber = 54;
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
        const data = [480, 80, 70, 0, 0, 0, 0, 0, 0, 70, 489, 89, 70, 0, 0, 0, 0, 0, 0, 7, null];
        const percentage = [48, 8, 7, 0, 0, 0, 0, 0, 0, 7, 48, 8, 7, 0, 0, 0, 0, 0, 0, 7, null];
        const categories = [
            'Август 2017',
            'Сентябрь 2017',
            'Октябрь 2017',
            'Ноябрь 2017',
            'Декабрь 2017',
            'Январь 2018',
            'Февраль 2018',
            'Март 2018',
            'Апрель 2018',
            'Май 2018',
            'Август 2017',
            'Сентябрь 2017',
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
                    // opacity: 0,
                },
                marginTop: 60,
                marginLeft: 60,
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
                    align: 'left',
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
                    },
                },
            ],
            plotOptions: {
                column: {
                    color: '#d8d8d8',
                    pointWidth: plotColumnWidth,
                    pointPlacement: 0.22,
                },
                line: {
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

                    dataLabels: {
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
                            // enabled: false,
                            color: '#fed63f',
                        },
                        inactive: {
                            opacity: 1,
                        },
                    },
                    minPointLength: 10,
                    point: {
                        events: {
                            mouseOver: ({ target }) => {
                                if (!showGridLine) return;
                                const magicNumber = 59;

                                vr.style.left = `${
                                    target.clientX -
                                    target.pointWidth / 2 +
                                    columnChartPadding +
                                    magicNumber -
                                    scrolledColumnChart.scrollLeft
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
                {
                    data: percentage,
                    name: 'Доходность',
                    type: 'line',
                    color: '#000',
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
                            enabled: false,
                        },
                        inactive: {
                            opacity: 1,
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
})();
