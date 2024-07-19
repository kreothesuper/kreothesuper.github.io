// оплаты 2й чарт
const renderIncomeChartSecond = (data) => {
    const incomeChartSecond = document.getElementById('incomechart-second');
    if (incomeChartSecond) {
        const largestArray = data.reduce((prev, current) => (prev.length > current.length) ? prev : current);

        const formatMonth = (date) => new Date(date).toLocaleDateString("ru", { month: "short" });
        const formatDay = (date) => new Date(date).getDate();
        const formatDate = (date) => `${new Date(date).getDate()} - ${formatMonth(date).substring(0, 3)}.`;

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
                        data: data[0].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#4EB6E2',
                        borderColor: '#4EB6E2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: '#4EB6E2',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',

                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#4EB6E2',
                        pointHoverRadius: 10,
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                    },
                    {
                        label: '',
                        data: data[1].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#A9C7D2',
                        borderColor: '#A9C7D2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: '#A9C7D2',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',

                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#A9C7D2',
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
                                    const monthText = formatDate(tooltipModel.dataPoints[0].label);
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.borderColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; text-align:center';
                                    style += '; border-radius:5px';
                                    style += `; --background-triangle:${tooltipModel.dataPoints[0].dataset.backgroundColor}`;
                                    const span = '<span style="' + style + '">' + monthText + '<br>' + body + '₽' + '</span>';
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
                        border: {
                            display: false,
                        },
                        ticks: {
                            callback: function (val, index) {
                                return formatDay(this.getLabelForValue(val));
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
        const formatDate = (date) => `${new Date(date).getDate()} - ${formatMonth(date).substring(0, 3)}.`;

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
                        data: data[0].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#732BA2',
                        borderColor: '#732BA2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#732BA2',
                        pointHoverRadius: 10,
                    },
                    {
                        label: '',
                        data: data[1].map(item => item.count),
                        borderWidth: 4,
                        backgroundColor: '#9B7FAD',
                        borderColor: '#9B7FAD',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        pointRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#9B7FAD',
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
                                    const monthText = formatDate(tooltipModel.dataPoints[0].label);
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.borderColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; text-align:center';
                                    style += '; border-radius:5px';
                                    style += `; --background-triangle:${tooltipModel.dataPoints[0].dataset.backgroundColor}`;
                                    const span = '<span style="' + style + '">' + monthText + '<br>' + body + '₽' + '</span>';
                                    const triangle = '<span class="tooltip-triangle" style="' + 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor + '"></span>';
                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                    innerHtml += '<tr><td>' + triangle + '</td></tr>';
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
        const backgroundBar = {
            id: 'backgroundBar',
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { data, ctx, chartArea: { top, bottom, left, right, width,
                    height }, scales: { x, y } } = chart;

                ctx.save();
                const segment = width / largestArray.length;
                const barWidth = segment * pluginOptions.barPercentage * pluginOptions.categoryPercentage;

                ctx.fillStyle = pluginOptions.barColor;
                for (let i = 0; i < largestArray.length; i++) {
                    ctx.fillRect(x.getPixelForValue(i) - barWidth / 2, top, barWidth, height);
                }
            }
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
                        backgroundColor: '#ffe400',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor: '#060011',
                    },
                    {
                        label: 'Претензии',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#ff9200',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor: '#060011',
                    },
                    {
                        label: 'Чарджи',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#c12910',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor: '#fff',

                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                categoryPercentage: .85,
                barPercentage: .9,
                plugins: {
                    backgroundBar: {
                        barColor: '#f8f8f8',
                        categoryPercentage: .85,
                        barPercentage: .9,
                    },
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
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor;
                                    const monthText = formatDate(tooltipModel.dataPoints[0].label);
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.75);';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; border-radius:5px';
                                    style += '; display:block';
                                    style += `; color:${tooltipModel.dataPoints[0].dataset.customTooltipColor}`;
                                    style += '; text-align:center';
                                    style += `; --background-triangle:${tooltipModel.dataPoints[0].dataset.backgroundColor}`;
                                    const span = '<span style="' + style + '">' + monthText + '<br>' + body + '</span>';
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
                },
            },
            plugins: [backgroundBar],
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

        const backgroundBar = {
            id: 'backgroundBar',
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { data, ctx, chartArea: { top, bottom, left, right, width,
                    height }, scales: { x, y } } = chart;

                ctx.save();
                const segment = width / largestArray.length;
                const barWidth = segment * pluginOptions.barPercentage * pluginOptions.categoryPercentage;

                ctx.fillStyle = pluginOptions.barColor;
                for (let i = 0; i < largestArray.length; i++) {
                    ctx.fillRect(x.getPixelForValue(i) - barWidth / 2, top, barWidth, height);
                }
            }
        }

        const trafficChartItem = new Chart(trafficChart, {
            type: 'bar',
            data: {
                labels: dayValues,
                datasets: [
                    {
                        label: 'Визиты',
                        data: data[0].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#00d0d5',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor: '#060011',

                    },
                    {
                        label: 'Визиты',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#3726f8',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor: '#fff',

                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                categoryPercentage: .85,
                barPercentage: .9,
                plugins: {
                    legend: {
                        display: false,
                    },
                    backgroundBar: {
                        barColor: '#f8f8f8',
                        categoryPercentage: .85,
                        barPercentage: .9,
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
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor;
                                    const monthText = formatDate(tooltipModel.dataPoints[0].label);
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.75);';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; border-radius:5px';
                                    style += '; display:block';
                                    style += `; color:${tooltipModel.dataPoints[0].dataset.customTooltipColor}`;
                                    style += '; text-align:center';
                                    style += `; --background-triangle:${tooltipModel.dataPoints[0].dataset.backgroundColor}`;
                                    const span = '<span style="' + style + '">' + monthText + '<br>' + body + '</span>';
                                    const triangle = '<span class="tooltip-triangle" style="' + 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor + '"></span>';
                                    // innerHtml += '<tr><td>' + date + '</td></tr>';
                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                    innerHtml += '<tr><td>' + triangle + '</td></tr>';
                                    // innerHtml += `<tr><td></td></t`
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
            },
            plugins: [backgroundBar],
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
                        backgroundColor: '#732ba2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        borderSkipped: false,
                        customTooltipColor: '#fff',
                    },
                    {
                        label: 'аналитика вк',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#4eb6e2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        customTooltipColor: '#060011',

                    },
                    {
                        label: 'мониторинг поиска',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#e0d7e8',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        customTooltipColor: '#060011',
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
                                    let style = 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor;
                                    const monthText = formatDate(tooltipModel.dataPoints[0].label);
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    style += '; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.75);';
                                    style += '; padding:5px 10px';
                                    style += '; font-size:14px';
                                    style += '; border-radius:5px';
                                    style += '; display:block';
                                    style += '; text-align:center';
                                    style += `; color:${tooltipModel.dataPoints[0].dataset.customTooltipColor}`;
                                    style += `; --background-triangle:${tooltipModel.dataPoints[0].dataset.backgroundColor}`;
                                    const span = '<span style="' + style + '">' + monthText + '<br>' + body + '</span>';
                                    const triangle = '<span class="tooltip-triangle" style="' + 'background:' + tooltipModel.dataPoints[0].dataset.backgroundColor + '"></span>';
                                    // innerHtml += '<tr><td>' + date + '</td></tr>';
                                    innerHtml += '<tr><td>' + span + '</td></tr>';
                                    innerHtml += '<tr><td>' + triangle + '</td></tr>';
                                    // innerHtml += `<tr><td></td></t`
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