document.getElementById("mais").addEventListener("click", EuComproCarta);
document.getElementById("mantem").addEventListener("click", BOTCompraCarta);

window.addEventListener("load", iniciarJogo);

var totalU = 0;
var totalB = 0;
var primeiraCartaBot = true;
var primeiraVez = true;
var turno = "usu";

function iniciarJogo() {
    setTimeout(() => {
        EuComproCarta();
    }, 200);

    setTimeout(() => {
        BOTCompraCarta();
    }, 200);

    setTimeout(() => {
        EuComproCarta();
    }, 800);

    setTimeout(() => {
        BOTCompraCarta();
    }, 800);
};

function gerarCartaAleatoriaBot() {
    const alea = Math.floor(Math.random() * 10) + 1;
    totalB += alea;
    return `../images/${alea}.png`;
};

function gerarCartaAleatoriaUsu() {
    const alea = Math.floor(Math.random() * 10) + 1;
    totalU += alea;
    return `../images/${alea}.png`;
};

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
};

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
};

document.querySelector("#bot").addEventListener("click", (e) => {
    const card = e.target.closest(".flip-card");
    if (card) {
        card.classList.toggle("flip");
    }
});

function mostrarBotoes() {
    document.getElementById("mais").style.display = "block";
    document.getElementById("mantem").style.display = "block";
};

function esconderBotoes() {
    document.getElementById("mais").style.display = "none";
    document.getElementById("mantem").style.display = "none";
};

//Função pro jogo
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

    const ultimaCarta = minhas.lastElementChild;
    let pontoX, pontoY;
    if (ultimaCarta) {
        const posUltima = ultimaCarta.getBoundingClientRect();
        pontoX = posUltima.right;
        pontoY = posUltima.top;
    } else {
        pontoX = posMinhas.left;
        pontoY = posMinhas.top;
    }

    carta.style.transform = `translate(${pontoX - posMonte.left}px, ${pontoY - posMonte.top}px) rotateY(180deg)`;

    setTimeout(() => {
        carta.remove();
        adicionarCartaReal(novasrc);
    }, 700);

    if (totalU >= 21)
        fimDoJogo();
    else {
        turno = "bot";
        esconderBotoes();
        setTimeout(BotCompra, 800);
    }
};

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

    const ultimaCarta = bot.lastElementChild;
    let pontoX, pontoY;
    if (ultimaCarta) {
        const posUltima = ultimaCarta.getBoundingClientRect();
        pontoX = posUltima.right;
        pontoY = posUltima.top;
    } else {
        pontoX = posBot.left;
        pontoY = posBot.top;
    }
    carta.style.transform = `translate(${pontoX - posMonte.left}px, ${pontoY - posMonte.top}px) rotateY(180deg)`;

    setTimeout(() => {
        carta.remove();
        adicionarCartaBot(novasrc);
    }, 700);

    if (totalB >= 21)
        fimDoJogo();
    else {
        turno = "jogador";
        mostrarBotoes();
    }
};

function fimDoJogo() {
    var dif21U = 21 - totalU;
    var dif21B = 21 - totalB;

    if (totalU == 21) { alert(`Você venceu!!!\n\n\nDados do jogo:\n\nSua pontuação: ${totalU}\nPontuação do oponente: ${totalB}`); }
    else {
        if (totalB == 21) { alert(`O oponente venceu!\n\n\nDados do jogo:\n\nSua pontuação: ${totalU}\nPontuação do oponente: ${totalB}`); }
        else if (dif21B > dif21U) { alert(`O oponente venceu!\n\n\nDados do jogo:\n\nSua pontuação: ${totalU}\nPontuação do oponente: ${totalB}`); }
        else if (dif21B < dif21U) { alert(`Você venceu!!!\n\n\nDados do jogo:\n\nSua pontuação: ${totalU}\nPontuação do oponente: ${totalB}`); }
        else if (dif21B == dif21U) { alert(`Você venceu!!!\n\n\nDados do jogo:\n\nSua pontuação: ${totalU}\nPontuação do oponente: ${totalB}`); }
    }
    JogarNovamente();
};

function JogarNovamente() {
    const botao = document.createElement("button");
    botao.style.fontFamily = "Cinzel, serif";
    botao.textContent = "Jogar Novamente";
    botao.style.position = "absolute";
    botao.style.top = "50%";
    botao.style.left = "50%";
    botao.style.transform = "translate(-50%, -50%)";
    botao.style.padding = "20px 30px";
    botao.style.fontSize = "280%";
    botao.style.fontWeight = "bold";
    botao.style.color = "green";
    botao.style.background = "beige";
    botao.style.border = "4px solid green";
    botao.style.borderRadius = "15px";
    botao.style.cursor = "pointer";

    botao.onclick = function () {
        location.reload();
    };
    document.body.appendChild(botao);
};

function BotCompra() {
    if (turno !== "bot")
        return;
    else if (totalU < 16)
        BOTCompraCarta();
    else if (totalU >= 16)
        BOTCompraCarta();
    else {
        alert(`O jogo informa:\n\nO OPONENTE MANTEVE AS CARTAS!`);
        turno = "usu";
        mostrarBotoes();
    }
};