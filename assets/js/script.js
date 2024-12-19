const form = document.querySelector("#form");
const cityInput = document.querySelector("#search");
const historyList = document.querySelector("#history");
const today = document.querySelector("#today");
const forecast = document.querySelector("#forecast");

let history = JSON.parse(localStorage.getItem("history")) || [];

// function that fetchs a citys longitude and latitude given the city name
function fetchCityWeather(query) {
  const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
  const city = encodeURI(query);

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      return fetchWeather(data);
    })
    .catch(function (error) {
      return [];
    });
}

// function that fetchs the weather given longitude and latitude
function fetchWeather(query) {
  const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
  const lat = query[0].lat;
  const lon = query[0].lon;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data || [];
    })
    .catch(function (error) {
      return [];
    });
}

// function that generates the history list buttons
function historyListGeneration() {
  historyList.innerHTML = "";

  for (let i = 0; i < history.length; i++) {
    const listel = document.createElement("li");
    const buttonel = document.createElement("button");
    buttonel.textContent = history[i];
    historyList.append(listel);
    listel.append(buttonel);
    buttonel.addEventListener("click", () => {
      cityInput.value = history[i];
      search();
    });
  }
}

// function that takes the data from the fetch and renders todays weather
function renderWeather(data) {
  today.innerHTML = "";
  let weatherEmoji = "";

  const resultsBody = document.createElement("div");
  today.append(resultsBody);

  switch (data.list[0].weather[0].main) {
    case "Clouds":
      weatherEmoji = "☁️";
      break;
    case "Rain":
      weatherEmoji = "🌧️";
      break;
    case "Clear":
      weatherEmoji = "☀️";
      break;
    case "Snow":
      weatherEmoji = "❄️";
      break;
  }

  const dateEl = document.createElement("h1");
  dateEl.textContent = `${data.city.name} ${
    data.list[0].dt_txt.split(" ")[0]
  }  ${weatherEmoji}`;

  const tempEl = document.createElement("p");
  tempEl.textContent = `Temperature: ${Math.round(data.list[0].main.temp)}°F`;

  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speed:  ${data.list[0].wind.speed} mph`;

  const humEl = document.createElement("p");
  humEl.textContent = `Humidity: ${data.list[0].main.humidity} %`;

  resultsBody.append(dateEl, tempEl, windEl, humEl);
}

// function that takes the data from the fetch and renders the forecast
function renderForecast(data) {
  forecast.innerHTML = "";
  let weatherEmoji = "";

  for (let i = 1; i < 5; i++) {
    const forecastBody = document.createElement("div");
    forecast.append(forecastBody);

    switch (data.list[8 * i].weather[0].main) {
      case "Clouds":
        weatherEmoji = "☁️";
        break;
      case "Rain":
        weatherEmoji = "🌧️";
        break;
      case "Clear":
        weatherEmoji = "☀️";
        break;
      case "Snow":
        weatherEmoji = "❄️";
        break;
    }

    const dateEl = document.createElement("h1");
    dateEl.textContent = `${
      data.list[8 * i].dt_txt.split(" ")[0]
    }  ${weatherEmoji}`;

    const tempEl = document.createElement("p");
    tempEl.textContent = `Temperature: ${Math.round(
      data.list[8 * i].main.temp
    )}°F`;

    const windEl = document.createElement("p");
    windEl.textContent = `Wind Speed:  ${data.list[8 * i].wind.speed} mph`;

    const humEl = document.createElement("p");
    humEl.textContent = `Humidity: ${data.list[8 * i].main.humidity} %`;

    forecastBody.append(dateEl, tempEl, windEl, humEl);
  }
}

// function that will take the input and capitalize the first letter and lowercase the rest
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// function that adds to the search to the history in local storage
function addToHistory(value) {
  console.log(history);
  newHistory = history.filter((city) => city !== value);
  newHistory.unshift(value);
  console.log(newHistory);
  localStorage.setItem("history", JSON.stringify(newHistory));
  history = newHistory;
}

// function takes the input and puts it into the fetch
function search() {
  const city = capitalizeFirstLetter(cityInput.value);
  console.log(city);
  addToHistory(city);
  fetchCityWeather(city).then(function (weather) {
    console.log(weather);
    renderWeather(weather);
    renderForecast(weather);
    localStorage.setItem("weather", JSON.stringify(weather));
  });
  document.getElementById("search").value = "";
  historyListGeneration();
}

// search event handler for when the input is sumbmited
function handleSearch(event) {
  event.preventDefault();
  search();
}

form.addEventListener("submit", handleSearch);

// calls history list gerneration so that it will be on the page when it is loaded
historyListGeneration();
