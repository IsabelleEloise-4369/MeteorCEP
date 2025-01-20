// Chaves - As chaves no JSON devem vir entre aspas duplas. No Objeto Literal, as chaves podem ser strings com aspas simples

document.querySelector('.form-search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    // Verificação se o campo do formulário está vazio.
    if(!cityName){

        document.querySelector('.weather').classList.remove('show');
        document.querySelector('.alert').classList.add('show');

        escreverCodigo(`

            <h3>Campo vazio, digite uma cidade. </h3>
            <img src="/src/images/campo-vazio.svg"/>
        `);
        return
    }

    // Obter dados da API com uma função assíncrona (métodos: fetch --> async --> await)
    // Armazenar a chave da API 
    const apiKey = '13da021e1e2b473e7d0bbce3d8d0c997';

    // Encode URI --> Codificar os caracteres especiais
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const resultado = await fetch(apiUrl);
    const dadosApi = await resultado.json();
    // Verificar o retorno da api
    if (dadosApi.cod === 200) {
      
       
        // Extrair dados da API em um novo objeto
        mostrarDados(
            {
                city: dadosApi.name,
                country: dadosApi.sys.country,
                temp: dadosApi.main.temp,
                tempMax: dadosApi.main.temp_max,
                tempMin: dadosApi.main.temp_min,
                description: dadosApi.weather[0].icon,
                tempIcon: dadosApi.weather[0].icon,
                windSpeed: dadosApi.wind.speed,
                humidity: dadosApi.main.humidity,
            }
        )
    }else {
        document.querySelector('.weather').classList.remove('show');
        document.querySelector('.alert').classList.add('show');

        escreverCodigo(`
        <h3>Cidade não cadastrada ou erro de digitação.</h3>
        <img src="/src/images/404.svg"> 
        `)
    }
});


function mostrarDados(dadosApi){

    // Remover o alerta da interface 
    document.querySelector('.alert').classList.remove('show');

    document.querySelector('.weather').classList.add('show');


    // Exibir os dados do objeto retornado
    document.querySelector('.title').innerHTML = `${dadosApi.city}, ${dadosApi.country}`;

    document.querySelector('.temp_value').innerHTML = `${dadosApi.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('.temp_description').innerHTML = `${dadosApi.description}`;

    document.querySelector('.temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${dadosApi.tempIcon}@2x.png`);

    document.querySelector('.temp_max').innerHTML = `${dadosApi.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('.temp_min').innerHTML = `${dadosApi.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`; 

    document.querySelector('.humidity').innerHTML = `${dadosApi.humidity}%`;

    document.querySelector('.wind').innerHTML = `${dadosApi.windSpeed.toFixed(1)}km/h`;
}


// Função para escrever os dados na DIV alert
function escreverCodigo(msg){
    document.querySelector('.alert').innerHTML = msg;
}

// Jeito de fazer com uma função anônima

/* const escreverCodigo2 = (msg2) => {

}   */