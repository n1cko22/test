const api = "16b76a4bf5553901df564275e8be0a21";
const apiLink = "https://api.openweathermap.org/data/2.5";
//const city = 'Kiev';
//const scale = 'metric';
//const days = 7;
const get = url => {
    return fetch(`${apiLink}${url}&APPID=${api}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });

};
const getTodayForecast = query => get(`/weather${query}`);
const getWeekForecast = query => get(`/forecast${query}`);

export const getForecast = city =>
    Promise.all([getTodayForecast(`?q=${city}`), getWeekForecast(`?q=${city}`)]);