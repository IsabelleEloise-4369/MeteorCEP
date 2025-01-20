// Componente Menu

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const codCep = await fetch('/pages/buscar-cep.html');
        console.log(codCep);

        // Verifica se o arquivo existe no servidor.
        if (!codCep.ok) {

            throw new Error('Arquivo não encontrado no servidor.');
        }
        const cep = await codCep.text();
        document.querySelector('.buscar-cep').innerHTML = cep;
        initMenuMobile();
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
});



// Obter o valor dos campos
const cepInput = document.querySelector('#cep');
const btnPesquisarCEP = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');

// Evento 'keypress' (quando uma tecla é pressionada)
cepInput.addEventListener('keypress', (event) => {

    // Obtém o código ASCII da tecla pressionada
    const keyCode = event.keyCode;

    // Verifica se a tecla pressionada não é um número (código ASCII entre 48 e 57)
    if(keyCode < 48 || keyCode > 57) {
        // Se não for um número, cancela a entrada e exibe uma mensagem para o usuário
        event.preventDefault();
        alert("Digite apenas números");
    }

});

const obterDadosApi = async (cep) =>{

    // Armazenar o endereço de requisiçãi da API
    const urlApi = `https://viacep.com.br/ws/${cep}/json/`;

    // Armazenar a resposta da API e aguardar a construção dos dados
    const response = await fetch(urlApi);

    // Converter os dados para JSON;
    const data = await response.json();

    // Verificar se o CEP é válido.
    if (data.erro) {
        alert("O CEP digitado está inválido.");
        return;
    }
    atribuirCampos(data);

};

btnPesquisarCEP.addEventListener('click', (e) => {

    e.preventDefault();

    if (cepInput.value.length < 8 || cepInput.value.length > 8) {

        // Menos de 8 dígitos, exibe uma mensagem para o usuário
        alert('Por favor, digite um CEP válido com 8 dígitos. ');
        document.querySelector('#cep').value = '';
        return;
    }
    obterDadosApi(cepInput.value);
});

// Atribuir dados de retorno da API para os campos do formulário
const atribuirCampos = (data) => {

    const rua = document.querySelector('#rua');
    const complemento = document.querySelector('#complemento');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;


};

btnLimpar.addEventListener('click', () => {

    document.querySelector('#cep').value = '';
    document.querySelector('#rua').value = '';
    document.querySelector('#complemento').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';

});