export const loadData = async (city, date) => {
    try {
        const coordinates = await getCoordinates(city);
        const weatherInfo = await getWeatherInfo(coordinates, date);
        return weatherInfo;
    } catch (e) {
        console.error('Error loading weather data', e);
        throw e;
    }
}

const getCoordinates = (city) => {
    const geocoding = {
        'Berlin': {lat: 52.5235, lon: 13.4115},
        'Budapest': {lat: 47.4984, lon: 19.0408},
        'London': {lat: 51.5002, lon: -0.1262}
    };

    return new Promise((resolve, reject) => {
        const result = geocoding[city];
        if (result) {
            resolve(result);
        } else {
            reject(new Error('Error occured during geocoding'));
        }
    })
}

const getWeatherInfo = async (coordiantes, date) => {
    // Dokumentáció: https://open-meteo.com/en/docs
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordiantes.lat}&longitude=${coordiantes.lon}&daily=apparent_temperature_max,apparent_temperature_min&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();

    // Megkeressük, hogy melyik dátumra keres a felhasználó
    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);
    console.log(dateIndex);
    // A megadott dátumhoz tartozó min és max hőmérsékletet visszaadjuk
    const result = {min_temp: jsonResponse.daily.apparent_temperature_min[dateIndex], max_temp: jsonResponse.daily.apparent_temperature_max[dateIndex]}
    return result;
}