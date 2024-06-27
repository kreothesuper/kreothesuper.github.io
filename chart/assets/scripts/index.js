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


// оплаты 2й чарт
const renderIncomeChartSecond = (data, labelArray) => {
    const incomeChartSecond = document.getElementById('incomechart-second');
    if (incomeChartSecond) {
        new Chart(incomeChartSecond, {
            type: 'line',
            interaction: {
                mode: 'index',
            },
            responsive: true,
            data: {
                labels: labelArray,
                datasets: [
                    {
                        label: '',
                        data: data[0],
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
                        data: data[1],
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
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }

}

renderIncomeChartSecond([createNumberArray(6, 100), createNumberArray(6, 100)], ['СЕН', 'ОКТ', 'НОЯ', 'ДЕК', 'ЯНВ', 'ФЕВ'])
// оплаты
const renderIncomeChart = (data, labelArray) => {
    const incomeChart = document.getElementById('incomechart');
    if (incomeChart) {
        new Chart(incomeChart, {
            type: 'line',
            interaction: {
                mode: 'index',
            },
            data: {
                labels: labelArray,
                datasets: [
                    {
                        label: '',
                        data: data[0],
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
                        data: data[1],
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
renderIncomeChart([createNumberArray(6, 100), createNumberArray(6, 100)], ['СЕН', 'ОКТ', 'НОЯ', 'ДЕК', 'ЯНВ', 'ФЕВ'])
// Операции
const renderOperationChart = (data) => {
    const operationchart = document.getElementById('operationchart');
    const currentMonth = new Date().toLocaleDateString("ru", { month: "short" });
    new Chart(operationchart, {
        type: 'bar',
        data: {
            labels: [...Array(data[0].length).keys()].map(i => i + 1),
            datasets: [
                {
                    label: 'Возвраты',
                    data: data[0],
                    borderWidth: 0,
                    backgroundColor: '#FAFF18',
                    borderRadius: 50,
     
                },
                {
                    label: 'Претензии',
                    data: data[1],
                    borderWidth: 0,
                    backgroundColor: '#FFCC18',
                    borderRadius: 50,
                    
                },
                {
                    label: 'Чарджи',
                    data: data[2],
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
                            return `${context[0].label} ${currentMonth.substring(0, 3)}.`

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

renderOperationChart([createNumberArray(31, 100), createNumberArray(31, 100), createNumberArray(31, 100)])

// Трафик
const renderTrafficChart = (data) => {
    const trafficChart = document.getElementById('trafficchart');
    if (trafficChart) {
        const currentMonth = new Date().toLocaleDateString("ru", { month: "short" });
        const trafficChartItem = new Chart(trafficChart, {
            type: 'bar',
            data: {
                labels: [...Array(data[0].length).keys()].map(i => i + 1),
                datasets: [
                    {
                        label: '',
                        data: data[0],
                        borderWidth: 0,
                        backgroundColor: '#18FFFF',
                        borderRadius: 50,
                    
                    },
                    {
                        label: '',
                        data: data[1],
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
                                return `${context[0].label} ${currentMonth.substring(0, 3)}.`
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

renderTrafficChart([createNumberArray(31, 100),createNumberArray(31, 100)])


// Активность разделов
const renderActivityChart = (data) => {
    const activityChart = document.getElementById('activityChart');
    if (activityChart) {
        const currentMonth = new Date().toLocaleDateString("ru", { month: "short" });
        new Chart(activityChart, {
            type: 'bar',

            data: {
                labels: [...Array(data[0].length).keys()].map(i => i + 1),
                datasets: [
                    {
                        label: 'умный поиск',
                        data: data[0],
                        borderWidth: 0,
                        backgroundColor: '#7B20A6',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                    },
                    {
                        label: 'аналитика вк',
                        data: data[1],
                        borderWidth: 0,
                        backgroundColor: '#28B8E5',
                        borderRadius: 50,
                        categoryPercentage: 1,
                        barPercentage: .3,
                    },
                    {
                        label: 'мониторинг поиска',
                        data: data[2],
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
                                return `${context[0].label} ${currentMonth.substring(0, 3)}.`

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
                        }
                    },
                    x: {
                        beginAtZero: true,
                        barPercentage: 1,
                        stacked: true,
                        categoryPercentage: 1,
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
renderActivityChart([createNumberArray(31, 100), createNumberArray(31, 100), createNumberArray(31, 100)]);



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

                if(popupId === '.popup-image' && document.querySelector('.popup-image__item')){
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