
function fetchCityCoords(query) {
    const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
    const city = encodeURI(query)

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          return [];
        }
        return response.json();
      })
      .then(function (data) {
        return data.items || [];
      })
      .catch(function (error) {
        return [];
      });
    }










function fetchWeather(query) {
    const apiKey = "6b72207fdbe6c16dfd1499cbda3aa797";
    // const lat = ;
    // const lon = ;

    const url = `api.openweathermap.org/data/2.5/forecast?'lat=${lat}&lon=${lon}&appid=${apiKey}`;

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          return [];
        }
        return response.json();
      })
      .then(function (data) {
        return data.items || [];
      })
      .catch(function (error) {
        return [];
      });
    }


    console.log(fetchCityCoords('nashville'))