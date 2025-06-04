
let creditos = 100;
const creditosEl = document.getElementById('creditos');
const mensagemEl = document.getElementById('mensagem');

function atualizarCreditos() {
  creditosEl.textContent = creditos;
}

function ganharCreditos() {
  creditos += 10;
  atualizarCreditos();
  mensagemEl.textContent = 'Você ganhou 10 créditos assistindo uma propaganda!';
}

function participarRifa() {
  const numeroEscolhido = parseInt(document.getElementById('numero').value);

  if (isNaN(numeroEscolhido) || numeroEscolhido < 1 || numeroEscolhido > 100) {
    mensagemEl.textContent = 'Escolha um número entre 1 e 100!';
    return;
  }

  if (creditos < 10) {
    mensagemEl.textContent = 'Créditos insuficientes para participar!';
    return;
  }

  creditos -= 10;
  atualizarCreditos();

  const numeroSorteado = Math.floor(Math.random() * 100) + 1;

  if (numeroEscolhido === numeroSorteado) {
    creditos += 100;
    atualizarCreditos();
    mensagemEl.textContent = `🎉 Parabéns! Você acertou o número sorteado (${numeroSorteado}) e ganhou 100 créditos!`;
  } else {
    mensagemEl.textContent = `Infelizmente você não ganhou. O número sorteado foi ${numeroSorteado}.`; 
  }
}

// Inicialização
atualizarCreditos();
