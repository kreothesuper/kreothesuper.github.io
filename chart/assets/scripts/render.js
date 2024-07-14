
const date = [
    [
        { day: '2024-06-25', count: 30 },
        { day: '2024-06-26', count: 70 },
        { day: '2024-06-27', count: 70 },
    ],
    [
        { day: '2024-06-25', count: 70 },
        { day: '2024-06-26', count: 70 },
        { day: '2024-06-27', count: 70 },
    ],
    [
        { day: '2024-06-25', count: 70 },
        { day: '2024-06-26', count: 70 },
        { day: '2024-06-27', count: 70 },
    ],
]


// оплаты 2й чарт
const renderIncomeChartSecond = (data) => {
    const incomeChartSecond = document.getElementById('incomechart-second');
    if (incomeChartSecond) {
        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });

        const dayValues = largestArray.map(item => item.day);

        let chartStatus = Chart.getChart("incomechart-second");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        new Chart(incomeChartSecond, {
            type: 'line',
            interaction: {
                mode: 'index',
            },
            responsive: true,
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: '',
                        data:  data[0].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#03B2FE',
                        borderColor: '#03B2FE',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: '#03B2FE',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',

                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#03B2FE',
                        pointHoverRadius: 10,
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                    },
                    {
                        label: '',
                        data:data[1].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#C2DFEC',
                        borderColor: '#C2DFEC',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: '#C2DFEC',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',

                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#C2DFEC',
                        pointHoverRadius: 10,
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'nearest',
                    // axis: 'y',
                    intersect: false
                },
                elements: {
                    line: {
                        tension: 0.4,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {

                        // Disable the on-canvas tooltip
                        enabled: false,
                        callbacks: {
                            title: function (context) {
                                return ''
                            },
                        },
                        external: function (context) {
                            // Tooltip Element
                            let tooltipEl = document.getElementById('chartjs-tooltip');

                            // Create element on first render
                            if (!tooltipEl) {
                                tooltipEl = document.createElement('div');
                                tooltipEl.id = 'chartjs-tooltip';
                                tooltipEl.innerHTML = '<table></table>';
                                document.body.appendChild(tooltipEl);
                            }

                            // Hide if no tooltip
                            const tooltipModel = context.tooltip;
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = 0;
                                return;
                            }

                            // Set caret Position
                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                            if (tooltipModel.yAlign) {
                                tooltipEl.classList.add(tooltipModel.yAlign);
                            } else {
                                tooltipEl.classList.add('no-transform');
                            }

                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }

                            // Set Text
                            if (tooltipModel.body) {
                                const titleLines = tooltipModel.title || [];
                                const bodyLines = tooltipModel.body.map(getBody);

                                let innerHtml = '<thead>';

                                titleLines.forEach(function (title) {
                                    innerHtml += '<tr><th>' + title + '</th></tr>';
                                });
                                innerHtml += '</thead><tbody>';

                                bodyLines.forEach(function (body, i) {
                                    const colors = tooltipModel.labelColors[i];
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.borderColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; border-radius:5px';
                                    const span = '<span style="' + style + '">' + body + '₽' + '</span>';
                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                });
                                innerHtml += '</tbody>';

                                let tableRoot = tooltipEl.querySelector('table');
                                tableRoot.innerHTML = innerHtml;
                            }

                            const position = context.chart.canvas.getBoundingClientRect();
                            const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                            // Display, position, and set styles for font
                            tooltipEl.style.opacity = 1;
                            tooltipEl.style.position = 'absolute';
                            tooltipEl.style.color = '#fff';
                            tooltipEl.style.fontWeight = '500';
                            tooltipEl.style.fontFamily = ' "TT Norms", sans-serif';
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                            tooltipEl.style.top = position.top - 30 + window.pageYOffset + tooltipModel.caretY + 'px';
                            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                            tooltipEl.style.pointerEvents = 'none';
                        }
                    }
                },
                scales: {
                    y: {
                        display: false,
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        border: {
                            display: false,
                        },
                        ticks: {
                            callback: function (val, index) {
                                return formatMonth(this.getLabelForValue(val)).substring(0, 3).toUpperCase();
                            },
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }

}

renderIncomeChartSecond(date)
// оплаты
const renderIncomeChart = (data) => {
    const incomeChart = document.getElementById('incomechart');
    if (incomeChart) {
        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });

        const dayValues = largestArray.map(item => item.day);

        let chartStatus = Chart.getChart("incomechart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        new Chart(incomeChart, {
            type: 'line',
            interaction: {
                mode: 'index',
            },
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: '',
                        data:  data[0].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#4318FF',
                        borderColor: '#4318FF',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#4318FF',
                        pointHoverRadius: 10,
                    },
                    {
                        label: '',
                        data:  data[1].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#7B6CBF',
                        borderColor: '#7B6CBF',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#7B6CBF',
                        pointHoverRadius: 10,
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'nearest',
                    // axis: 'y',
                    intersect: false
                },
                elements: {
                    line: {
                        tension: 0.4,
                    }
                },

                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        // Disable the on-canvas tooltip
                        enabled: false,
                        callbacks: {
                            title: function (context) {
                                return ''
                            },
                        },
                        external: function (context) {
                            // Tooltip Element
                            let tooltipEl = document.getElementById('chartjs-tooltip');

                            // Create element on first render
                            if (!tooltipEl) {
                                tooltipEl = document.createElement('div');
                                tooltipEl.id = 'chartjs-tooltip';
                                tooltipEl.innerHTML = '<table></table>';
                                document.body.appendChild(tooltipEl);
                            }

                            // Hide if no tooltip
                            const tooltipModel = context.tooltip;
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = 0;
                                return;
                            }

                            // Set caret Position
                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                            if (tooltipModel.yAlign) {
                                tooltipEl.classList.add(tooltipModel.yAlign);
                            } else {
                                tooltipEl.classList.add('no-transform');
                            }

                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }

                            // Set Text
                            if (tooltipModel.body) {
                                const titleLines = tooltipModel.title || [];
                                const bodyLines = tooltipModel.body.map(getBody);

                                let innerHtml = '<thead>';

                                titleLines.forEach(function (title) {
                                    innerHtml += '<tr><th>' + title + '</th></tr>';
                                });
                                innerHtml += '</thead><tbody>';

                                bodyLines.forEach(function (body, i) {
                                    const colors = tooltipModel.labelColors[i];
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.borderColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; border-radius:5px';
                                    const span = '<span style="' + style + '">' + body + '₽' + '</span>';
                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                });
                                innerHtml += '</tbody>';

                                let tableRoot = tooltipEl.querySelector('table');
                                tableRoot.innerHTML = innerHtml;
                            }

                            const position = context.chart.canvas.getBoundingClientRect();
                            const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                            // Display, position, and set styles for font
                            tooltipEl.style.opacity = 1;
                            tooltipEl.style.position = 'absolute';
                            tooltipEl.style.color = '#fff';
                            tooltipEl.style.fontWeight = '500';
                            tooltipEl.style.fontFamily = ' "TT Norms", sans-serif';
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                            tooltipEl.style.top = position.top - 30 + window.pageYOffset + tooltipModel.caretY + 'px';
                            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                            tooltipEl.style.pointerEvents = 'none';
                        }
                    },
                },
                scales: {
                    y: {
                        display: false,
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        display: false,
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }
}
renderIncomeChart(date)
// Операции
const renderOperationChart = (data) => {
    const operationchart = document.getElementById('operationchart');
    if (operationchart) {
        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatDate = (date) => `${new Date(date).getDate()} - ${formatMonth(date).substring(0, 3)}.`;
        const formatDay = (date) => new Date(date).getDate();
        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });

        const dayValues = largestArray.map(item => item.day);

        let chartStatus = Chart.getChart("operationchart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        const operationChartItem = new Chart(operationchart, {
            type: 'bar',
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: 'Возвраты',
                        data: data[0].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#FAFF18',
                        borderRadius: 50,

                    },
                    {
                        label: 'Претензии',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#FFCC18',
                        borderRadius: 50,

                    },
                    {
                        label: 'Чарджи',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#FF1818',
                        borderRadius: 50,

                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                categoryPercentage: .85,
                barPercentage: 1,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return `${formatDate(context[0].label)}`
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,

                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        beginAtZero: true,
                        barPercentage: 1,
                        categoryPercentage: 1,
                        ticks: {
                            callback: function (val, index) {
                                return formatDay(this.getLabelForValue(val));
                            },
                        },
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }
}

renderOperationChart(date)

// Трафик
const renderTrafficChart = (data) => {
    const trafficChart = document.getElementById('trafficchart');
    if (trafficChart) {
        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatDate = (date) => `${new Date(date).getDate()} - ${formatMonth(date).substring(0, 3)}.`;
        const formatDay = (date) => new Date(date).getDate();
        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });

        const dayValues = largestArray.map(item => item.day);

        let chartStatus = Chart.getChart("trafficchart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        const trafficChartItem = new Chart(trafficChart, {
            type: 'bar',
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: '',
                        data: data[0].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#18FFFF',
                        borderRadius: 50,

                    },
                    {
                        label: '',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#4318FF',
                        borderRadius: 50,

                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                categoryPercentage: .85,
                barPercentage: 1,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return `${formatDate(context[0].label)}`
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,

                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    },
                    x: {
                        beginAtZero: true,
                        barPercentage: 1,
                        categoryPercentage: 1,
                        ticks: {
                            callback: function (val, index) {
                                return formatDay(this.getLabelForValue(val));
                            },
                        },
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }
}

renderTrafficChart(date)


// Активность разделов
const renderActivityChart = (data) => {
    const activityChart = document.getElementById('activityChart');

    if (activityChart) {

        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatDate = (date) => `${new Date(date).getDate()} - ${formatMonth(date).substring(0, 3)}.`;
        const formatDay = (date) => new Date(date).getDate();
        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });

        const dayValues = largestArray.map(item => item.day);

        let chartStatus = Chart.getChart("activityChart");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        new Chart(activityChart, {
            type: 'bar',
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: 'умный поиск',
                        data: data[0].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#7B20A6',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                    },
                    {
                        label: 'аналитика вк',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#28B8E5',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                    },
                    {
                        label: 'мониторинг поиска',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#E3D6E9',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return `${formatDate(context[0].label)}`
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,
                        stacked: true,
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                    },
                    x: {
                        beginAtZero: true,
                        barPercentage: 1,
                        stacked: true,
                        categoryPercentage: 1,
                        ticks: {
                            callback: function (val, index) {
                                return formatDay(this.getLabelForValue(val));
                            },
                        },
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }

}


renderActivityChart(date);