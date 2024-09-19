const baseUrl: string = 'https://nbaserver-q21u.onrender.com/api/filter/';

interface Players {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    playerName?: string;
}

//ליצןר אובייקט
const player: Players = {
    position: 'PG',
    twoPercent: 40,
    threePercent: 40,
    points: 100
}


//Post 
async function allPlayers(newPlayers: Players): Promise<Players[]> {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlayers)
    });
    const addedPlayer: Players[] = await response.json();
    console.log(addedPlayer);
    
    return addedPlayer;
}

allPlayers(player);

let playerList: Players[] = [];
//////////
// שליחת הטופס לשרת
const cardTim = document.getElementById('card-Tim') as HTMLDivElement;
const form = document.getElementById('search-form') as HTMLFormElement;
const playerTable = document.getElementById('player-table') as HTMLDivElement;


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const position = (document.getElementById('position') as HTMLSelectElement).value;
    const points = Number((document.getElementById('points') as HTMLInputElement).value);
    const twoPercent = Number((document.getElementById('fg') as HTMLInputElement).value);
    const threePercent = Number((document.getElementById('3p') as HTMLInputElement).value);
   
    // const playerName = (document.getElementById('playerName') as HTMLInputElement).value;

    const newPlayer: Players = {
        position,
        twoPercent,
        threePercent,
        points,
        // playerName
    };
    playerList = await allPlayers(newPlayer);
    renderTable(playerList);
    console.log(playerList);
   

});

//להציג את הרשימה בטבלה

function renderTable(playerList: Players[]) {
    const table = document.getElementById('player-table') as HTMLTableElement;
    table.innerHTML = ''; // מנקה את תוכן הטבלה לפני שמוסיפים שורות חדשות
    playerList.forEach((player) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}%</td>
            <td>${player.threePercent}%</td>
            <td>
                <button onclick="addplayerToTeam('${player.playerName}')">Add ${player.playerName} to Current Team</button>
            </td>
        `;
        table.appendChild(row);
    });
}


function addplayerToTeam() {




}
























   





