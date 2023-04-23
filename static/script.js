const sendButton = document.querySelector("#send-button");
const dataField = document.querySelector("#data-field");
const typeField = document.querySelector("#type-field");
const idField = document.querySelector("#id-field");
var ctx = document.getElementById("ctx").getContext("2d");

const getButton = document.querySelector("#get-button");
const dataList = document.querySelector("#data-list")

sendButton.addEventListener("click", sendData);
getButton.addEventListener("click", getData);

var timeFormat = 'moment.ISO_8601';
var lineChart = document.getElementById('ctx').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [{
                x: '2021-11-06 23:39:30',
                y: 50
            }, {
                x: '2021-11-07 01:00:28',
                y: 60
            }, {
                x: '2021-11-07 09:00:28',
                y: 20
            }]
        }],
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }
});



function getData(event) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        
        response = JSON.parse(xhr.responseText)
        console.log(response)
        dataList.innerHTML = ""
        var values = [];
        var dates = [];
        response.forEach( (item,index) => {
            values.push(item["value"]);
            dates.push(item["date"]);
            
            // var li = document.createElement("li")
            // li.innerHTML = JSON.stringify(item)
            // dataList.appendChild(li)
        })
        console.log(values);
        console.log(dates)
    }
    xhr.open("GET", "/get_data");
    xhr.send();
}

function sendData(event) {
    var id = idField.value;
    var type = typeField.value;
    var value = dataField.value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/send_data");
    xhr.onload = () => {
        getData()
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const jsonmsg = `{"sensorID": ${id}, "sensorType": ${type}, "value": ${value}}`
    xhr.send(JSON.stringify(jsonmsg));
}





