// Definição do estado da aplicação
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("computer-card-field"),
        computer: document.getElementById("player-card-field"),
    },
    playerSides: {
        computer: "computer-cards",
        player: "player-cards",
        playerb: document.querySelector("#computer-cards"),
        computerb: document.querySelector("#player-cards"),
    },
    actions: {
        button: document.getElementById("next-duel")
    },
};


// Caminho para as imagens dos cards
const pathImages = "./src/assets/icons/";

// Dados dos cards
const cardData = [
    //  (array de objetos com informações sobre cada card)
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

// Função assíncrona para desenhar cards de costas no campo
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
};

// Função assíncrona para obter um ID de card aleatório
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id;
};

// Função assíncrona para criar a imagem de um card
async function createCardImage(IdCard, fieldSize) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px")
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");
    if(fieldSize === state.playerSides.player){
        //Mostra a carta do lado esquerdo
        cardImage.addEventListener("mouseover",() => {
            drawSelectCard(IdCard);
        });


        //Coloca a carta em campo
        cardImage.addEventListener("click", () =>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    };
    return cardImage
};

// Função assíncrona para exibir informações do card ao passar o mouse
async function drawSelectCard(index) {
    // ... (atualização dos elementos no estado com informações do card)
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = `Atributo: ${cardData[index].type}`;
};

// Função assíncrona para definir os cards nos campos e verificar o resultado do duelo
async function setCardsField(cardId) {
    // ... (remoção de todas as imagens de cards, obtenção de card aleatório para o computador, etc.)
    await removeAllCardsImages();
    let computerCardId = await getRandomCardId();
    

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId)

    await updateScore();
    await drawButton(duelResults);

};

async function removeAllCardsImages(){
    let {playerb, computerb} = state.playerSides;
    let imgElements = playerb.querySelectorAll("img")
    imgElements.forEach((img) => img.remove())

    imgElements = computerb.querySelectorAll("img")
    imgElements.forEach((img) => img.remove())
};

async function checkDuelResults(cardPlayerId, cardComputerId){
    let duelResults = "Empate!";
    let cardPlayer = cardData[cardPlayerId];
    if(cardPlayer.WinOf.includes(cardComputerId)){
        duelResults = "Ganhou"
        playAudio('win')
        state.score.playerScore++;
    }else if(cardPlayer.Loseof.includes(cardComputerId)){
        duelResults = "Perdeu"
        playAudio('lose')
        state.score.computerScore++;
    }
    return duelResults
};

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Vitórias: ${state.score.playerScore} | Derrotas: ${state.score.computerScore}`;
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.actions.button.style.display = 'none';

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    
    init()
}

async function playAudio(status){
    const aud = new Audio(`./src/assets/audios/${status}.wav`)
    aud.play()
}

function init(){
    drawCards(5, state.playerSides.player)
    drawCards(5, state.playerSides.computer)

    const bgm = document.getElementById("bgm")
    bgm.play()
}
init()