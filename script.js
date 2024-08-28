const current = document.querySelector('.current')
const forecast = document.querySelector('.forecast');
const city = document.querySelector('.city');
const icon = document.querySelector('.icon');
const weather = document.querySelector('.weather');
const temp = document.querySelector('.temp');
const speed = document.querySelector('.speed');


function getTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2,  '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const renderCurrent = (data) => {
    let cityName = data.city.name;
    let weatherInfo = data.list[0].weather[0].main; 
    let temperature = Math.round(data.list[0].main.temp);
    let windSpeed = data.list[0].wind.speed;
    let iconSrc = data.list[0].weather[0].icon;
    let now = getTime();


    const template = `
    <p class="city">${cityName}</p>
    <p class="time">${now}</p>
    <div class="wrapper">
        <img src="https://openweathermap.org/img/wn/${iconSrc}@2x.png" alt="">
        <p class="weather">${weatherInfo}</p>
        <p class="temp">${temperature}C°</p>
    </div>
    <div class="flex-wrap">
        <p class="text">Speed</p>
        <p class="speed">${windSpeed}m/s</p>
    </div>
    `;
    current.innerHTML = template;
};

const renderForecast = (url, date, temp) => {
        const downTemplate = ` 
        <div class="row">
            <div class="date">
                <p>${date}</p>
            </div>
            <img class="icon" src="https://openweathermap.org/img/wn/${url}@2x.png" alt="">
            <p class="temperature">${temp}C°</p>
        </div>
        `;

        forecast.innerHTML += downTemplate;
};

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&units=metric&appid=a94d0a5ac08570add4b47b8da933f247')
.then((response) =>  response.json())
.then((data) => {
    console.log(data);
    renderCurrent(data);
    for(let i = 0; i < data.list.length; i += 8){
        renderForecast(
            data.list[i].weather[0].icon,
            data.list[i].dt_txt,
            Math.round(data.list[i].main.temp)
        );
    }
});
