import { addCard } from "./cards";
import { loadData } from "./weather";

export const initForm = () => {
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit');
    const datePicker = document.getElementById('date-input');
    // Minimum dátum: mai nap
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const cardsContainer = document.getElementById('cards-container');
    datePicker.min = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    // Maximum dátum: mai nap + 6 nap
    const maxDate = now;
    maxDate.setDate(now.getDate() + 6); // Itt adunk hozzá 6 napot a mai naphoz
    const maxDateYear = maxDate.getFullYear();
    const maxDateMonth = maxDate.getMonth() + 1;
    const maxDateDay = maxDate.getDate();
    datePicker.max = `${maxDateYear}-${maxDateMonth < 10 ? `0${maxDateMonth}` : maxDateMonth}-${maxDateDay < 10 ? `0${maxDateDay}` : maxDateDay}`;
    form.addEventListener('submit', async e => {
        const city = document.getElementById('city-input').value;
        const date = document.getElementById('date-input').value;
        console.log(city, date);
        e.preventDefault();
        submitButton.disabled = true;
        cardsContainer.insertAdjacentHTML('afterbegin', `<div id="loading-indicator" class="loader"></div>`);
        try {
            const weatherData = await loadData(city, date);
            addCard(city, date, weatherData)
            form.reset();
        } catch {
            errorMessage.style.display = 'block';
            setTimeout(() => errorMessage.style.display = 'none', 2000);
        }
        submitButton.disabled = false;
        cardsContainer.removeChild(document.getElementById('loading-indicator'));
    });
}