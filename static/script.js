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

const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
          backgroundColor:"rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]}
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





