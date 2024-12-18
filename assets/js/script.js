const form = document.querySelector("#form");
const cityInput = document.querySelector("#search");
const historyList = document.querySelector("#history");

let history = JSON.parse(localStorage.getItem('history')) || [];

function fetchCityWeather(query) {
  const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
  const city = encodeURI(query);

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

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

function fetchWeather(query) {
  const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
  const lat = query[0].lat;
  const lon = query[0].lon;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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

function historyListGeneration(){
    historyList.innerHTML = ""

    for(let i = 0; i<history.length;i++){
        const listel = document.createElement('li')
        const buttonel = document.createElement('button'
        )
        buttonel.textContent = history[i]
        historyList.append(listel)
        listel.append(buttonel)
        buttonel.addEventListener('click',()=>{
        fetchCityWeather(history[i])
        })
    }

}

function addToHistory(value){
    console.log(history)
    newHistory = history.filter((city) => city !== value)
    newHistory.unshift(value)
    console.log(newHistory)
    localStorage.setItem("history", JSON.stringify(newHistory));
    history = newHistory
}

function handleSearch(event) {
  event.preventDefault();
  console.log(cityInput.value);
  addToHistory(cityInput.value)
  fetchCityWeather(cityInput.value).then(function (weather) {
    console.log(weather);
    localStorage.setItem("weather", JSON.stringify(weather));
  });
  document.getElementById("search").value = ""
  historyListGeneration()
}

form.addEventListener("submit", handleSearch);

historyListGeneration()

