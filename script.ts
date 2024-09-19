const baseUrl: string = 'https://nbaserver-q21u.onrender.com/api/filter/';

interface Players {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    playerName?: string;
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



let playerList: Players[] = [];

const cardTim = document.getElementById('card-Tim') as HTMLDivElement;
const form = document.getElementById('search-form') as HTMLFormElement;
const playerTable = document.getElementById('player-table') as HTMLDivElement;

// שליחת הטופס לשרת
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const position = (document.getElementById('position') as HTMLSelectElement).value;
    const points = Number((document.getElementById('points') as HTMLInputElement).value);
    const twoPercent = Number((document.getElementById('fg') as HTMLInputElement).value);
    const threePercent = Number((document.getElementById('3p') as HTMLInputElement).value);

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

//מציגה  את הרשימה בטבלה
function renderTable(playerList: Players[]) {
    const table = document.getElementById('player-table') as HTMLTableElement;
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


//פונקציה שמכניסה את השחקן הנבחר לכרטיס המתאים
function addplayerToTeam(index: number) {
    const newPlayer = playerList[index];
    let position : string = newPlayer.position;
    let CurrentDiv = document.getElementById(position);
  
    if (CurrentDiv== null) {
        return;
    }
    else if (CurrentDiv.innerHTML != null) {
        CurrentDiv.innerHTML = `     
    <p>${newPlayer.playerName} </p>
     <p>Two Percent:${newPlayer.twoPercent}% </p>
    <p>Three Percent: ${newPlayer.threePercent}% </p> 
      <p>Points: ${newPlayer.points} </p>
    `
    }
          
}
 






















   





