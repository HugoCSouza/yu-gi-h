// Seleciona todas as teclas do piano
const pianoKeys = document.querySelectorAll(".piano-keys .key");

// Seleciona o slider de volume
const sliderVolume = document.querySelector(".volumn input");

// Seleciona o checkbox que permite mostrar/ocultar as teclas do piano
const permitPiano = document.querySelector(".check-keys input");

// Cria um objeto de áudio para tocar os sons das teclas
let somTecla = new Audio();

// Array para armazenar as teclas confirmadas
let confirmedKeys = [];

// Função para reproduzir o som de uma tecla
const playtune = (key) => {
    // Define o caminho do arquivo de áudio com base na tecla clicada
    somTecla.src = `src/audios/${key}.wav`;

    // Toca o som
    somTecla.play();

    // Seleciona a tecla clicada e adiciona a classe 'active' temporariamente
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    // Remove a classe 'active' após 150 milissegundos para efeito visual da tecla apertada
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

// Função para lidar com a mudança de volume
const handleVolume = (e) => {
    // Ajusta o volume do objeto de áudio com base no valor do slider
    somTecla.volume = e.target.value;
};

// Função para alternar a visibilidade das letras nas teclas do piano
const toogleKeys = () => {
    // Alterna a classe 'hide' em todas as teclas do piano, toggle, como o nome já diz, troca se tem a classe retira, se não tem coloca
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

// Adiciona um ouvinte de evento de clique a cada tecla do piano
pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playtune(key.dataset.key));

    // Adiciona a tecla ao array de teclas possiveis
    confirmedKeys.push(key.dataset.key);
});

// Adiciona um ouvinte de evento para as teclas do teclado
document.addEventListener("keydown", (e) => {
    // Verifica se a tecla pressionada está no array de teclas confirmadas
    if (confirmedKeys.includes(e.key)) {
        playtune(e.key);
    }
});

// Adiciona um ouvinte de evento de mudança no slider de volume
sliderVolume.addEventListener("input", handleVolume);

// Adiciona um ouvinte de evento de clique no checkbox para mostrar/ocultar as letras do piano
permitPiano.addEventListener("click", toogleKeys);
