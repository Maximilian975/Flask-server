const sendButton = document.querySelector("#send-button");
const dataField = document.querySelector("#data-field");
const typeField = document.querySelector("#type-field");
const idField = document.querySelector("#id-field");

const getButton = document.querySelector("#get-button");
const dataList = document.querySelector("#data-list")

sendButton.addEventListener("click", sendData);
getButton.addEventListener("click", getData);

const myChart = new Chart("myChart", {
    type: "line",
    data: {},
    options: {}
});

const xyValues = [
{x:50, y:7},
{x:60, y:8},
{x:70, y:8},
{x:80, y:9},
{x:90, y:9},
{x:100, y:9},
{x:110, y:10},
{x:120, y:11},
{x:130, y:14},
{x:140, y:14},
{x:150, y:15}
];

new Chart("data chart", {
    type: "line",
    data: {
        datasets: [{
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
          data: xyValues
        }]
      }
});




function getData(event) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        
        response = JSON.parse(xhr.responseText)
        console.log(response)
        dataList.innerHTML = ""
        response.forEach( (item,index) => {
            var li = document.createElement("li")
            li.innerHTML = JSON.stringify(item)
            dataList.appendChild(li)
        })
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





