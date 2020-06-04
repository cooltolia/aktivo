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
    const firstCellWidth = dataCells[0].getBoundingClientRect().width;
    console.log(regularCellWidth);

    const hr = document.querySelector('.object-finances__hr');
    const vr = document.querySelector('.object-finances__vr');

    const formatValue = wNumb({
        decimals: 2,
        thousand: ' ',
    });

    let labelFontSize = '12px';
    let showGridLine = false;
    let plotColumnWidth = 102;

    if (window.matchMedia('(min-width: 1024px)').matches) {
        labelFontSize = '14px';
        plotColumnWidth = 122;
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
    const maxScrollLeft = financesTable.scrollWidth - financesTable.clientWidth;
    console.log('maxScrollLeft: ', maxScrollLeft);

    const debouncedNextClick = debounce(nextClick, 200, true);
    const debouncedPrevClick = debounce(prevClick, 200, true);
    // scrollNext.addEventListener('click', debouncedNextClick);
    // scrollPrev.addEventListener('click', debouncedPrevClick);

    scrollNext.addEventListener('mousedown', debouncedNextClick);
    scrollNext.addEventListener('touchstart', debouncedNextClick);
    scrollNext.addEventListener('mouseup', () => clearInterval(mouseTimer));
    scrollNext.addEventListener('touchend', () => clearInterval(mouseTimer));
    scrollPrev.addEventListener('mousedown', debouncedPrevClick);
    scrollPrev.addEventListener('touchstart', debouncedPrevClick);
    scrollPrev.addEventListener('mouseup', () => clearInterval(mouseTimer));
    scrollPrev.addEventListener('touchend', () => clearInterval(mouseTimer));

    let mouseTimer;

    function nextClick(e) {
        update();

        mouseTimer = setInterval(update, 500);

        function update() {
            const value = financesTable.scrollLeft + regularCellWidth;

            scrollPrev.classList.add('active');
            if (value > maxScrollLeft) {
                clearInterval(mouseTimer);
                return;
            }

            if (value >= maxScrollLeft - regularCellWidth) {
                scrollNext.classList.remove('active');
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
            }

            if (value <= maxScrollLeft) {
                scrollNext.classList.add('active');
                smoothLeftScroll(value);
            }
        }
    }

    if (lineChart) {
        const data = [
            3650.28,
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
            2570890.35,
            4195441.54,
            1001971.62,
            3348942.76,
            4656600.96,
            3395237.74,
            2890238.47,
            3082031.01,
            2952247,
            4196775.21,
            3602760.57,
            4025475.32,
            2729290.73,
            3654850.22,
            1135382.72,
            2504889.49,
            2557290.57,
            1795512.88,
            3098144.21,
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
            'Июнь 2018',
            'Июль 2018',
            'Август 2018',
            'Сентябрь 2018',
            'Октябрь 2018',
            'Ноябрь 2018',
            'Декабрь 2018',
            'Январь 2019',
            'Февраль 2019',
            'Март 2019',
            'Апрель 2019',
            'Май 2019',
            'Июнь 2019',
            'Июль 2019',
            'Август 2019',
            'Сентябрь 2019',
            'Октябрь 2019',
            'Ноябрь 2019',
            'Декабрь 2019',
            'Январь 2020',
            '',
        ];
        const columnWidth = regularCellWidth;
        const chartMinWidth = columnWidth * data.length;

        Highcharts.chart('lineChart', {
            chart: {
                type: 'line',
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
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
        const data = [48, 8, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null];
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
            'Июнь 2018',
            'Июль 2018',
            'Август 2018',
            'Сентябрь 2018',
            'Октябрь 2018',
            'Ноябрь 2018',
            'Декабрь 2018',
            'Январь 2019',
            'Февраль 2019',
            'Март 2019',
            'Апрель 2019',
            'Май 2019',
            'Июнь 2019',
            'Июль 2019',
            'Август 2019',
            'Сентябрь 2019',
            'Октябрь 2019',
            'Ноябрь 2019',
            'Декабрь 2019',
            'Январь 2020',
            '',
        ];
        const columnWidth = regularCellWidth;
        const chartMinWidth = columnWidth * data.length;

        Highcharts.chart('columnChart', {
            chart: {
                type: 'column',
                scrollablePlotArea: {
                    minWidth: chartMinWidth,
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
                // height: 40,
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
            yAxis: {
                title: false,
                gridLineColor: '#f2f2f2',
                // offset: 50,
                labels: {
                    padding: 0,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        // paddingLeft: '5px',
                        whiteSpace: 'nowrap',
                    },
                },
            },
            plotOptions: {
                column: {
                    color: '#d8d8d8',
                    pointWidth: plotColumnWidth,
                    pointPlacement: 0.37,
                },
            },
            tooltip: {
                enabled: false,
            },
            series: [
                {
                    data,
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
                            color: '#fed63f',
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
})();
