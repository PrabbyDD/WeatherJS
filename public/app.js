document.getElementById('weather-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById('weather-result').innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        let result = `<h2>Weather in ${city}</h2>`;
        result += `<p>Temperature: ${data.hourly.temperature_2m[0]}°C</p>`;
        document.getElementById('weather-result').innerHTML = result;
    }
});
