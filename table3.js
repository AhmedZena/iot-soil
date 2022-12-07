let table3 = document.querySelector(".insideContainer3");

let tempTable3 = [];
let humTable3 = [];
let soilTable3 = [];
let timeTable3 = [];

let avgTime3 = 0;
let avgTemp3 = 0;
let avgHum3 = 0;
let avgSoil3 = 0;

//function to check if test changed

for (var i = 0; i < 12; i++) {
  tempTable3.push(table3.rows[i + 1].cells[0]);
  humTable3.push(table3.rows[i + 1].cells[1]);
  soilTable3.push(table3.rows[i + 1].cells[2]);
  timeTable3.push(table3.rows[i + 1].cells[3]);
}

// var prevMunites = 0;
var msg = document.getElementById("message");
msg.hidden = true;

let temp3 = [];
let hum3 = [];
let soil3 = [];
let time3 = [];
let test3 = 0;

//function to check if test changed
function checkTest3() {
  fetch(
    "https://script.google.com/macros/s/AKfycbzTuIkGw7lhN6brflf1tk4CEEquW-LzZ48t5BQ_3tauxNvNTAhow7Kiw6vumIaCbjoz/exec"
  )
    .then((result) => {
      var data = result.json();
      return data;
    })
    .then((obj) => {
      //   obj.length = 24;

      return obj;
    })
    .then((data) => {
      //convert array of objects data to array of arrays
      var outputData3 = data.map(Object.values);
      console.log(outputData3.length);
      //   console.log(outputData);
      //   console.log(outputData[0][0]);
      //   test = outputData[0][0];
      if (data.length < 24) {
        console.log("Trial 3 is not started yet");
      } else {
        console.log(test3);
        if (test3 != outputData3[0][0]) {
          test3 = outputData3[0][0];
          getData3();
          putData3();
        }
      }
    });
}
checkTest3();

function getData3() {
  fetch(
    "https://script.google.com/macros/s/AKfycbzTuIkGw7lhN6brflf1tk4CEEquW-LzZ48t5BQ_3tauxNvNTAhow7Kiw6vumIaCbjoz/exec"
  )
    .then((result) => {
      var data = result.json();
      //   console.log(data);
      return data;
      //   console.log(data);
    })
    .then((obj) => {
      //   obj.length = 24;

      return obj;
    })
    .then((data) => {
      console.log(data);

      //   convert array of objects data to array of arrays
      var outputData3 = data.map(Object.values);

      if (outputData3.length < 24) {
        console.log("Trial 3 is not started yet");
      } else {
        outputData3 = outputData3.slice(24);
        console.log(outputData3);
        outputData3.reverse();
        console.log(outputData3);

        //   reset temp3  and hum3 and soil3 and time
        temp3 = [];
        hum3 = [];
        soil3 = [];
        time3 = [];

        // for (var i = 0; i < outputData3.length; i++) {
        for (i = outputData3.length - 1; i >= 0; i--) {
          temp3.push(outputData3[i][1]);
          // console.log(temp3);
          hum3.push(outputData3[i][2]);
          soil3.push(outputData3[i][3]);
          time3.push(outputData3[i][4]);
        }
        console.log(temp3);
        //   change time format to hh:mm:ss dd/mm/yyyy format 12hr
        for (var i = 0; i < time3.length; i++) {
          var date = new Date(time3[i]);
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          var ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          time3[i] = hours + ":" + minutes + ":" + seconds + " " + ampm;
        }
        putData3();
        calculateAvg3();
        allCharts3();
        averageChart3();
        // console.log(time3);
      }
    });
}
// getData();
// function to put data in table
function putData3() {
  //   console.log(temp3.length);
  console.log(soil3);
  if (temp3.length == 0) {
    for (var i = 0; i < 12; i++) {
      tempTable3[i].innerHTML = "0";
      humTable3[i].innerHTML = "0";
      soilTable3[i].innerHTML = "0";
      timeTable3[i].innerHTML = "0";
    }
  } else {
    for (var i = 0; i < temp3.length; i++) {
      //   for (var i = temp3.length - 1; i >= 0; i--) {
      tempTable3[i].innerHTML = temp3[i];
      humTable3[i].innerHTML = hum3[i];
      soilTable3[i].innerHTML = soil3[i];
      timeTable3[i].innerHTML = time3[i];
    }
  }
}

// function to calculate average
function calculateAvg3() {
  var sumtemp3 = 0;
  var sumhum3 = 0;
  var sumsoil3 = 0;
  for (var i = 0; i < temp3.length; i++) {
    sumtemp3 += parseInt(temp3[i]);
    sumhum3 += parseInt(hum3[i]);
    sumsoil3 += parseInt(soil3[i]);
  }

  avgTemp3 = sumtemp3 / temp3.length;
  avgHum3 = sumhum3 / hum3.length;
  avgSoil3 = sumsoil3 / soil3.length;
}

// make temp3 show after 1 min
setInterval(() => {
  //   getData();
  checkTest3();
  //   putData3();
  //   calculateAvg3();
  //   allCharts3();
  //   averageChart3();

  //   console.log(temp3);
}, 2000);

// make function for all charts

async function allCharts3() {
  var chart1 = new Chart("tempChart3", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //   labels: time,
      datasets: [
        {
          data: temp3,
          //   put time of each data in label
          label: "Temp",

          borderColor: "#cc0f0f",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Num.of.Readings",
        position: "bottom",
      },

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Temp: °C",
            },
          },
        ],
      },
    },
  });

  var chart2 = new Chart("humChart3", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          data: hum3,
          borderColor: "#153cb2",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Num.of.Readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Hum",
            },
          },
        ],
      },
    },
  });
  var chart3 = new Chart("soilChart3", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          data: soil3,
          borderColor: "#a56403",
          fill: false,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Num.of.Readings",
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Soil %",
            },
          },
        ],
      },
    },
  });
}

// function for average chart
function averageChart3() {
  var chart = new Chart("averageChart3", {
    type: "bar",
    data: {
      labels: ["Temperature", "Humidity", "Soil"],
      datasets: [
        {
          // label: "Average Values",
          data: [avgTemp3, avgHum3, avgSoil3],
          backgroundColor: ["#cc0f0f", "#153cb2", "#a56403"],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Avg",
            },
          },
        ],
      },
      legend: { display: false },
      title: {
        display: true,
        text: "Parameters",
        position: "bottom",
      },
    },
  });
}
