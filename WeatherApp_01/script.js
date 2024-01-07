// Use Your Api key
// const API_KEY = "your Api Key"

const API_KEY = process.env.REACT_APP_API_KEY;

const API_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search Button");
const weatherIconn = document.querySelector(".weather-icon");

async function cheackWeather(city) {
  const response = await fetch(API_URL + city);
  let data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Mist") {
      weatherIconn.src = "images/mist.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIconn.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIconn.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIconn.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIconn.src = "images/mist.png";
    }

    document.querySelector(".error").style.display = "none";

    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  cheackWeather(searchBox.value);
});
