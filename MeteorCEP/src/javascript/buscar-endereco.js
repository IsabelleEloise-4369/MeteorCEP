// Componente Menu

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const codEnd = await fetch('/pages/buscar-endereco.html');
        console.log(codEnd);

        // Verifica se o arquivo existe no servidor.
        if (!codEnd.ok) {

            throw new Error('Arquivo não encontrado no servidor.');
        }
        const endereco = await codEnd.text();
        document.querySelector('.buscar-endereco').innerHTML = endereco;
        initMenuMobile();
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
});


// Obter os elementos do formulário
const endeInput = document.querySelector('#logradouro');
const estadoInput = document.querySelector('#estado');
const cityInput = document.querySelector('#city');
const btnPesquisarEnd = document.querySelector('#btnPesquisar');
const btnLimpar = document.querySelector('#btnLimpar');


// Event listener para o botão de pesquisa
btnPesquisarEnd.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        await obterDadosApi(estadoInput.value, cityInput.value,endeInput.value);
    } catch (error) {
        alert("Ocorreu um erro ao buscar o endereço. Por favor, tente novamente mais tarde.");
        console.error(error);
    }
});


const obterDadosApi = async (estado, cidade, logradouro) => {
    const urlApi = `https://viacep.com.br/ws/${estadoInput.value}/${cityInput.value}/${endeInput.value}/json`;
    const response = await fetch(urlApi);

    if (!response.ok) {
        throw new Error('Erro ao buscar o endereço.');
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error('Endereço não encontrado.');
    }

    atribuirCampos(data);
};


const atribuirCampos = (data) => {

    data.forEach(endereco => {
        const resul = document.querySelector('.resul')

        const enderecoDiv = document.createElement('div');
        enderecoDiv.classList.add('endereco');

        enderecoDiv.innerHTML = `
        <p>CEP:${endereco.cep} </p>
        <p>Bairro: ${endereco.bairro} </p>
        <p>Logradouro: ${endereco.logradouro} </p>
        <p>Cidade: ${endereco.localidade}</p>
        <p>Estado: ${endereco.uf}</p>
        <p>--------------------------------------</p>

        `
        resul.appendChild(enderecoDiv);
  
    });

};



// Event listener para o botão de limpar campos
btnLimpar.addEventListener('click', () => {
    document.querySelector('#logradouro').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#estado').value = '';
    document.querySelector('.resul').innerHTML ='';
});