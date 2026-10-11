// Weather widget. A browser-delivered API key is public; keep it empty by default.
const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.weatherValue p');
const descElement = document.querySelector('.weatherDescription p');
const weather = { temperature: { unit: 'celsius' } };
const tempUnit = CONFIG.weatherUnit;
const KELVIN = 273.15;
const key = String(CONFIG.weatherKey || '').trim();

function setPosition() {
  if (!CONFIG.trackLocation || !navigator.geolocation) {
    getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => getWeather(position.coords.latitude.toFixed(3), position.coords.longitude.toFixed(3)),
    () => getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude),
    { timeout: 8000 }
  );
}

async function getWeather(latitude, longitude) {
  if (!key) {
    descElement.textContent = 'Meteorologia não configurada';
    return;
  }
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    lang: CONFIG.language,
    appid: key,
  });
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
    if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
    const data = await response.json();
    if (!data.main || !data.weather?.[0]) throw new Error('Weather response was incomplete');
    const celsius = Math.floor(data.main.temp - KELVIN);
    weather.temperature.value = tempUnit === 'C' ? celsius : (celsius * 9) / 5 + 32;
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    displayWeather();
  } catch (error) {
    descElement.textContent = 'Meteorologia indisponível';
    console.error('[weather] Não foi possível obter a meteorologia.', error);
  }
}

function displayWeather() {
  const image = document.createElement('img');
  image.src = `assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png`;
  image.alt = weather.description;
  iconElement.replaceChildren(image);
  tempElement.textContent = `${weather.temperature.value.toFixed(0)}°${tempUnit}`;
  descElement.textContent = weather.description;
}

setPosition();
