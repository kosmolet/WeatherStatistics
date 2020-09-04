
let weather = [];
let results = document.getElementById('results');

// function bubbleSort(a, par) {
//     var swapped;
//     do {
//         swapped = false;
//         for (var i = 0; i < a.length - 1; i++) {
//             if (a[i].par > a[i + 1].par) {
//                 var temp = a[i];

//                 a[i] = a[i + 1];
//                 a[i + 1] = temp;

//                 swapped = true;
//             }
//         }
//     } while (swapped);
// }

//from lesson 04-09
// function sort(weather, sortBy = "temperature") {
//     var length = weather.length;
//     for (var i = 0; i < length; i++) {
//       for (var j = 0; j < length - 1 - i; j++) {
//         if (weather[j][sortBy] > weather[j + 1][sortBy]) {
//           const holder = weather[j];
//           weather[j] = weather[j + 1];
//           weather[j + 1] = holder;
//         }
//       }
//     }

//     return weather;
//   }

function drawTable() {
    let WeatherByDate = weather.sort(function (a, b) { return new Date(a.date) - new Date(b.date) });
    let table = document.querySelector('table');
    let tableRows = "";
    WeatherByDate.forEach(wth => {
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

function isDateInWeatherArray(dateString) {
    let found = false;
    for (var i = 0; i < weather.length; i++) {
        if (weather[i].date == dateString) {
            found = true;
            break;
        }
    }
    return found;
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
    else if (isDateInWeatherArray(date)) {
        alert("Please select another Date. The temprature for the selected Date has been already added");
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
    start = new Date(2020, 1, 1)
    end = new Date(2020, 12, 30)
    while (rowsAmount > 0) {
        let randomTemperature = -40 + Math.floor(Math.random() * 101);
        let randomDate = ((new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).toJSON()).slice(0, 10);
        if (!isDateInWeatherArray(randomDate)) {
            let weatherItem = {
                temperature: randomTemperature,
                date: randomDate
            }
            weather.push(weatherItem);
            rowsAmount--;
        }
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
    //let sortedWeatherByTemp = weather.sort(function (a, b) { return a.temperature - b.temperature });
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < weather.length - 1; i++) {
            if (weather[i].temperature > weather[i + 1].temperature) {
                var temp = weather[i];
                weather[i] = weather[i + 1];
                weather[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    //let maxTempo = sortedWeatherByTemp[sortedWeatherByTemp.length - 1].temperature;
    let maxTempo = weather[weather.length - 1].temperature;
    addResults("max", maxTempo);


}

const getMin = (ev) => {
    ev.preventDefault();
    if (weather.length == 0) {
        alert("Please add the temperature/date records first!");
        return;
    }
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < weather.length - 1; i++) {
            if (weather[i].temperature > weather[i + 1].temperature) {
                var temp = weather[i];
                weather[i] = weather[i + 1];
                weather[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    let minTempo = weather[0].temperature;
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

function drawChartLesson3API() {
    fetch('https://my-json-server.typicode.com/dimitrisfasoulas/jsonServerWeather/temperature')
        .then(response => response.json())
        .then(data => createChart(data));

    const createChart = data => {
        var ctx = document.getElementById('lesson3APIChart');

        const labels = [];

        for (i = 1; i <= data.greece.length; i++) {
            labels.push(`Day" ${i}`);
        }
        console.log(labels);

        const totals = { greece: 0, sweden: 0 };
        for (i = 0; i < data.greece.length; i++) {
            totals.greece += data.greece[i];
            totals.sweden += data.sweden[i];
        }
        console.log(totals);

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,

                datasets: [
                    {
                        label: "Temperature in Greece",
                        borderColor: 'Darkblue',
                        data: data.greece,
                        fill: false,
                        lineTension: 0

                    },
                    {
                        label: "Temperature in Sweden",
                        borderColor: 'Gold',
                        data: data.sweden,
                        fill: false,
                        lineTension: 0

                    },
                    {
                        label: "Temperature in Greece",
                        borderColor: 'blue',
                        data: Array(data.greece.length).fill(totals.greece / data.greece.length),
                        fill: false,
                        pointRadius: 0

                    },
                    {
                        label: "Temperature in Sweden",
                        borderColor: 'Yellow',
                        data: Array(data.sweden.length).fill(totals.sweden / data.sweden.length),
                        fill: false,
                        pointRadius: 0

                    }]
            },
            options: {}
        });
    }
}
drawChartLesson3API()

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add").addEventListener('click', addWeatherStatistic);
    document.getElementById("seed").addEventListener('click', generateWeatherStatistic);
    document.getElementById("average").addEventListener('click', getAverage);
    document.getElementById("maxTemp").addEventListener('click', getMax);
    document.getElementById("minTemp").addEventListener('click', getMin);

});
