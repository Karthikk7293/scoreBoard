let allScores = [];
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const socket = io("http://localhost:4000");


function appendDataToTable(data) {
    const tableBody = document.querySelector('#data-table tbody');

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.team}</td>
                <td>${item.score}</td>
                <td>${item.wickets}</td>
                <td>${item.batsmen}</td>
                <td>${item.target !== null ? item.target : 'N/A'}</td>
                <td>${item.run_rate}</td>
                <td>${item.overs}</td>
                <td>${item.bowler}</td>
                <td>${item.current_over_status}</td>
                <td class="">
                <button  class="btn btn-primary edit-btn " data-index="${item.id}" id="update-button">UPDATE</button>
                </td>
            `;

        tableBody.appendChild(row);
    });
}

window.onload = () => {
    try {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:4000/api/score/all-scores',
            headers: {
                'Content-Type': 'application/json'
            },
            success: (data) => {
                allScores = data?.scores
                if (data) {
                    appendDataToTable(data?.scores);
                }
            }
        })
    } catch (error) {
        console.log(error);

    }
}
function handleEditButtonClick(event) {

    if (event.target.classList.contains('edit-btn')) {
        const scoreId = event.target.getAttribute('data-index');
        const [data] = allScores.filter((item) => item.id == scoreId)

        document.getElementById('batting_team').value = data.team;
        document.getElementById('batting_team_id').value = data.team_id;
        document.getElementById('score_id').value = data.id;
        document.getElementById('score').value = data.score;
        document.getElementById('wickets').value = data.wickets;
        document.getElementById('batsmen').value = data.batsmen;
        document.getElementById('batsmen_id').value = data.batsmen_id;
        document.getElementById('target').value = data.target;
        document.getElementById('run_rate').value = data.run_rate;
        document.getElementById('overs').value = data.overs;
        document.getElementById('bowler').value = data.bowler;
        document.getElementById('bowler_id').value = data.bowler_id;
        document.getElementById('current_over_status').value = data.current_over_status;

    }
}

document.querySelector('#data-table').addEventListener('click', handleEditButtonClick);


function handleFormSubmit(event) {
    event.preventDefault();

    const batting_team = document.getElementById('batting_team_id').value
    const score = document.getElementById('score').value
    const wickets = document.getElementById('wickets').value
    const batsmen = document.getElementById('batsmen_id').value
    const target = document.getElementById('target').value
    const run_rate = document.getElementById('run_rate').value
    const overs = document.getElementById('overs').value
    const bowler = document.getElementById('bowler_id').value
    const current_over_status = document.getElementById('current_over_status').value
    const scoreId = document.getElementById("score_id").value
    console.log({ scoreId, batsmen, batting_team, score, wickets, target, run_rate, overs, bowler, current_over_status });

    try {

        function _ajax_request(url, data, callback, method) {
            return $.ajax({
                url: url,
                type: method,
                data: data,
                success: callback
            });
        }


        $.extend({
            put: function (url, data, callback) {
                return _ajax_request(url, data, callback, 'PUT');
            }
        });
        const url = `http://localhost:4000/api/score/update-score/${scoreId}`;
        const data = { batsmen, batting_team, score, wickets, target, run_rate, overs, bowler, current_over_status }

        $.put(url, data, function (result) {
            console.log({ result });
            socket.emit('update score', `API Response: ${result} at ${new Date()}`)

        });

    } catch (error) {
        console.log(error);

    }
    // Send data to the server for updating


}

socket.on('update score', (response) => {
    console.log({ response });

})

document.getElementById('myForm').addEventListener('submit', handleFormSubmit);