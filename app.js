
let weather = [];
let results = document.getElementById('results');

function drawTable() {
    let table = document.querySelector('table');

    let tableRows = "";
    weather.forEach(wth => {
        tableRows += `<tr><td>${wth.temperature}</td><td>${wth.date}</td></tr>`
    })
    table.innerHTML = tableRows;

    let row = table.createTHead().insertRow(0);
    row.insertCell(0).innerHTML = 'Temperature';
    row.insertCell(1).innerHTML = 'Date';

    drawChart();
}

function drawChart() {
    let sortedWeatherByDate = weather.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
    let xAxisArray = sortedWeatherByDate.map(x => x.date);
    let yAxisArray = sortedWeatherByDate.map(y => y.temperature);
    let ctx = document.getElementById('weatherTableChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxisArray,
            datasets: [{
                label: 'Weather Statistic',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxisArray
            }]
        },
        options: {}
    });
}

const addWeatherStatistic = (ev) => {
    ev.preventDefault();
    hideResults();
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
    hideResults();
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


const addResults = (type, calc) => {
    let para = document.createElement("p");
    para.appendChild(document.createTextNode(`The ${type} temperature is ${calc}`));
    results.appendChild(para);
    para.classList.add("pResults");
}

const hideResults = () => {
    let p_list = document.getElementsByClassName("pResults");
    for (let i = p_list.length - 1; i >= 0; i--) {
        let p = p_list[i];
        p.parentNode.removeChild(p);
    }
}

const getMax = (ev) => {
    ev.preventDefault();
    if (weather.length == 0) {
        alert("Please add the temperature/date records first!");
        return;
    }
    let sortedWeatherByTemp = weather.sort(function (a, b) { return a.temperature - b.temperature });
    let maxTempo = sortedWeatherByTemp[sortedWeatherByTemp.length - 1].temperature;
    addResults("max", maxTempo);


}

const getMin = (ev) => {
    ev.preventDefault();
    if (weather.length == 0) {
        alert("Please add the temperature/date records first!");
        return;
    }
    let sortedWeatherByTemp = weather.sort(function (a, b) { return a.temperature - b.temperature });
    let minTempo = sortedWeatherByTemp[0].temperature;
    addResults("min", minTempo);
}

const getAverage = (ev) => {
    ev.preventDefault();
    if (weather.length == 0) {
        alert("Please add the temperature/date records first!");
        return;
    }
    let total = 0;
    weather.forEach(item => total += (Number(item.temperature)));
    let averageTempo = Math.round(total / (weather.length));
    addResults("average", averageTempo);
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add").addEventListener('click', addWeatherStatistic);
    document.getElementById("seed").addEventListener('click', generateWeatherStatistic);
    document.getElementById("average").addEventListener('click', getAverage);
    document.getElementById("maxTemp").addEventListener('click', getMax);
    document.getElementById("minTemp").addEventListener('click', getMin);

});
