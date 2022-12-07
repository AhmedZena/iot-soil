let table2 = document.querySelector(".insideContainer2");

let tempTable2 = [];
let humTable2 = [];
let soilTable2 = [];
let timeTable2 = [];

let avgTime2 = 0;
let avgTemp2 = 0;
let avgHum2 = 0;
let avgSoil2 = 0;

//function to check if test changed

for (var i = 0; i < 12; i++) {
  tempTable2.push(table2.rows[i + 1].cells[0]);
  humTable2.push(table2.rows[i + 1].cells[1]);
  soilTable2.push(table2.rows[i + 1].cells[2]);
  timeTable2.push(table2.rows[i + 1].cells[3]);
}

// var prevMunites = 0;
var msg = document.getElementById("message");
msg.hidden = true;

let temp2 = [];
let hum2 = [];
let soil2 = [];
let time2 = [];
let test2 = 0;

//function to check if test changed
function checkTest2() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=VBwtdKYdUC57Mrmv7hEpvXQrv5N49ELd8X2Rx7B8-gG5L1LygvfOYUlFFE1auPS2Cd2g7QiC6qaY1rA1u2BhfoC5M-Q29OT4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEBIOyuHizaqrYFl95kTmwt-C6iVoC8Dx1dsH_vPqjT1ipmXj_wkOKviivXkoZNewMkOJYVopsXrJZtvLEaYiw8T0al5xC6AA&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
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
      var outputData2 = data.map(Object.values);
      //   console.log(outputData2.length);
      //   console.log(outputData);
      //   console.log(outputData[0][0]);
      //   test = outputData[0][0];
      if (data[0] == undefined) {
        console.log("Trial 2 is not started yet");
      } else {
        // console.log(test2);
        if (test2 != outputData2[0][0]) {
          test2 = outputData2[0][0];
          getData2();
          putData2();
        }
      }
    });
}
checkTest2();

function getData2() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=1fPNeSXOIG-Ispc4wkJR6_U_coLQ5AI4V8Wi5q30i62EWhJiHf083EH6vKhi3AG1laPlqmoZFH1sBcxW3We9NFdkQB0SII0Km5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEBIOyuHizaqrYFl95kTmwt-C6iVoC8Dx1dsH_vPqjT1ipmXj_wkOKviivXkoZNewMkOJYVopsXrJZtvLEaYiw8T0al5xC6AA&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
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
      if (data.length > 12 && data.length < 24) {
        var outputData2 = data.map(Object.values);
        outputData2 = outputData2.slice(12);
        outputData2.reverse();
        // console.log(outputData2);
      } else if (data.length > 24) {
        var outputData2 = data.map(Object.values);
        outputData2 = outputData2.slice(12, 24);
        outputData2.reverse();
        // console.log(outputData2);
      } else {
        console.log("Trial 2 is not started yet");
      }

      //   reset temp2  and hum2 and soil2 and time2

      temp2 = [];
      hum2 = [];
      soil2 = [];
      time2 = [];

      // for (var i = 0; i < outputData2.length; i++) {
      for (i = outputData2.length - 1; i >= 0; i--) {
        temp2.push(outputData2[i][1]);
        // console.log(temp2);
        hum2.push(outputData2[i][2]);
        soil2.push(outputData2[i][3]);
        time2.push(outputData2[i][4]);
      }
      //   console.log(temp2);
      //   change time format to hh:mm:ss dd/mm/yyyy format 12hr
      for (var i = 0; i < time2.length; i++) {
        var date = new Date(time2[i]);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time2[i] = hours + ":" + minutes + ":" + seconds + " " + ampm;
      }
      putData2();
      calculateAvg2();
      allCharts2();
      averageChart2();
      //   console.log(time2);
    });
}
// getData();
// function to put data in table
function putData2() {
  //   console.log(temp2.length);
  if (temp2.length == 0) {
    for (var i = 0; i < 12; i++) {
      tempTable2[i].innerHTML = "0";
      humTable2[i].innerHTML = "0";
      soilTable2[i].innerHTML = "0";
      timeTable2[i].innerHTML = "0";
    }
  } else {
    for (var i = 0; i < temp2.length; i++) {
      //   for (var i = temp2.length - 1; i >= 0; i--) {
      tempTable2[i].innerHTML = temp2[i];
      humTable2[i].innerHTML = hum2[i];
      soilTable2[i].innerHTML = soil2[i];
      timeTable2[i].innerHTML = time2[i];
    }
  }
}

// function to calculate average
function calculateAvg2() {
  var sumTemp2 = 0;
  var sumHum2 = 0;
  var sumSoil2 = 0;
  for (var i = 0; i < temp2.length; i++) {
    sumTemp2 += parseInt(temp2[i]);
    sumHum2 += parseInt(hum2[i]);
    sumSoil2 += parseInt(soil2[i]);
  }

  avgTemp2 = sumTemp2 / temp2.length;
  avgHum2 = sumHum2 / hum2.length;
  avgSoil2 = sumSoil2 / soil2.length;
}

// make temp2 show after 1 min
setInterval(() => {
  //   getData();
  checkTest2();
  //   putData2();
  //   calculateAvg2();
  //   allCharts2();
  //   averageChart2();

  //   console.log(temp2);
}, 2000);

// make function for all charts

async function allCharts2() {
  var chart1 = new Chart("tempChart2", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //   labels: time,
      datasets: [
        {
          data: temp2,
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

  var chart2 = new Chart("humChart2", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          data: hum2,
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
  var chart3 = new Chart("soilChart2", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          data: soil2,
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
function averageChart2() {
  var chart = new Chart("averageChart2", {
    type: "bar",
    data: {
      labels: ["Temperature", "Humidity", "Soil"],
      datasets: [
        {
          // label: "Average Values",
          data: [avgTemp2, avgHum2, avgSoil2],
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
