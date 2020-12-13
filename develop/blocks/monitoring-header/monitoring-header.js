(function () {
    const chart = document.querySelector('.monitoring-header__chart');
    if (!chart) return;

    const line = chart.querySelector('.line');

    const barData = [
        {
            name: 'Активо восемь',
            data: [
                {
                    y: 20,
                    url: '/aktivo-8',
                },
            ],
        },
        {
            name: 'Активо семь',
            data: [
                {
                    y: 16,
                    url: '/aktivo-7',
                },
            ],
        },
        {
            name: 'Активо шесть',
            data: [
                {
                    y: 16,
                    url: '/aktivo-6',
                },
            ],
        },
        {
            name: 'Активо пять',
            data: [
                {
                    y: 14,
                    url: '/aktivo-5',
                },
            ],
        },
        {
            name: 'Активо четыре',
            data: [
                {
                    y: 12,
                    url: '/aktivo-4',
                },
            ],
        },
        {
            name: 'Активо три',
            data: [
                {
                    y: 9,
                    url: '/aktivo-3',
                },
            ],
        },
        {
            name: 'Активо два',
            data: [
                {
                    y: 7,
                    url: '/aktivo-2',
                },
            ],
        },
        {
            name: 'Активо один',
            data: [
                {
                    y: 6,
                    url: '/aktivo-1',
                },
            ],
        },
    ];

    const barColors = [
        '#79A0FF',
        '#C29BF6',
        '#F598E2',
        '#FF9BC6',
        '#FFA9AB',
        '#FFBD96',
        '#FFD48C',
        '#FFEB93',
    ].reverse();

    /** to save hovered point */
    let selectedPoint = null;

    Highcharts.chart('funds-chart', {
        chart: {
            type: 'bar',
            height: 90,
            margin: 0,
        },
        colors: barColors,
        title: {
            text: '',
        },
        exporting: {
            enabled: false,
        },
        xAxis: [
            {
                categories: ['Фонды'],
                crosshair: false,
                labels: {
                    enabled: false,
                },
                title: {
                    enabled: false,
                },
                visible: false,
                // labels: {
                //     style: {
                //         color: 'rgba(0, 0, 0, 0.4)',
                //         fontSize: '9px',
                //     },
                // },
            },
        ],
        yAxis: {
            max: 100,
            labels: {
                enabled: false,
            },
            title: {
                enabled: false,
            },
            visible: false,
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },

        plotOptions: {
            bar: {
                pointWidth: 30,
            },
            series: {
                stacking: 'normal',
                borderWidth: 0,
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function (e) {
                            selectedPoint = this;

                            line.style.backgroundColor = this.color;
                            line.style.right = this.shapeArgs.y + 'px';
                            line.style.top = this.shapeArgs.x + this.shapeArgs.width + 'px';
                            line.style.width = this.shapeArgs.height + 'px';
                            line.classList.add('visible');
                        },
                        mouseOut: function () {
                            selectedPoint = null;
                            line.classList.remove('visible');
                        },
                        click: function (e) {
                            window.location.href = e.point.url;
                        },
                    },
                },
                // pointPadding: 0,
                // groupPadding: 0,
                states: {
                    hover: {
                        enabled: false,
                    },
                    inactive: {
                        opacity: 1,
                    },
                },
            },
        },
        tooltip: {
            positioner: function (lw, lh, point) {
                const chartWidth = this.chart.plotSizeY;
                const pointWidth = selectedPoint.shapeArgs.height;
                const pointLeftPosition = chartWidth - selectedPoint.plotY - pointWidth;
                let leftOffset = pointLeftPosition + (pointWidth - lw) / 2;
                leftOffset = leftOffset < 0 ? 6 : leftOffset;
                leftOffset = leftOffset + lw > chartWidth ? chartWidth - lw : leftOffset;
                return { x: leftOffset, y: point.plotY + 30 };
            },
            shadow: false,
            padding: 0,
            borderWidth: 0,
            style: {
                fontSize: '10px',
                fontWeight: 600,
                fontFamily: 'Montserrat',
            },
            backgroundColor: 'transparent',
            headerFormat: '',
            hideDelay: 100,
            pointFormatter: function () {
                return `${this.series.name} | ${this.y} %`;
            },
        },
        series: barData,
    });
})();
