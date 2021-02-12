(function () {
    const chart = document.getElementById('income-monitoring');
    if (!chart) return;

    [7];

    // const profitData = [2500, 1700, 22200, 1600, 1250, 650, 2500, 1700, 1200, 1600, 1250, 650];
    // const dividendsData = [5, 10, 20, 85, 20, 15, 5, 20, 20, 35, 20, 15];
    const profitData = [
        122442.8,
        5786.51,
        174648.8,
        65352.25,
        21275.49,
        748878.0,
        82916.36,
        49460.5,
        65876.33,
        50389.35,
        53762.3,
        11285.56,
    ];
    const dividendsData = [87.2, 195.3, 13.8, 13.9, 4.3, 309.7, 17.9, 10.3, 14, 10.6, 11.4, 2.3];
    const chartDates = [
        '02.18',
        '03.18',
        '04.18',
        '05.18',
        '06.18',
        '07.18',
        '08.18',
        '09.18',
        '10.18',
        '11.18',
        '12.18',
        '01.19',
    ];
    const dividendsMax = Math.max(...dividendsData);
    const profitMax = Math.max(...profitData);

    const styles = getComputedStyle(chart);
    const fundColor = styles.getPropertyValue('--fund-color').trim();

    setTimeout(() => {
        const scrolledArea = chart.querySelector('.highcharts-scrolling');
        if (scrolledArea.length === 0) return;
        const scroll = new SimpleBar(scrolledArea, {
            autoHide: false,
        });
        // const scrolledContent = scroll.getScrollElement();
        // scrolledContent.scrollLeft = scrolledContent.scrollWidth;
    }, 1000);

    const columnWidth = 50;
    const chartMinWidth = columnWidth * 1.25 * profitData.length;

    const onChartLoad = function () {
        const points0 = this.series[0].data;
        const points1 = this.series[1].data;

        points0.forEach(function (point, i) {
            let { y } = point.dataLabel.attr();
            const { height } = point.dataLabel.getBBox();
            let { y: y1, opacity: opacity1 } = points1[i].dataLabel.attr();
            const { height: height1 } = points1[i].dataLabel.getBBox();

            if (opacity1 === 0 && y + height > y1 + 5) {
                y1 = y + height1 - 30;
            }

            points1[i].dataLabel.attr({ y: y1, opacity: 1 });
        });
    };

    Highcharts.chart('income-monitoring', {
        chart: {
            marginTop: 30,
            marginRight: 24,
            marginLeft: 24,
            scrollablePlotArea: {
                minWidth: chartMinWidth,
            },
            events: {
                render: onChartLoad,
            },
        },
        title: {
            text: '',
        },
        exporting: {
            enabled: false,
        },
        plotOptions: {
            series: {
                dataLabels: {},
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
            },
            line: {
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
                        fontFamily: 'Montserrat',
                    },
                    formatter: function () {
                        return this.y + '%';
                    },
                },
            },
            column: {
                pointWidth: columnWidth,
                dataLabels: {
                    align: 'center',
                    enabled: true,
                    color: 'black',
                    padding: 2,
                    crop: false,
                    overflow: 'none',
                    style: {
                        textOutline: 'none',
                        fontSize: '10px',
                        fontWeight: 500,
                        fontFamily: 'Montserrat',
                    },
                    formatter: function () {
                        if (this.y >= 1000000) return (this.y / 1000000).toFixed(2) + '<br/>млн. ₽';
                        else if (this.y >= 1000) return (this.y / 1000).toFixed(2) + '<br/>тыс. ₽';
                        else return this.y + ' ₽';
                    },
                },
            },
        },
        xAxis: [
            {
                categories: chartDates,
                crosshair: false,
                offset: 20,
                labels: {
                    style: {
                        color: '#696969',
                        fontSize: '10px',
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                    },
                },
            },
        ],
        yAxis: [
            {
                visible: false,
                min: 0,
                max: dividendsMax,
                title: {
                    text: '',
                },

                opposite: true,
                labels: {
                    x: 5,
                },
            },
            {
                visible: false,
                max: profitMax,
                title: {
                    text: '',
                },
                width: 40,
                labels: {
                    x: -6,
                },
            },
        ],
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: 'Сумма выплат',
                type: 'column',
                yAxis: 1,
                data: profitData,
                color: fundColor,
                tooltip: {
                    // valueSuffix: " 000 руб"
                    pointFormatter: function () {
                        return (
                            'Сумма выплат: <b>' +
                            this.y.toLocaleString() +
                            ' 000 руб</b><br>' +
                            'Доля от общих выплат: <b>' +
                            Math.floor((this.y / profitData.reduce((x, y) => x + y, 0)) * 100) +
                            '%</b>'
                        );
                    },
                },
            },
            {
                name: 'Доходность',
                type: 'line',
                data: dividendsData,
                color: '#000',
                tooltip: {
                    valueSuffix: '%',
                },
            },
        ],
    });
})();
