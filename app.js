
let headers = ['Temperature', 'Date'];
let weather = [];

function drawTable() {
    let table = document.querySelector('table');

    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    weather.forEach(wth => {
        let row = document.createElement('tr');
        Object.values(wth).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })

        table.appendChild(row);
    })
    drawChart();
}


function drawChart() {
    let xAxisArray = weather.map(x => x.date);
    let yAxisArray = weather.map(y => y.temperature);
    var ctx = document.getElementById('weatherTableChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xAxisArray.sort(), //['2020-09-01', '2020-09-07', '2020-09-14', '2020-09-21', '2020-09-31'],
            datasets: [{
                label: 'Weather Statistic',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxisArray//[0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
}

const addWeatherStatistic = (ev) => {
    ev.preventDefault();
    let temperature = document.getElementById("temperature").value;
    let date = document.getElementById("date").value;
    if (!temperature || !date) {
        alert("Please fill out all fields");
        return;
    }
    let weatherItem = {
        temperature: document.getElementById("temperature").value,
        date: document.getElementById("date").value
    }
    weather.push(weatherItem);
    document.querySelector('form').reset();
    drawTable();

}

const generateWeatherStatistic = (ev) => {
    ev.preventDefault();
    rowsAmount = 10
    while (rowsAmount > 0) {
        let randomTemperature = Math.floor(Math.random() * 101);
        let randomDate = ((new Date(+(new Date(2020, 09, 01)) + Math.random() * ((new Date(2020, 09, 20)) - (new Date(2020, 09, 01)))).toJSON()).slice(0, 10));
        let weatherItem = {
            temperature: randomTemperature,
            date: randomDate
        }
        weather.push(weatherItem);
        rowsAmount--;

    }
    drawTable();

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add").addEventListener('click', addWeatherStatistic);

});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("seed").addEventListener('click', generateWeatherStatistic);

});








