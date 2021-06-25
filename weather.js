export const loadData = async (city, date) => {
    try {
        const woeid = await getWoeid(city);
        console.log(woeid);
        const weatherInfo = await getWeatherInfo(woeid, date);
        console.log(weatherInfo);
        return weatherInfo;
    } catch (e) {
        console.error('Error loading weather data', e);
        throw e;
    }
}

const getWoeid = async (city) => {
    const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
    if (response.status !== 200) {
        throw  'Error loading WOEID';
    }
    const jsonResponse = await response.json();
    return jsonResponse[0].woeid;
}

const getWeatherInfo = async (woeid, date) => {
    const dateStringParts = date.split('-');
    const response = await fetch(`https://www.metaweather.com/api/location/${woeid}/${dateStringParts[0]}/${dateStringParts[1]}/${dateStringParts[2]}/`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();
    return jsonResponse;
}