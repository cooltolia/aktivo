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

    let labelFontSize = '12px';
    let showGridLine = false;

    if (window.matchMedia('(min-width: 1024px)').matches) {
        labelFontSize = '14px';
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
    scrollNext.addEventListener('click', debouncedNextClick);
    scrollPrev.addEventListener('click', debouncedPrevClick);

    function nextClick() {
        const value = financesTable.scrollLeft + regularCellWidth;

        if (value > 0) {
            scrollPrev.classList.add('active');
        }

        if (value >= maxScrollLeft - regularCellWidth) {
            scrollNext.classList.remove('active');
        }

        smoothLeftScroll(value);
    }

    function prevClick() {
        const value = financesTable.scrollLeft - regularCellWidth;
        smoothLeftScroll(value);

        if (value <= 0) {
            scrollPrev.classList.remove('active');
        }

        if (value <= maxScrollLeft) {
            scrollNext.classList.add('active');
        }
    }

    if (lineChart) {
        const data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, null];
        const categories = [
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
                labels: {
                    padding: 5,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        paddingLeft: '5px',
                    },
                },
            },
            plotOptions: {
                line: {
                    color: '#fed63f',
                    dataLabels: {
                        enabled: false,
                    },
                },
                series: {
                    point: {
                        events: {
                            mouseOver: ({ target }) => {
                                if (!showGridLine) return;
                                const magicNumber = 34;
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
        const data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, null];
        const categories = [
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
                    },
                },
            },
            yAxis: {
                title: false,
                gridLineColor: '#f2f2f2',
                labels: {
                    padding: 5,
                    style: {
                        color: '#9e9e9e',
                        fontSize: labelFontSize,
                        fontWeight: '600',
                        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif;',
                        paddingLeft: '5px',
                    },
                },
            },
            plotOptions: {
                column: {
                    color: '#d8d8d8',
                    dataLabels: {
                        enabled: false,
                    },
                    pointWidth: 122,
                    pointPlacement: 0.37,
                },
            },
            tooltip: {
                enabled: false,
            },
            series: [
                {
                    data,
                    states: {
                        hover: {
                            color: '#fed63f',
                        },
                    },
                    point: {
                        events: {
                            mouseOver: ({ target }) => {
                                if (!showGridLine) return;
                                const magicNumber = 41;

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
