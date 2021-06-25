let id = 0;

export const addCard = (city, date, weatherData) => {
    const container = document.getElementById('cards-container');
    // const weatherState = weatherData[0].weather_state_abbr;
    const minTemp = Math.round(weatherData.max_temp);
    const maxTemp = Math.round(weatherData.min_temp);
    container.insertAdjacentHTML('afterbegin', `
        <zizi-card title="${city} - ${date}" id="card${id}">
            <div class="card-content">
                <div>${minTemp}°C</div>
                <div>${maxTemp}°C</div>
            </div>
            <div><button id="button${id}">Törlés</button></div>
        </zizi-card>
    `)
    const currentId = id;
    document.getElementById(`button${id}`).addEventListener('click', () => {
        container.removeChild(document.getElementById(`card${currentId}`));
    });
    id++;
}
