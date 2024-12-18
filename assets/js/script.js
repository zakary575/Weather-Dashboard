const form = document.querySelector("#form");
const cityInput = document.querySelector("#search");


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
      fetchWeather(data);
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
      return dataS || [];
    })
    .catch(function (error) {
      return [];
    });
}


function handleSearch(event){
event.preventDefault()
console.log(cityInput.value)
fetchCityWeather(cityInput.value)
}

form.addEventListener('submit',handleSearch);


