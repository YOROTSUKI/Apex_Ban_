        let banData = [];
        let otherData = [];

        document.addEventListener('DOMContentLoaded', function () {
            loadData();
        });

        function loadData(selectedData = 'total_ban_detail.json') {
            // const selectedData = document.getElementById('dataType').value;
            fetch(selectedData)
                .then(response => response.json())
                .then(data => {
                    if (selectedData === 'total_ban_detail.json') {
                        banData = data;
                        renderTable(banData);
                    } else {
                        otherData = data;
                        renderOtherDataTable(otherData);
                    }
                })
                .catch(error => console.error('Error fetching the JSON:', error));
        }

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

                if (typeof (ban_count[item.time]) == 'undefined') {
                    ban_count[item.time] = {
                        'pred': 0,
                        'master': 0
                    }
                }

                const timeCell = document.createElement('td');
                timeCell.textContent = item.time;
                row.appendChild(timeCell);

                const userNameCell = document.createElement('td');
                userNameCell.textContent = item.user_name;
                row.appendChild(userNameCell);

                const userLinkCell = document.createElement('td');
                const userLink = document.createElement('a');
                userLink.href = item.user_link;
                userLink.textContent = "Profile Link";
                userLink.target = "_blank";
                userLinkCell.appendChild(userLink);
                row.appendChild(userLinkCell);

                const isPredCell = document.createElement('td');
                isPredCell.textContent = item.is_pred ? "Predator" : "Master";

                if (item.is_pred) {
                    ban_count[item.time]['pred'] += 1
                }
                else {
                    ban_count[item.time]['master'] += 1
                }

                if (item.time > '2024-05-08') {
                    if (item.is_pred) {
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
            document.getElementById("total_ban").innerHTML =`${predator_count + master_count}`
            document.getElementById("Predator_banned").innerHTML =`${predator_count}`
            document.getElementById("Master_banned").innerHTML =`${master_count}`

            `<div style="white-space: pre;">
    🔨Total ban(S21)🔨:</b>${predator_count + master_count}</b>
     \t\t<img src="Img/apexpredator1.png" style="width: 25px; height: 25px;">Predator: ${predator_count}
     \t\t<img src="Img/master1.png" style="width: 25px; height: 25px;">Master: ${master_count}
  </div>`;
        }

        function renderOtherDataTable(data) {
            const tableHead = document.querySelector('#ban_list_table thead');
            const tableBody = document.querySelector('#ban_list_table tbody');
            tableHead.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Predator</th>
                <th>Master</th>
            </tr>
        `;
            tableBody.innerHTML = '';
			const dataArray = Object.entries(window.ban_count);
			dataArray.sort((a, b) => new Date(b[0]) - new Date(a[0]));
            var master_count = 0;
            var predator_count = 0;
            dataArray.forEach(([date, values]) => {
                const row = document.createElement('tr');
                const dateCell = document.createElement('td');
                dateCell.textContent = date;
                row.appendChild(dateCell);

                const lieShaCell = document.createElement('td');
                lieShaCell.textContent = values['pred'];

                row.appendChild(lieShaCell);

                const daShiCell = document.createElement('td');
                daShiCell.textContent = values['master'];

                row.appendChild(daShiCell);
                tableBody.appendChild(row)
            })

        }

        function sortTable(key) {
            const selectedData = document.getElementById('dataType').value;
            const data = selectedData === 'total_ban_detail.json' ? banData : otherData;
            const sortedData = [...data].sort((a, b) => {
                const dateA = new Date(a[key]);
                const dateB = new Date(b[key]);
                return dateA - dateB;
            });
            const isAscending = document.querySelector('th').classList.toggle('ascending');
            if (!isAscending) {
                sortedData.reverse();
            }
            selectedData === 'total_ban_detail.json' ? renderTable(sortedData) : renderOtherDataTable(sortedData);
        }

        function filterByDate() {
            const selectedData = document.getElementById('dataType').value;
            const data = selectedData === 'total_ban_detail.json' ? banData : otherData;
            const startDate = new Date(document.getElementById('startDate').value);
            const endDate = new Date(document.getElementById('endDate').value);
            const filteredData = data.filter(item => {
                const itemDate = new Date(item.time || item['Date']);
                return itemDate >= startDate && itemDate <= endDate;
            });
            selectedData === 'total_ban_detail.json' ? renderTable(filteredData) : renderOtherDataTable(filteredData);
        }