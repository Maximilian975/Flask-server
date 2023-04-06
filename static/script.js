const sendButton = document.querySelector("#send-button");
const dataField = document.querySelector("#data-field");
const typeField = document.querySelector("#type-field");
const idField = document.querySelector("#id-field");

const getButton = document.querySelector("#get-button");
const dataList = document.querySelector("#data-list")

sendButton.addEventListener("click", sendData);
getButton.addEventListener("click", getData);

console.log("hej")
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