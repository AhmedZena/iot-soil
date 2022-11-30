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
    "https://script.googleusercontent.com/macros/echo?user_content_key=VBwtdKYdUC57Mrmv7hEpvXQrv5N49ELd8X2Rx7B8-gG5L1LygvfOYUlFFE1auPS2Cd2g7QiC6qaY1rA1u2BhfoC5M-Q29OT4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEBIOyuHizaqrYFl95kTmwt-C6iVoC8Dx1dsH_vPqjT1ipmXj_wkOKviivXkoZNewMkOJYVopsXrJZtvLEaYiw8T0al5xC6AA&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
  )
    .then((result) => {
      var data = result.json();
      return data;
    })
    .then((obj) => {
      obj.length = 36;

      return obj;
    })
    .then((data) => {
      //convert array of objects data to array of arrays
      var outputData3 = data.map(Object.values);

      // reset all temp3 and hum3 and soil3 and time3 arrays

      temp3 = [];
      hum3 = [];
      soil3 = [];
      time3 = [];

      if (data[0] == undefined) {
        console.log("Trial 3 not started");
      } else {
        console.log(test2);
        if (test2 != outputData3[0][0]) {
          test2 = outputData3[0][0];
          getData3();
          putData3();
        }
      }
    });
}
checkTest3();

function getData3() {
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
      obj.length = 36;

      return obj;
    })
    .then((data) => {
      //convert array of objects data to array of arrays
      var outputData3 = data.map(Object.values);

      console.log(outputData3);

      for (var i = 24; i < outputData3.length; i++) {
        temp3.push(outputData3[i][1]);
        hum2.push(outputData3[i][2]);
        soil2.push(outputData3[i][3]);
        time2.push(outputData3[i][4]);
      }

      //   change time format to hh:mm:ss dd/mm/yyyy format 12hr
      for (var i = 0; i < time2.length; i++) {
        var date = new Date(time2[i]);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time2[i] =
          hours +
          ":" +
          minutes +
          ":" +
          seconds +
          " " +
          ampm +
          " " +
          day +
          "/" +
          month +
          "/" +
          year;
      }
      console.log(time2);
    });
}
// getData();
// function to put data in table
function putData3() {
  console.log(temp3.length);
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
      tempTable3[i].innerHTML = temp3[temp3.length - 1 - i];
      humTable3[i].innerHTML = hum3[hum3.length - 1 - i];
      soilTable3[i].innerHTML = soil3[soil3.length - 1 - i];
      timeTable3[i].innerHTML = time3[time3.length - 1 - i];
    }
  }
}

// function to calculate average
function calculateAvg3() {
  for (var i = 0; i < temp3.length; i++) {
    avgTemp3 += temp3[i];
    avgHum3 += hum3[i];
    avgSoil3 += soil3[i];
    // average time is not calculated
  }
  avgTemp3 = avgTemp3 / temp3.length;
  avgHum3 = avgHum3 / hum3.length;
  avgSoil3 = avgSoil3 / soil3.length;
  //   avgTime = avgTime / time.length;
  //   console.log(avgTemp3, avgHum3, avgSoil3, avgTime);
}

// make temp3 show after 1 min
setInterval(() => {
  //   getData();
  checkTest3();
  putData3();
  calculateAvg3();
  allCharts3();
  averageChart3();

  //   console.log(temp3);
}, 60000);

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

// get data from link "https://script.googleusercontent.com/macros/echo?user_content_key=GCPgv-iMOv_FMylzmysiLre5S7UfW00vGWQO74dqZ1YEaxz5jUFE23zuyLUpIB3eIGE6qw9bfVJBiJw96OpJNaCzYNrb9mMqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEqLSDOJTamM6PRRAM545fdISKH722OvpUvmeQnVJTDEEIp2nCWKtVBzuNpgscHP-a2r9QfGgRHMOtFHK9gD6pOoLSxKvstFaw&lib=MjLHK5ymePKFVsjjhIOUEPnjOEwsImfFF"
