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

var config = {
	 type: 'line',
        data: {
            datasets: [ 
                {
                    label: "US Dates",
					backgroundColor: "#fff",
					borderWidth: 1,
					pointBorderWidth: 1,
					borderColor: "#f00",
                    data: [{
                        x: "2010-01-01T05:06:07", y: 175
                    }, {
                        x: "2011-01-01T05:06:07", y: 175
                    }, {
                        x: "2012-01-01T05:06:07", y: 178
                    }, {
                        x: "2013-01-01T05:06:07", y: 200
                    }],
                    fill: false,
                    borderColor: 'red'
                },
                {
                    label: "UK Dates",
					borderWidth: 1,
					pointBorderWidth: 0,
					backgroundColor: "#fff",
                    data:  [{
                        x: "2010-01-01T05:06:07", y: 160
                    }, {
                        x: "2011-01-01T05:06:07", y: 175
                    }, {
                        x: "2012-01-01T05:06:07", y: 178
                    }, {
                        x: "2013-01-01T05:06:07", y: 178
                    }],
                    fill: false,
                    borderColor: 'blue'
                }
            ]
        },
        options: {
			  legend: {
				display: true,
				labels: {
				  usePointStyle: true,
				},
				onClick: () => { }, // disable legend onClick functionality that filters datasets
			  },
            responsive: true,
            title: {
                display: true,
                text:    "Chart.js Time Scale"
            },
			elements: {
				point: {
				  radius: 0,
				  hitRadius: 5,
				  hoverRadius: 3,
				},
			},
            scales:     {
                xAxes: [{
                    type: "time",
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll'
                    },
					displayFormats: {
                        year: 'YYYY'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'value'
                    }
                }]
            }
        }
};

var myLineChart = new Chart(lineChart, config);




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





