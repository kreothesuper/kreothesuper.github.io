function createNumberArray(count, max) {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
}

const initTabs = () => {
    const tabs = [...document.querySelectorAll(".tabs")];

    if (tabs.length > 0) {
        tabs.forEach((tab) => {
            const tabContent = [...tab.querySelectorAll(".tabs__content")];
            const tabLinks = [...tab.querySelectorAll(".tabs__link")];

            const openTab = (tabIndex = 0) => {
                tabContent.forEach((element, i) => {
                    const isActive = i === tabIndex;
                    element.classList.toggle("active", isActive);
                });

                tabLinks.forEach((element, i) => {
                    element.classList.toggle("active", i === tabIndex);
                });
            }

            openTab(0)

            tabLinks.forEach((link, i) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    openTab(i);
                });
            });
        });
    }
}

function generateRandomData() {
    const data = [];

    for (let i = 0; i < 3; i++) {
        const dataSet = [];
        for (let j = 1; j <= 30; j++) {
            const day = j < 10 ? `2024-06-0${j}` : `2024-06-${j}`;
            const count = Math.floor(Math.random() * 100);
            dataSet.push({ day, count });
        }
        data.push(dataSet);
    }

    return data;
}

const date = generateRandomData();


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
                        customTooltipColor:'#060011',
                    },
                    {
                        label: 'Претензии',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#ff9200',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor:'#060011',
                    },
                    {
                        label: 'Чарджи',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#c12910',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor:'#fff',

                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                categoryPercentage: .85,
                barPercentage: .9,
                plugins: {
                    backgroundBar:{
                        barColor:'#f8f8f8',
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
                        customTooltipColor:'#060011',

                    },
                    {
                        label: 'Визиты',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#3726f8',
                        borderRadius: 50,
                        borderSkipped: false,
                        customTooltipColor:'#fff',

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
                    backgroundBar:{
                        barColor:'#f8f8f8',
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
                        customTooltipColor:'#fff',
                    },
                    {
                        label: 'аналитика вк',
                        data: data[1].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#4eb6e2',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        customTooltipColor:'#060011',

                    },
                    {
                        label: 'мониторинг поиска',
                        data: data[2].map(item => item.count),
                        borderWidth: 0,
                        backgroundColor: '#e0d7e8',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                        customTooltipColor:'#060011',
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




// popup

const checkTargetOrKey = event => {
    if (
        event.target.classList.contains('popup__wrapper') ||
        event.key === 'Escape' ||
        event.target.closest('.popup-close')
    ) {
        event.preventDefault();
        hideAllPopups();
    }
};
const showPopup = popupId => {
    const popup = document.querySelector(popupId);
    if (!popup) return

    const pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    hideAllPopups();

    popup.classList.add('popup--active');
    pageWrapper.classList.add('no-scroll');

    if (popupGroup) popupGroup.classList.add('popup-group--active')

    document.addEventListener('click', checkTargetOrKey);
    document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
    const popups = document.querySelectorAll('.popup'),
        pageWrapper = document.querySelector('body'),
        popupGroup = document.querySelector('.popup-group');

    popups.forEach(popup => {
        popup.classList.remove('popup--active');
    });
    pageWrapper.classList.remove('no-scroll');

    if (popupGroup) popupGroup.classList.remove('popup-group--active');


    document.removeEventListener('click', checkTargetOrKey);
    document.removeEventListener('keyup', checkTargetOrKey);
};


document.addEventListener('DOMContentLoaded', () => {

    // toggle block

    const editorBlockArray = document.querySelectorAll('.js-editor');

    if (editorBlockArray.length) {
        editorBlockArray.forEach(editorBlock => {
            const editorLinkArray = editorBlock.querySelectorAll('.js-editor-link');
            const formMessage = editorBlock.querySelector('.form-message');

            editorLinkArray.forEach(editorLink => {
                editorLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    editorBlock.classList.toggle('active');
                });
            });

            editorBlock.addEventListener('submit', (e) => {
                e.preventDefault();

                editorBlock.classList.remove('active');
                if (formMessage) {
                    formMessage.classList.add('form-message--success');
                    setTimeout(() => {
                        formMessage.classList.remove('form-message--success');
                    }, 1000)
                }
            });
        });
    }


    // popup

    const popupButtons = document.querySelectorAll('[data-popup]');
    const popups = document.querySelectorAll('.popup');

    if (popups.length) {
        popupButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const popupId = button.dataset.popup
                showPopup(popupId);

                if (popupId === '.popup-image' && document.querySelector('.popup-image__item')) {
                    document.querySelector('.popup-image__item').src = button.dataset.popupSrc;
                }
            });
        });
    }


    // burger 

    const burger = document.querySelector('.burger');
    const aside = document.querySelector('.aside');

    if (burger && aside) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            burger.classList.toggle('burger--active');
            aside.classList.toggle('aside--active');
        });
    }


    // check input 

    const adminFilterArray = document.querySelectorAll('.admin-filter');

    if (adminFilterArray.length) {
        function isAnyInputFilled(inputs) {
            for (let input of inputs) {
                console.log(input.tagName)
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    return true;
                } else if (input.tagName === 'SELECT' && input.value !== '') {
                    return true;
                } else if (input.tagName === 'INPUT' && input.value.trim() !== '') {
                    return true;
                } else if (input.tagName === 'TEXTAREA' && input.value.trim() !== '') {
                    return true;
                }
            }
            return false;
        }


        adminFilterArray.forEach(adminFilter => {
            const inputs = adminFilter.querySelectorAll('input, select');
            const submit = adminFilter.querySelector("[type='submit']");

            isAnyInputFilled(inputs) ? submit.classList.remove('button--disabled') : submit.classList.add('button--disabled');

            adminFilter.addEventListener('change', () => {
                isAnyInputFilled(inputs) ? submit.classList.remove('button--disabled') : submit.classList.add('button--disabled');
            })


            adminFilter.addEventListener('reset', () => {
                const selectArray = adminFilter.querySelectorAll('select');

                if (selectArray.length) {
                    selectArray.forEach(select => {
                        const event = new Event('reset', { bubbles: true });
                        select.dispatchEvent(event);
                    });
                }
            })
        });
    }



    const tableExpandArray = document.querySelectorAll('.js-table-expanded');

    if (tableExpandArray.length) {
        tableExpandArray.forEach(table => {
            const tableLink = table.querySelector('.js-table-expanded-link');

            tableLink.addEventListener('click', (e) => {
                e.preventDefault();

                table.classList.toggle('active');
            });
        });
    }

    initTabs();


});