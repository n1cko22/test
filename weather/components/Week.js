const host = document.getElementById('week-forecast-container');

const render = cities => {
    const items = cities
        .map(city => {
            return `
        <li>
          <h3>${new Date(city.dt)}</h3>
          <p>Temp: ${city.main.temp} K</p>
          <p>Humidity: ${city.main.humidity}</p>
          <p>Pressure: ${city.main.pressure}</p>
        </li>
    `;
        })
        .join('');

    host.innerHTML = `
    <div class='week-forecast'>
      <h3>Week forecast</h3>
      <ul>${items}</ul>
    </div>`;
};

export default render;