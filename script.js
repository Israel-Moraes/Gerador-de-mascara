document.getElementById('maskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const arcos = document.getElementById('arcos').value;
  const abr = document.getElementById('abr').value;
  const horario = document.getElementById('horario').value;
  const operadora = document.getElementById('operadora').value;
  const sistema = document.getElementById('sistema').value;
  const tipoFalha = document.getElementById('tipoFalha').value;
  const trecho = document.getElementById('trecho').value;
  const curvas = document.getElementById('curvas').value;
  const observacao = document.getElementById('observacao').value;

  let falhaMensagem;

  if (tipoFalha === 'atenuacao') {
    falhaMensagem = 'atenuado';
  } else if (tipoFalha === 'interrupcao') {
    falhaMensagem = 'rompido';
  } else {
    falhaMensagem = ''; // Lidando com outras opções, se necessário
  }

  let mask = `Arcos: ${arcos}\nABR: ${abr}\nHorário da Falha: ${horario}\nOperadora ${operadora} informa swap de fibra ${falhaMensagem} entre: ${trecho}\nSistema: ${sistema}\nTipo de Falha: ${tipoFalha}`;

  if (curvas === 'sim') {
    mask += '\nCurvas anexadas no registro de curvas';
    if (observacao.trim() !== '') {
      mask += `\nObservação: ${observacao}`;
    }
  }

  const output = document.getElementById('output');
  output.innerText = mask;

  const range = document.createRange();
  range.selectNode(output);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  alert('Máscara gerada e copiada para a área de transferência.');
});

document.getElementById('curvas').addEventListener('change', function() {
  const observacaoDiv = document.getElementById('observacaoDiv');
  if (this.value === 'sim') {
    observacaoDiv.style.display = 'block';
  } else {
    observacaoDiv.style.display = 'none';
  }
});

document.getElementById('clearButton').addEventListener('click', function() {
  document.getElementById('maskForm').reset();
  document.getElementById('output').innerText = '';
  document.getElementById('observacaoDiv').style.display = 'none';
});
