// Sistema de abas
const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for(let i = 0; i < botoes.length; i++){
    botoes[i].onclick = function(){
        // Remove classe ativo de todos
        for(let j = 0; j < botoes.length; j++){
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }
        // Adiciona classe ativo no clicado
        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    }
}

// Contadores regressivos para promoções/agendamentos
const contadores = document.querySelectorAll(".contador");

// Datas objetivo para cada serviço (ex: promoções semanais)
const tempoObjetivo1 = new Date("2026-06-30T23:59:59"); // Corte Clássico
const tempoObjetivo2 = new Date("2026-07-15T23:59:59"); // Barba
const tempoObjetivo3 = new Date("2026-08-01T23:59:59"); // Sobrancelha
const tempoObjetivo4 = new Date("2026-09-01T23:59:59"); // Tratamentos

const tempos = [tempoObjetivo1, tempoObjetivo2, tempoObjetivo3, tempoObjetivo4];

function calculaTempo(tempoObjetivo){
    let tempoAtual = new Date();
    let tempoFinal = tempoObjetivo - tempoAtual;
    
    if (tempoFinal <= 0){
        return [0, 0, 0, 0];
    }
    
    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);
    
    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    
    return [dias, horas, minutos, segundos];
}

function atualizaCronometro(){
    for (let i = 0; i < contadores.length; i++){
        const [dias, horas, min, seg] = calculaTempo(tempos[i]);
        document.getElementById("dias" + i).textContent = dias.toString().padStart(2, '0');
        document.getElementById("horas" + i).textContent = horas.toString().padStart(2, '0');
        document.getElementById("min" + i).textContent = min.toString().padStart(2, '0');
        document.getElementById("seg" + i).textContent = seg.toString().padStart(2, '0');
    }
}

function comecaCronometro(){
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

// Inicia os cronômetros ao carregar a página
document.addEventListener('DOMContentLoaded', comecaCronometro);