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
//ליצןר אובייקט
const player = {
    position: 'PG',
    twoPercent: 40,
    threePercent: 40,
    points: 100
};
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
allPlayers(player);
let playerList = [];
//////////
// שליחת הטופס לשרת
const cardTim = document.getElementById('card-Tim');
const form = document.getElementById('search-form');
const playerTable = document.getElementById('player-table');
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const position = document.getElementById('position').value;
    const points = Number(document.getElementById('points').value);
    const twoPercent = Number(document.getElementById('fg').value);
    const threePercent = Number(document.getElementById('3p').value);
    // const playerName = (document.getElementById('playerName') as HTMLInputElement).value;
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
//להציג את הרשימה בטבלה
function renderTable(playerList) {
    const table = document.getElementById('player-table');
    table.innerHTML = ''; // מנקה את תוכן הטבלה לפני שמוסיפים שורות חדשות
    playerList.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}%</td>
            <td>${player.threePercent}%</td>
            <td>
                <button onclick="addplayerToTeam(${index})">Add ${player.playerName} to Current Team</button>
            </td>
        `;
        table.appendChild(row);
    });
}
function addplayerToTeam(index) {
    var _a;
    const newPlayer = playerList[index];
    let position = newPlayer.position;
    let CurrentDiv = document.getElementById(position);
    const headers = (_a = document.getElementById('card-Tim')) === null || _a === void 0 ? void 0 : _a.textContent;
    if (CurrentDiv) {
        CurrentDiv.innerHTML = `     
    <p> ${newPlayer.playerName} </p>
    <p> ${newPlayer.position} </p>
    <p> ${newPlayer.points} </p>
    <p> ${newPlayer.twoPercent} </p>
    <p> ${newPlayer.threePercent} </p> 
    `;
    }
}
