export const addCard = (city, date, weatherData) => {
    const container = document.getElementById('cards-container');
    const weatherState = weatherData[0].weather_state_abbr;
    const minTemp = Math.round(weatherData[0].max_temp);
    const maxTemp = Math.round(weatherData[0].min_temp);
    container.insertAdjacentHTML('afterbegin', `
        <zizi-card title="${city} - ${date}">
            <div class="card-content">
                <div>${minTemp}°C</div>
                <div>
                    <img height="200" src=https://www.metaweather.com/static/img/weather/${weatherState}.svg>
                </div>
                <div>${maxTemp}°C</div>
            </div>
        </zizi-card>
    `)
}