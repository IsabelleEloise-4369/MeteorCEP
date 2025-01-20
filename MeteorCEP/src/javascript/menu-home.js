// Componente Menu

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const codMenu = await fetch('/pages/menu-home.html');
        console.log(codMenu);

        // Verifica se o arquivo existe no servidor.
        if (!codMenu.ok) {

            throw new Error('Arquivo não encontrado no servidor.');
        }
        const menu = await codMenu.text();
        document.querySelector('.container-menu').innerHTML = menu;
        initMenuMobile();
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
});


// Função para inicializar os eventos do menu mobile
const initMenuMobile = () => {

    const  btnMobile = document.querySelector('#btn-mobile');
    if (!btnMobile) {
        console.error('#btn-mobile não encontrado');
        return;
    }
    const toggleMenu = (event) => {
        // BL 01
        if (event.type === 'touchstart') event.preventDefault();
    
        // Adicionar a classe acttive, caso não tenha.
        // Remover a classe acttive, caso tenha
        // BL 02
        const nav = document.getElementById('nav'); 
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');

        // BL 03
        event.currentTarget.setAttribute('aria-expanded', active);
        if(active){
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        }else{
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    
        }
    }
    
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}





/* Suponha que menu.html não exista no servidor ou o servidor retorna um código de erro, 
como 404 (Not Found). Nesse caso, a propriedade codMenu.ok será false,
 e o código throw new Error('Erro na resposta da rede'); será executado. */


/*
 Bloco 1: Verificação do Tipo de Evento e Prevenção

Verifica se o evento é do tipo 'touchstart' e, se for, previne o comportamento padrão do evento para evitar interações indesejadas em dispositivos móveis.

Bloco 2: Manipulação do Menu

Obtém o elemento HTML com o ID 'nav' e o armazena na variável 'nav'.
Altera a classe 'active' no elemento 'nav'. Se a classe estiver presente, ela será removida; caso contrário, será adicionada.
Verifica se a classe 'active' está presente no elemento 'nav' após a alteração anterior e armazena o resultado em uma variável chamada 'active'.

Bloco 3: Acessibilidade

Define o atributo 'aria-expanded' no elemento que acionou o evento (o botão mobile) com o valor da variável 'active'. 
Isso é usado para informar aos leitores de tela se o menu está expandido ou não.
Verifica se a classe 'active' está presente no elemento 'nav'. Se estiver presente, define o atributo 'aria-label' 
do elemento que acionou o evento como 'Fechar Menu'; caso contrário, define como 'Abrir Menu'. Isso é usado para fornecer uma descrição 
textual da ação do botão para usuários de leitores de tela.
*/


