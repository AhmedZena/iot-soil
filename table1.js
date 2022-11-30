let table1 = document.querySelector(".insideContainer1");

let tempTable1 = [];
let humTable1 = [];
let soilTable1 = [];
let timeTable1 = [];

let avgTemp1 = 0;
let avgHum1 = 0;
let avgSoil1 = 0;
let avgTime1 = 0;

//function to check if test changed

for (var i = 0; i < 12; i++) {
  tempTable1.push(table1.rows[i + 1].cells[0]);
  humTable1.push(table1.rows[i + 1].cells[1]);
  soilTable1.push(table1.rows[i + 1].cells[2]);
  timeTable1.push(table1.rows[i + 1].cells[3]);
}

// var prevMunites = 0;
var msg = document.getElementById("message");
msg.hidden = true;

let temp1 = [];
let hum1 = [];
let soil1 = [];
let time1 = [];
let test1 = 0;

//function to check if test changed
function checkTest1() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=VBwtdKYdUC57Mrmv7hEpvXQrv5N49ELd8X2Rx7B8-gG5L1LygvfOYUlFFE1auPS2Cd2g7QiC6qaY1rA1u2BhfoC5M-Q29OT4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEBIOyuHizaqrYFl95kTmwt-C6iVoC8Dx1dsH_vPqjT1ipmXj_wkOKviivXkoZNewMkOJYVopsXrJZtvLEaYiw8T0al5xC6AA&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
  )
    .then((result) => {
      var data = result.json();
      return data;
    })
    .then((obj) => {
      //   obj.length = 12;

      return obj;
    })
    .then((data) => {
      // if data[0] is undefined then show message
      if (data[0] == undefined) {
        console.log("there is no data yetk !");
      } else {
        //convert array of objects data to array of arrays
        var outputData1 = data.map(Object.values);
        outputData1.reverse();
        outputData1.length = 12;
        // console.log(test1);
        // console.log(outputData1[0][0]);
        if (test1 != outputData1[0][0]) {
          test1 = outputData1[0][0];
          getData1();
          putData1();
        }
      }
    });
}
// checkTest1();

function getData1() {
  fetch(
    "https://script.googleusercontent.com/macros/echo?user_content_key=GCPgv-iMOv_FMylzmysiLre5S7UfW00vGWQO74dqZ1YEaxz5jUFE23zuyLUpIB3eIGE6qw9bfVJBiJw96OpJNaCzYNrb9mMqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEqLSDOJTamM6PRRAM545fdISKH722OvpUvmeQnVJTDEEIp2nCWKtVBzuNpgscHP-a2r9QfGgRHMOtFHK9gD6pOoLSxKvstFaw&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
  )
    .then((result) => {
      var data = result.json();
      //   console.log(data);
      return data;
      //   console.log(data);
    })
    .then((obj) => {
      //   obj.length = 12;
      if (obj.length > 12) {
        obj.length = 12;
      }
      return obj;
    })
    .then((data) => {
      //convert array of objects data to array of arrays
      var outputData1 = data.map(Object.values);
      //   console.log(outputData1);
      // reset all temp1 and hum1 and soil1 and time1
      //   temp1 = [];
      //   hum1 = [];
      //   soil1 = [];
      //   time1 = [];
      for (var i = 0; i < outputData1.length; i++) {
        temp1.push(outputData1[i][1]);
        hum1.push(outputData1[i][2]);
        soil1.push(outputData1[i][3]);
        time1.push(outputData1[i][4]);
        // console.log(time1);
      }
      //   change time format to hh:mm:ss dd/mm/yyyy format 12hr
      for (var i = 0; i < time1.length; i++) {
        var date = new Date(time1[i]);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time1[i] = hours + ":" + minutes + ":" + seconds + " " + ampm;
      }
      //   console.log(time1);
    });
}
// getData();
// function to put data in table
function putData1() {
  for (var i = 0; i < temp1.length; i++) {
    //   for (var i = temp1.length - 1; i >= 0; i--) {
    tempTable1[i].innerHTML = temp1[i];
    humTable1[i].innerHTML = hum1[i];
    soilTable1[i].innerHTML = soil1[i];
    timeTable1[i].innerHTML = time1[i];
  }
}

// function to calculate average
function calculateAvg1() {
  var sumTemp1 = 0;
  var sumHum1 = 0;
  var sumSoil1 = 0;
  var sumTime1 = 0;
  for (var i = 0; i < temp1.length; i++) {
    sumTemp1 += temp1[i];
    sumHum1 += hum1[i];
    sumSoil1 += soil1[i];
  }
  avgTemp1 = sumTemp1 / temp1.length;
  avgHum1 = sumHum1 / hum1.length;
  avgSoil1 = sumSoil1 / soil1.length;
}

// make temp1 show after 1 min
setInterval(() => {
  //   getData();
  checkTest1();
  putData1();
  calculateAvg1();
  allCharts1();
  averageChart1();

  //   console.log(temp1);
}, 5000);

// make function for all charts

async function allCharts1() {
  var chart1 = new Chart("tempChart1", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //   labels: time,
      datasets: [
        {
          data: temp1,

          //   data: temp1,
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

  var chart2 = new Chart("humChart1", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          data: hum1,
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
  var chart3 = new Chart("soilChart1", {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          // reversedSoil1 = soil1.reverse(),
          data: soil1,
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
function averageChart1() {
  var chart = new Chart("averageChart1", {
    type: "bar",
    data: {
      labels: ["Temperature", "Humidity", "Soil"],
      datasets: [
        {
          // label: "Average Values",
          data: [avgTemp1, avgHum1, avgSoil1],
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
