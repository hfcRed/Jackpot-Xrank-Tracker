import Chart from 'chart.js/auto';

const leafi = {
    name: 'Leafi',
    color: '#FF315D',
    stats: [
        { week: 1, power: 3400 },
        { week: 2, power: 3200 },
        { week: 3, power: 2900 },
        { week: 4, power: 3100 },
        { week: 5, power: 3700 },
    ]
};

const madness = {
    name: 'Madness',
    color: '#FF31FD',
    stats: [
        { week: 1, power: 2800 },
        { week: 2, power: 3100 },
        { week: 3, power: 3400 },
        { week: 4, power: 3000 },
        { week: 5, power: 3200 }
    ]
};

const q = {
    name: '.q',
    color: '#8831FF',
    stats: [
        { week: 1, power: 3200 },
        { week: 2, power: 3300 },
        { week: 3, power: 3100 },
        { week: 4, power: 2900 },
        { week: 5, power: 3000 }
    ]
};

const jared = {
    name: 'Jared',
    color: '#316BFF',
    stats: [
        { week: 1, power: 3000 },
        { week: 2, power: 3100 },
        { week: 3, power: 2900 },
        { week: 4, power: 3200 },
        { week: 5, power: 3000 }
    ]
};

const data = [leafi, madness, q, jared];


new Chart(
    document.getElementById('chart'),
    {
        type: 'line',
        data: {
            labels: data[0].stats.map(player => player.week),
            datasets: data.map((player) => ({
                label: player.name,
                data: player.stats.map(item => item.power),
                borderColor: player.color,
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#161821',
                    titleAlign: 'center',
                    padding: 10,
                    caretPadding: 15,
                    caretSize: 10,
                    usePointStyle: true,
                    borderColor: '#393C4C',
                    borderWidth: 1,
                    itemSort: (a, b) => b.parsed.y - a.parsed.y,
                },
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        useBorderRadius: true,
                        fillStyle: 'black',
                    }
                }
            },
            elements: {
                point: {
                    pointStyle: 'rectRounded',
                    backgroundColor: '#1C1E2B',
                    borderWidth: 2,
                    radius: 4,
                },
                line: {
                    tension: 0.3,
                    borderWidth: 2,
                    fill: false,
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                }
            }
        },
    }
);