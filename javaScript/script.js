"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'https://nbaserver-q21u.onrender.com/api/filter/';
//Post 
function allPlayers(newPlayers) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlayers)
        });
        const addedPlayer = yield response.json();
        console.log(addedPlayer);
        return addedPlayer;
    });
}
let playerList = [];
const cardTim = document.getElementById('card-Tim');
const form = document.getElementById('search-form');
const playerTable = document.getElementById('player-table');
// שליחת הטופס לשרת
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const position = document.getElementById('position').value;
    const points = Number(document.getElementById('points').value);
    const twoPercent = Number(document.getElementById('fg').value);
    const threePercent = Number(document.getElementById('3p').value);
    const newPlayer = {
        position,
        twoPercent,
        threePercent,
        points,
        // playerName
    };
    playerList = yield allPlayers(newPlayer);
    renderTable(playerList);
    console.log(playerList);
}));
//מציגה  את הרשימה בטבלה
function renderTable(playerList) {
    const table = document.getElementById('player-table');
    table.innerHTML = ''; // 
    playerList.forEach((player, index) => {
        var _a;
        const row = document.createElement('tr'); // יצירת שורה חדשה
        // יצירת  שדה של השחקן
        const nameCell = document.createElement('td');
        nameCell.textContent = ((_a = player.playerName) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        row.appendChild(nameCell);
        const positionCell = document.createElement('td');
        positionCell.textContent = player.position;
        row.appendChild(positionCell);
        const pointsCell = document.createElement('td');
        pointsCell.textContent = String(player.points);
        row.appendChild(pointsCell);
        const twoPercentCell = document.createElement('td');
        twoPercentCell.textContent = `${player.twoPercent}%`;
        row.appendChild(twoPercentCell);
        const threePercentCell = document.createElement('td');
        threePercentCell.textContent = `${player.threePercent}%`;
        row.appendChild(threePercentCell);
        const actionCell = document.createElement('td');
        const addButton = document.createElement('button');
        addButton.textContent = `Add ${player.playerName} to Current Team`;
        addButton.onclick = () => addplayerToTeam(index);
        actionCell.appendChild(addButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}
//פונקציה שמכניסה את השחקן הנבחר לכרטיס המתאים
function addplayerToTeam(index) {
    const newPlayer = playerList[index];
    let position = newPlayer.position;
    let CurrentDiv = document.getElementById(position);
    if (CurrentDiv == null) {
        return;
    }
    else if (CurrentDiv.innerHTML != null) {
        CurrentDiv.innerHTML = `     
    <p>${newPlayer.playerName} </p>
     <p>Two Percent:${newPlayer.twoPercent}% </p>
    <p>Three Percent: ${newPlayer.threePercent}% </p> 
      <p>Points: ${newPlayer.points} </p>
    `;
    }
}
//מציגה  את הרשימה בטבלה
// function renderTable(playerList: Players[]) {
//     const table = document.getElementById('player-table') as HTMLTableElement;
//     table.innerHTML = ''; // מנקה את תוכן הטבלה לפני שמוסיפים שורות חדשות
//     playerList.forEach((player, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${player.playerName}</td>
//             <td>${player.position}</td>
//             <td>${player.points}</td>
//             <td>${player.twoPercent}%</td>
//             <td>${player.threePercent}%</td>
//             <td>
//                 <button onclick="addplayerToTeam(${index})">Add ${player.playerName} to Current Team</button>
//             </td>
//         `;
//         table.appendChild(row);
//     });
// }
