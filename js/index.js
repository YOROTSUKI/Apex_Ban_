
$.ajax({
    url: "https://www.apexmarvin.website:8001/bandetail",
    type:"get",
    dataType:"jsonp",
    headers: {'Access-Control-Allow-Origin': "*"},
    success:function(data){
        renderTable(data)
    }
})

function renderTable(data) {
    const tableHead = document.querySelector('#ban_detail_table thead');
    const tableBody = document.querySelector('#ban_detail_table tbody');
    tableHead.innerHTML = `
    <tr>
        <th onclick="sortTable('time')">Time</th>
        <th>User Name</th>
        <th>Profile Link</th>
        <th>Rank Level</th>
    </tr>
`;
    tableBody.innerHTML = '';
    var master_count = 0;
    var predator_count = 0;

    let ban_count = {};

    data.forEach(item => {
        const row = document.createElement('tr');

        if (typeof (ban_count[item.date]) == 'undefined') {
            ban_count[item.date] = {
                'pred': 0,
                'master': 0
            }
        }

        const timeCell = document.createElement('td');
        timeCell.textContent = item.date;
        row.appendChild(timeCell);

        const userNameCell = document.createElement('td');
        userNameCell.textContent = item.username;
        row.appendChild(userNameCell);

        const userLinkCell = document.createElement('td');
        const userLink = document.createElement('a');
        userLink.href = item.profile_link;
        userLink.textContent = "Profile Link";
        userLink.target = "_blank";
        userLinkCell.appendChild(userLink);
        row.appendChild(userLinkCell);

        const isPredCell = document.createElement('td');
        isPredCell.textContent = item.active == "True" ? "Predator" : "Master";

        if (item.active == "True") {
            ban_count[item.date]['pred'] += 1
        }
        else {
            ban_count[item.date]['master'] += 1
        }

        if (item.date > '2024-05-08') {
            if (item.active == "True") {
                predator_count += 1
            }
            else {
                master_count += 1
            }
        }

        row.appendChild(isPredCell);

        tableBody.appendChild(row);
    });
    window.ban_count = ban_count;
            document.getElementById("Total_banned").innerHTML =predator_count + master_count
            document.getElementById("Predator_banned").innerHTML =predator_count
            document.getElementById("Master_banned").innerHTML =master_count
}

$("#hatstab1").click(function(){
  $.ajax({
    url: "https://www.apexmarvin.website:8001/daily_count",
    type:"get",
    dataType:"jsonp",
    callback:renderOtherDataTable,
    success:function(data){
      renderOtherDataTable(data)
    }
})
})

function renderOtherDataTable(data) {
    date = data[0];
    master_daily = data[1];
    ban_daily = data[2];
     var options = {
          series: [
          {
            name: "Master/Predator",
            data: master_daily
          },
          {
            name: "Banned",
            data: ban_daily
          }
        ],
          chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#CC0000'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Master/Predator & Banned',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: date,
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Daily Growth'
          },
          min: 5,
          max: Math.max(...master_daily)
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
        };
        console.log(Math.max(master_daily))
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

}