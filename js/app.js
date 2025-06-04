const creditosEl = document.getElementById("creditos");
const numeroInput = document.getElementById("numero");
const corSelect = document.getElementById("cor");
const mensagemEl = document.getElementById("mensagem");
const resultadoEl = document.getElementById("resultado");
const roletaEl = document.getElementById("roleta");
const jogarBtn = document.getElementById("jogarBtn");

let creditos = 100;
let anguloAtual = 0; // Move para fora da função para manter o valor acumulado

function girarRoletaVisual(setorAleatorio) {
  let giros = 5; // Voltas completas
  let setores = 12;
  let anguloSetor = 360 / setores;
  let anguloFinal = (setorAleatorio * anguloSetor) + (giros * 360);

  anguloAtual += anguloFinal;
  roletaEl.style.transform = `rotate(${anguloAtual}deg)`;
}

jogarBtn.addEventListener("click", () => {
  const numeroEscolhido = parseInt(numeroInput.value);
  const corEscolhida = corSelect.value;

  if (isNaN(numeroEscolhido) || numeroEscolhido < 0 || numeroEscolhido > 9) {
    mensagemEl.textContent = "Escolha um número entre 0 e 9.";
    return;
  }

  // Sorteio visual (aleatório entre 0 e 11 para fins visuais)
  const setorAleatorioVisual = Math.floor(Math.random() * 12);
  girarRoletaVisual(setorAleatorioVisual);

  // Sorteio lógico (resultado do jogo)
  setTimeout(() => {
    const numeroSorteado = Math.floor(Math.random() * 10);
    let corSorteada = "";

    if (numeroSorteado >= 5 && numeroSorteado <= 9) corSorteada = "vermelho";
    else if (numeroSorteado >= 0 && numeroSorteado <= 4) corSorteada = "preto";
    if (numeroSorteado === 5) corSorteada = "branco"; // chance rara de branco

    let ganhou = false;
    let premio = 0;

    if (numeroEscolhido === numeroSorteado && corEscolhida === corSorteada) {
      premio = 20;
      mensagemEl.textContent = `🎉 Incrível! Você acertou o número e a cor! +${premio} créditos.`;
      ganhou = true;
    } else if (corEscolhida === corSorteada) {
      premio = 5;
      mensagemEl.textContent = `✅ Você acertou a cor! +${premio} créditos.`;
      ganhou = true;
    } else {
      premio = -5;
      mensagemEl.textContent = `❌ Você errou. -5 créditos.`;
    }

    creditos += premio;
    creditosEl.textContent = creditos;

    resultadoEl.textContent = `Número sorteado: ${numeroSorteado} (${corSorteada.toUpperCase()})`;

    if (creditos <= 0) {
      mensagemEl.textContent = "💀 Você ficou sem créditos. Atualize a página para reiniciar.";
      jogarBtn.disabled = true;
    }
  }, 3000); // Aguarda 3s para a roleta girar
});
