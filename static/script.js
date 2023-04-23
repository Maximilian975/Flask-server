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





function getData(event) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        
        response = JSON.parse(xhr.responseText)
        console.log(response)
        dataList.innerHTML = ""
        var myData = [];
        response.forEach( (item,index) => {
            if (item["id"] == 9){
            myData.push({x: item["date"], y: item["value"]})
            }
            // var li = document.createElement("li")
            // li.innerHTML = JSON.stringify(item)
            // dataList.appendChild(li)
        })
        new Chart('ctx', {
            type: 'line',
            data: {
                datasets: [{
                    data: myData
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                          unit: 'day',
                          displayFormats: {
                            day: 'D MMM yyyy'
                          }
                        }
                      }
                }
            }
        });
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





