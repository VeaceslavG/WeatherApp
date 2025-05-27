const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "60cfc7bafbb3655030e55209fb9d4a94";

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

// Returns weather data for a given city as a JSON object
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data. Please check the city name.");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Displaying city name
  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");
  card.appendChild(cityDisplay);

  // Displaying temperature
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(tempDisplay);

  // Displaying humidity
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");
  card.appendChild(humidityDisplay);

  // Displaying weather description
  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  // Displaying weather emoji
  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch(true) {
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️"; // Thunderstorm
    case (weatherId >= 300 && weatherId < 400):
      return "🌧️"; // Drizzle
    case (weatherId >= 500 && weatherId < 600):
      return "🌧️"; // Rain
    case (weatherId >= 600 && weatherId < 700):
      return "❄️"; // Snow
    case (weatherId >= 700 && weatherId < 800):
      return "🌫️"; // Atmosphere
    case (weatherId === 800):
      return "☀️"; // Clear
    case (weatherId > 800 && weatherId < 810):
      return "🌤️"; // Clouds
    default:
      return "❓"; // Unknown weather
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "block";
  card.appendChild(errorDisplay);
}