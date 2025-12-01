var cardsUsu = [(Math.floor(Math.random()*10)+1), (Math.floor(Math.random()*10)+1)]
var cardsBot = [(Math.floor(Math.random()*10)+1), (Math.floor(Math.random()*10)+1)]
var totalU = 0
var totalB = 0
var indU = 2
var indB = 2
var doisManteve = 0
var primeiraCartaBot = true;

document.getElementById("mais").addEventListener("click", animarCartaMinha);
document.getElementById("mantem").addEventListener("click", animarCartaParaBot);

function iniciarJogo(){
    setTimeout(()=>{
        animarCartaMinha();
    }, 200);

    setTimeout(()=>{
        animarCartaParaBot();
    }, 200);

    setTimeout(()=>{
        animarCartaMinha();
    }, 800);

    setTimeout(()=>{
        animarCartaParaBot();
    }, 800);
}

document.getElementById("mais").addEventListener("click", function(){
    

});

function gerarCartaAleatoria() {
    const alea = Math.floor(Math.random() * 10) + 1;
    return `../images/${alea}.png`;
}

function animarCartaMinha() {

    const novasrc = gerarCartaAleatoria();

    const monte = document.querySelector("#monte img");
    const posMonte = monte.getBoundingClientRect();

    const minhas = document.querySelector("#minhas");
    const posMinhas = minhas.getBoundingClientRect();

    const carta = document.createElement("img");
    carta.src = "../images/fundoB.png";
    carta.classList.add("carta-animada");

    carta.style.left = posMonte.left + "px";
    carta.style.top = posMonte.top + "px";

    document.body.appendChild(carta);

    void carta.offsetWidth;

    carta.style.transform = `
        translate(${posMinhas.left - posMonte.left}px,
                  ${posMinhas.top - posMonte.top}px)
        rotateY(180deg)
    `;

    setTimeout(() => {
        carta.remove();
        adicionarCartaReal(novasrc);
    }, 700);
}

function animarCartaParaBot() {

    const novasrc = gerarCartaAleatoria();

    const monte = document.querySelector("#monte img");
    const posMonte = monte.getBoundingClientRect();

    const bot = document.querySelector("#bot");
    const posBot = bot.getBoundingClientRect();

    const carta = document.createElement("img");
    carta.src = "../images/fundoB.png";  
    carta.classList.add("carta-animada");

    carta.style.left = posMonte.left + "px";
    carta.style.top = posMonte.top + "px";

    document.body.appendChild(carta);
    void carta.offsetWidth;

    carta.style.transform = `
        translate(${posBot.left - posMonte.left}px,
                  ${posBot.top - posMonte.top}px)
        rotateY(180deg)
    `;

    setTimeout(() => {
        carta.remove();
        adicionarCartaBot(novasrc);
    }, 700);
}

function adicionarCartaReal(src) {
    const div = document.createElement("div");
    div.className = "flip-card";

    div.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${src}">
            </div>
        </div>
    `;

    document.querySelector("#minhas").appendChild(div);
}

function adicionarCartaBot(src) {
    const div = document.createElement("div");
    div.className = "flip-card flip-card-op";

    if (primeiraCartaBot) {
        div.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="../images/fundoB.png"> <!-- verso da carta -->
            </div>
            <div class="flip-card-back">
                <img src="../images/naosei.png"> <!-- "?" -->
            </div>
        </div>
        `;
        primeiraCartaBot = false;
    } else {
        div.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${src}">
            </div>
        </div>
        `;
    }

    document.querySelector("#bot").appendChild(div);
}

document.querySelector("#bot").addEventListener("click", (e) => {
    const card = e.target.closest(".flip-card");
    if (card) {
        card.classList.toggle("flip");
    }
});

window.addEventListener("load", iniciarJogo);
