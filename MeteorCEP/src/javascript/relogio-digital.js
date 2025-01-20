// Componente Relógio

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const codHra = await fetch('/pages/relogio-digital.html');
        console.log(codHra);

        // Verifica se o arquivo existe no servidor.
        if (!codHra.ok) {

            throw new Error('Arquivo não encontrado no servidor.');
        }
        const relogio = await codHra.text();
        document.querySelector('.container-relogio').innerHTML = relogio;
        initMenuMobile();
    } catch (error) {
        console.error('Erro ao carregar o Relógio:', error);
    }
});


const updateClock = () => {

    const now = new Date();

     /* Formatar as horas, minutos e segundos para terem semppre dois dígitos 
    usando o método padStart para completar com zeros á esquerda caso necessário */

    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now. getSeconds()).padStart(2,'0');
    document.querySelector(`.container__time`).textContent = `${hours}:${minutes}:${seconds}`;

    const greetingText = document.querySelector('.container__morning');

    if (hours < 12) {
        greetingText.textContent = 'Bom dia!'
    }else if (hours < 18){
        greetingText.textContent = 'Boa tarde!'
    } else {
        greetingText.textContent = 'Boa Noite!'
    }

}

const updateDate = () => {

    const now = new Date();

    /* Recupera a data atual, formata-a de acordo com a localidade pt-BR 
    (dia da semana extenso, ano numérico, mês extenso e dia numérico) */

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);
    document.querySelector('.container__date').textContent = formattedDate;

}

const initDateClock = () => {

    updateClock(); updateDate(); setInterval(updateClock, 1000);

}

/*  Está funcção é chamada quando a página termina de carregar
(evento DOMContentLoaded) */

document.addEventListener('DOMContentLoaded', initDateClock);