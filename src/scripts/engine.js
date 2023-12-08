const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_box"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCars:{
        player: document.getElementById("computer-card-field"),
        computer: document.getElementById("player-card-field"),
    },
    actions: {
        button: document.getElementById("next-duel")
    },
};

const playerSides = {
    computer: "computer-card-field",
    player: "player-card-field",
}

const pathImages = "./src/assets/icons/";


const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        Loseof:[2],
    },
    {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf:[2],
        Loseof:[0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        Loseof:[1],
    },
];

async function drawCards(cardNumbers, fieldSize){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSize);
    }

    document.getElementById(fieldSize).appendChild(cardImage)
}

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random()*cardData.length)
    return cardData[randomIndex].id;
}

async function createCardImage()

function init(){
    drawCards(5, playerSides.player)
    drawCards(5, playerSides.computer)
}
init()