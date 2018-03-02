const host = document.getElementById('today-forecast-container');

const render = city => {
    host.innerHTML = `
    <h3>Weather today</h3>
    <h2>${city.name}</h2>
    <p>Temp: ${city.main.temp} K</p>
    <p>Humidity: ${city.main.humidity}</p>
    <p>Pressure: ${city.main.pressure}</p>
  `;
};

export default render;