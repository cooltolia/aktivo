(function () {
    const chart = document.getElementById('income-monitoring');
    if (!chart) return;

    const profitData = [2500, 1700, 1200, 1600, 1250, 650, 2500, 1700, 1200, 1600, 1250, 650];
    const dividendsData = [5, 10, 20, 35, 20, 15, 5, 20, 20, 35, 20, 15];
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
        var scrolledArea = chart.querySelector('.highcharts-scrolling');
        if (scrolledArea.length === 0) return;
        new SimpleBar(scrolledArea, {
            autoHide: false,
        });
    }, 1000);

    var columnWidth = 50;
    var chartMinWidth = columnWidth * 1.25 * profitData.length;

    const onChartLoad = function () {
        const points0 = this.series[0].data;
        const points1 = this.series[1].data;

        points0.forEach(function (point, i) {
            let { x, y } = point.dataLabel.attr();
            const { height } = point.dataLabel.getBBox();
            let { x: x1, y: y1 } = points1[i].dataLabel.attr();
            const { height: height1 } = points1[i].dataLabel.getBBox();

            if (y + height * 1.1 > y1 && y < y1 + height1 * 1.1) {
                if (y < y1) {
                    y1 = y - height * 1.25;
                } else {
                    y = y1 + height1 * 1.25;
                }
            }

            points1[i].dataLabel.attr({ x: x1, y: y1 });
            point.dataLabel.attr({ x: x, y: y });
        });
    };

    Highcharts.chart('income-monitoring', {
        chart: {
            marginTop: 20,
            marginRight: 24,
            marginLeft: 24,
            scrollablePlotArea: {
                minWidth: chartMinWidth,
            },
            events: {
                load: onChartLoad,
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
                dataLabels: {
                    allowOverlap: true,
                },
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
                    padding: 10,
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
                        return this.y < 1000 ? this.y : this.y / 1000 + 'k';
                    },
                },
            },
        },
        xAxis: [
            {
                categories: chartDates,
                crosshair: false,
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
                // visible: false,
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
