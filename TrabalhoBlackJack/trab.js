document.getElementById("mais").addEventListener("click", EuComproCarta);


// var cardsUsu; AJEITAR PARA ARMAZENAR IFORMAÇÂO
// var cardsBot;
var totalU = 0
var totalB = 0
var indU = 2
var indB = 2
var doisManteve = 0
var primeiraCartaBot = true;


function iniciarJogo(){
    setTimeout(()=>{
        EuComproCarta();
    }, 200);


    setTimeout(()=>{
        BOTCompraCarta();
    }, 200);


    setTimeout(()=>{
        EuComproCarta();
    }, 800);


    setTimeout(()=>{
        BOTCompraCarta();
    }, 800);
}


function gerarCartaAleatoriaBot() {
    const alea = Math.floor(Math.random() * 10) + 1;
    totalB += alea;
    return `../images/${alea}.png`;
}


function gerarCartaAleatoriaUsu() {
    const alea = Math.floor(Math.random() * 10) + 1;
    totalU += alea;
    return `../images/${alea}.png`;
}


function EuComproCarta() {

    const novasrc = gerarCartaAleatoriaUsu();

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

    carta.style.transform = `translate(${posMinhas.left - posMonte.left}px, ${posMinhas.top - posMonte.top}px) rotateY(180deg)`;

    setTimeout(() => {
        carta.remove();
        adicionarCartaReal(novasrc);
    }, 700);
}


function BOTCompraCarta() {
    //Animação
    const novasrc = gerarCartaAleatoriaBot();

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

    carta.style.transform = `translate(${posBot.left - posMonte.left}px, ${posBot.top - posMonte.top}px) rotateY(180deg)`;

    setTimeout(() => {
        carta.remove();
        adicionarCartaBot(novasrc);
    }, 700);


    //Funcionalidades do jogo
    alert("O BOT comprou uma carta!");

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
                <img src="../images/fundoB.png">
            </div>
            <div class="flip-card-back">
                <img src="../images/naosei.png">
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


//Função pro jogo
mantem.addEventListener("click", function(){
    vezUsu = true;
    if(manter == 0){
        manter = 1;
    }
    else{
        manter = 2;
    }
});



var manter = 0;
var vezUsu = true; //boolean
var primeiraVez = true;


window.addEventListener("load", iniciarJogo);

if(vezUsu){
    EuComproCarta();
    vezUsu = false; 
}else{
    BOTCompraCarta();
}