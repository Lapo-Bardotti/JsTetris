/*
Jogo: Tetris
Autor: Code Explained (www.codeexplained.org)
Adaptado por: Gilson Filho
*/

// Rotina principal

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const PECAS = [
    [Z, "green"],
    [S, "blue"],
    [T, "yellow"],
    [O, "red"],
    [L, "brown"],
    [I, "orange"],
    [J, "purple"]
];

var pecaZ = 0;
var pecaS = 0;
var pecaT = 0;
var pecaO = 0;
var pecaL = 0;
var pecaI = 0;
var pecaJ = 0;
var pecasArray = [pecaZ,pecaS,pecaT,pecaO,pecaL,pecaI,pecaJ];

const LINHA = 20;
const COLUNA = 10;
var TAMANHO = 20;
const VAGO = "black";

const largura = 240; 
const altura = 440;
var lar = largura/TAMANHO; 
var alt = altura/TAMANHO; 

var px = 0;
var py = 0;

var score = 0;
var scoreAux = 0;
var linhaCont = 0;
var linhaTot = 0;
var nivel = 1;
var intervalo = 800;

var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");

var musica = new Audio("sons/sound.mp3");
var linhaSom = new Audio("sons/linha.wav");
var derrotaSom = new Audio("sons/derrota.mp3");
var travaSom = new Audio("sons/trava.wav");
var mov = new Audio("sons/mov.wav");
var giro = new Audio("sons/giro.wav");
var descer = new Audio("sons/descer.wav");

onkeydown = controlarPeca;

apendice();

iniciarTabuleiro();

desenharTabuleiro();

gerarParede();

gerarPeca();

inicioDescida = Date.now();

descerPeca();

// Sub-rotinas (funções)

function gerarParede(){

    px = 190;
    py = 0;

    //cima
    for (i = 0; i < (lar-2); i++){
        c.fillStyle = VAGO;
        c.fillRect(px, py, TAMANHO, TAMANHO);
        c.strokeStyle = "black"
        c.strokeRect(px, py, TAMANHO, TAMANHO); 
        px += TAMANHO;
    }

    px = 170;
    py = 0;

    //esquerda
    for (var i = 0; i < alt; i++){
        c.fillStyle = "gray";
        c.fillRect(px, py, TAMANHO, TAMANHO);
        c.strokeStyle = "white"
        c.strokeRect(px, py, TAMANHO, TAMANHO);
        py += TAMANHO;
    } 
    
    px = 390;
    py = 0;

    //direita
    for (i = 0; i < alt; i++){
        c.fillStyle = "gray";
        c.fillRect(px, py, TAMANHO, TAMANHO);
        c.strokeStyle = "white"
        c.strokeRect(px, py, TAMANHO, TAMANHO); 
        py += TAMANHO;
    }

    px = 170;
    py = 420;

    //fundo
    for (i = 0; i < lar; i++){
        c.fillStyle = "gray";
        c.fillRect(px, py, TAMANHO, TAMANHO);
        c.strokeStyle = "white"
        c.strokeRect(px, py, TAMANHO, TAMANHO); 
        px += TAMANHO;
    }
}

function iniciarTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}
}

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

function desenharQuadrado(x, y, cor){
    c.fillStyle = cor;
    c.fillRect(x*TAMANHO + 170 + TAMANHO, y*TAMANHO + TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "black";
    c.strokeRect(x*TAMANHO + 170 + TAMANHO, y*TAMANHO + TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca2(){
    
    //Não vai ser utilizada nessa versão.

    if(r == 0){
        //z
        desenhar(440,280,7,"green");
        desenhar(447,280,7,"green");
        desenhar(447,287,7,"green");
        desenhar(454,287,7,"green");
    } else if (r == 1){
        //s
        desenhar(454,308,7,"blue")
        desenhar(447,308,7,"blue")
        desenhar(447,315,7,"blue")
        desenhar(440,315,7,"blue")
    } else if (r == 2){
        //t
        desenhar(440,343,7,"yellow");
        desenhar(447,343,7,"yellow");
        desenhar(454,343,7,"yellow");
        desenhar(447,336,7,"yellow");
    } else if (r == 3){
        //o
        desenhar(444,363,7,"red");
        desenhar(451,363,7,"red");
        desenhar(444,370,7,"red");
        desenhar(451,370,7,"red");
    } else if (r == 4){
        //L
        desenhar(500,276,7,"brown");
        desenhar(500,283,7,"brown");
        desenhar(500,290,7,"brown");
        desenhar(507,290,7,"brown");
    } else if (r == 5){
        //I
        desenhar(502,304,7,"orange");
        desenhar(502,312,7,"orange");
        desenhar(502,319,7,"orange");
        desenhar(502,326,7,"orange");
    } else if (r == 6){
        //j
        desenhar(505,340,7,"purple");
        desenhar(505,347,7,"purple");
        desenhar(505,354,7,"purple");
        desenhar(498,354,7,"purple");
    }


}

function gerarPeca(){

    var r = Math.floor(Math.random() * PECAS.length);

    pontuacaoTela();
    contaLinhasTela();
    nivelTela();

    //contador de peças
    if(r == 0){
        pecaZ = pecaZ + 1;
    } else if (r == 1){
        pecaS += 1;
    } else if (r == 2){
        pecaT += 1;
    } else if (r == 3){
        pecaO += 1;
    } else if (r == 4){
        pecaL += 1;
    } else if (r == 5){
        pecaI += 1;
    } else if (r == 6){
        pecaJ += 1;
    }

	peca = {
		tetramino : PECAS[r][0],
		cor : PECAS[r][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 3,
        y : -2
    }
    peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];

    pecasArray = [pecaZ,pecaS,pecaT,pecaO,pecaL,pecaI,pecaJ];
}

function descerPeca(){

    var agora = Date.now();
    var delta = agora - inicioDescida;
	
    if (delta > intervalo) {
        moverAbaixo();
        inicioDescida = Date.now();
    }
	
    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    }
}

function moverAbaixo(){

    if (fimDeJogo == true){
        peca.y = -500;
    } else if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        pontuacaoTela();
        desenharPeca();
    } else {
        travarPeca();
        travaSom.play();
        gerarPeca();
    }
    
}

function moverDireita(){

    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
        mov.play();
    }
}

function moverEsquerda(){

    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
        mov.play();
    }
}

function colisao(x, y, p){
    
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }
			
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }
			
            if (novoY < 0) {
                continue;
            }
			
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);
}

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca(){
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                continue;
            }

            if (peca.y + i < 0) {
                Fim();
                desenharStats(); 
                pause();
                derrotaSom.play();
                fimDeJogo = true;
                if(fimDeJogo == true){
                    break;
                }
            }

            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
    }

    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;

        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        if (linhaCheia) {
            linhaCont++;
            linhaTot++;
            scoreAux += 100;
                if (linhaCont == 10){
                    nivel += 1;
                    intervalo = intervalo - intervalo/5;
                    linhaCont = 0;
                }
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j];
                }
            }

            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
            linhaSom.play(); 
        }
    }
    if (scoreAux == 100){
        score += 100*nivel;
        scoreAux = 0;
    } else if (scoreAux == 200){
        score += 300*nivel;
        scoreAux = 0;
    } else if (scoreAux == 300){
        score += 500*nivel;
        scoreAux = 0;
    } else if (scoreAux == 400){
        score += 800*nivel;
        scoreAux = 0;
    } 
    
    desenharTabuleiro();

}

function rodarPeca(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }

    giro.play();
}

function rodarPeca2(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN - 1) % peca.tetramino.length];
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN - 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento){
	var tecla = evento.keyCode;
	
    if (tecla == 37) {
        moverEsquerda();
        inicioDescida = Date.now();
    } else if (tecla == 38) {
        rodarPeca();
        inicioDescida = Date.now();
    } else if (tecla == 39) {
        moverDireita();
        inicioDescida = Date.now();
    } else if (tecla == 40) {
        moverAbaixo();
        score += 1;
        descer.play();
    }
}

document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if (event.keyCode == 13){
        window.location.reload();
    } 
}

function Fim(){
    Final = new Image();
    Final.src = "imagens/Fim.png";
    Final.onload = function(){
        c.drawImage(Final, 190, 0);
    }   
}



function apendice(){
    telaRanking();
    telaRinve();
    start();
}

function start(){
    musica.play();
}

function pause(){
    musica.pause();
}

function telaRanking(){
    ranking = new Image();
    ranking.src = "imagens/ranking.png";
    ranking.onload = function(){
        c.drawImage(ranking, 0, 0);
    }
}

function telaRinve(){
    rinve = new Image();
    rinve.src = "imagens/rinve.png";
    rinve.onload = function(){
        c.drawImage(rinve, 381, 0);
    }
}

function pontuacaoTela(){
    c.fillStyle = "black";
    c.fillRect(99,42,40,19);
    c.font = "13px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(score,100,58);
}

function nivelTela(){
    c.fillStyle = "black";
    c.fillRect(68,88,40,19);
    c.font = "13px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(nivel,73,104);
}

function contaLinhasTela(){
    c.fillStyle = "black";
    c.fillRect(80,135,40,19);
    c.font = "13px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(linhaCont,85,151);
}

function stats(){
    var letraPeca = ["Z","S","T","O","L","I","J"];
    var pontoY = 280;
    for (i = 0; i < pecasArray.length; i++){
        c.font = "12px Arial";
        c.textAlign = "left";
        c.fillStyle = "yellow";
        c.fillText(("Número de " + letraPeca[i] + " = " + pecasArray[i]),448,pontoY);
        pontoY += 12;
    }
}

function desenharStats(){
    desenharStatsZ();
    desenharStatsS();
    desenharStatsT();
    desenharStatsO();
    desenharStatsL();
    desenharStatsI();
    desenharStatsJ();
}

function desenharStatsZ(){
    desenhar(440,280,7,"green");
    desenhar(447,280,7,"green");
    desenhar(447,287,7,"green");
    desenhar(454,287,7,"green");
    c.font = "12px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaZ, 462, 290);
}

function desenharStatsS(){
    desenhar(454,308,7,"blue")
    desenhar(447,308,7,"blue")
    desenhar(447,315,7,"blue")
    desenhar(440,315,7,"blue")
    c.font = "12px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaS, 462, 318);
}

function desenharStatsT(){
    desenhar(440,343,7,"yellow");
    desenhar(447,343,7,"yellow");
    desenhar(454,343,7,"yellow");
    desenhar(447,336,7,"yellow");
    c.font = "12px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaT, 462, 346);
}

function desenharStatsO(){
    desenhar(444,363,7,"red");
    desenhar(451,363,7,"red");
    desenhar(444,370,7,"red");
    desenhar(451,370,7,"red");
    c.font = "12px Arial";
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaO, 462, 374);
}

function desenharStatsL(){
    desenhar(500,276,7,"brown");
    desenhar(500,283,7,"brown");
    desenhar(500,290,7,"brown");
    desenhar(507,290,7,"brown");
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaL, 515, 290);
}

function desenharStatsI(){
    desenhar(502,304,7,"orange");
    desenhar(502,312,7,"orange");
    desenhar(502,319,7,"orange");
    desenhar(502,326,7,"orange");
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaI, 515, 323);
}

function desenharStatsJ(){
    desenhar(505,340,7,"purple");
    desenhar(505,347,7,"purple");
    desenhar(505,354,7,"purple");
    desenhar(498,354,7,"purple");
    c.textAlign = "left";
    c.fillStyle = "yellow";
    c.fillText(" = " + pecaJ, 515, 354);
}

function desenhar(tx,ty,tt,cor){
    c.fillStyle = cor;
    c.fillRect(tx,ty,tt,tt);
    c.strokeStyle = "black"
    c.strokeRect(tx,ty,tt,tt);
}


//Ainda não está completo. Existem mais funções a serem implementadas.