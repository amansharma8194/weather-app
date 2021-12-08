const form = document.getElementById("input");
const search = document.getElementById("search");
const weather = document.getElementById("weather");
const main = document.getElementById("main");
const key = "2c05eadcfc6264dabf91f0d17bc0a0b9";
const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

async function getWeather(location) {
  const resp = await fetch(url(location));
  const respData = await resp.json();

  addWeather(respData);
}
function ktoC(k) {
  return (k - 272.15).toFixed(2);
}
function addWeather(Data) {
  const temp = ktoC(Data.main.feels_like);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
  <h2>
  <img src = "https://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png" />
  ${temp}°C
  <img src = "https://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png" />
  </h2>
  <p>${Data.name}</p>
  <p>${Data.weather[0].description}</p>

  `;
  main.innerHTML = "";
  main.appendChild(weather);
}
form.addEventListener("submit", (e) => {
  const city = search.value;

  e.preventDefault();
  if (city) {
    getWeather(city);
  }
  setTimeout(() => {
    search.value = "";
  }, 1000);
});
