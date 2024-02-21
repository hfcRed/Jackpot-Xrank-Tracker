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

const ren = {
    name: 'Ren',
    color: '#6AF9F2',
    stats: [
        { week: 1, power: 3300 },
        { week: 2, power: 3400 },
        { week: 3, power: 3200 },
        { week: 4, power: 3500 },
        { week: 5, power: 3400 }
    ]
};

const data = [leafi, madness, q, jared, ren];


new Chart(
    document.getElementById('chart'),
    {
        type: 'line',
        data: {
            labels: data[0].stats.map(player => player.week),
            datasets: data.map((player) => ({
                label: player.name,
                data: player.stats.map(item => item.power),
                fill: false,
                backgroundColor: "#FFFFFF",
                borderColor: player.color,
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Power Levels'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    itemSort: (a, b) => b.parsed.y - a.parsed.y,
                },
            },
            lineTension: 0.25,
        },
    }
);