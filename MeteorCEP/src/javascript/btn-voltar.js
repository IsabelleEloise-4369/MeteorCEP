// Função para configurar o botão de voltar
function configurarBotaoVoltar() {
    const btnVoltar = document.querySelector('#btnVoltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            window.location.href= '../index.html';
        });
    }
}

// Chamar a função quando o conteúdo do DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', configurarBotaoVoltar);