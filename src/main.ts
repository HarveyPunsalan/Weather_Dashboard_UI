interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
}

interface WeatherCity {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  windDeg: number;
  forecast: ForecastDay[];
}

const weatherData: WeatherCity[] = [
  {
    city: "Manila",
    temp: 32,
    condition: "Sunny",
    humidity: 78,
    wind: 14,
    windDeg: 90,
    forecast: [
      { day: "Monday", high: 33, low: 26, condition: "Sunny" },
      { day: "Tuesday", high: 31, low: 25, condition: "Cloudy" },
      { day: "Wednesday", high: 29, low: 24, condition: "Rainy" },
      { day: "Thursday", high: 30, low: 25, condition: "Cloudy" },
      { day: "Friday", high: 32, low: 26, condition: "Sunny" },
      { day: "Saturday", high: 33, low: 27, condition: "Sunny" },
    ],
  },
  {
    city: "Tokyo",
    temp: 22,
    condition: "Cloudy",
    humidity: 60,
    wind: 20,
    windDeg: 180,
    forecast: [
      { day: "Monday", high: 23, low: 16, condition: "Cloudy" },
      { day: "Tuesday", high: 21, low: 15, condition: "Rainy" },
      { day: "Wednesday", high: 20, low: 14, condition: "Rainy" },
      { day: "Thursday", high: 22, low: 15, condition: "Cloudy" },
      { day: "Friday", high: 24, low: 17, condition: "Sunny" },
      { day: "Saturday", high: 25, low: 18, condition: "Sunny" },
    ],
  },
  {
    city: "New York",
    temp: 18,
    condition: "Windy",
    humidity: 55,
    wind: 30,
    windDeg: 270,
    forecast: [
      { day: "Monday", high: 19, low: 12, condition: "Windy" },
      { day: "Tuesday", high: 17, low: 11, condition: "Cloudy" },
      { day: "Wednesday", high: 16, low: 10, condition: "Rainy" },
      { day: "Thursday", high: 18, low: 12, condition: "Cloudy" },
      { day: "Friday", high: 20, low: 13, condition: "Sunny" },
      { day: "Saturday", high: 21, low: 14, condition: "Sunny" },
    ],
  },
  {
    city: "London",
    temp: 14,
    condition: "Rainy",
    humidity: 82,
    wind: 18,
    windDeg: 45,
    forecast: [
      { day: "Monday", high: 15, low: 9, condition: "Rainy" },
      { day: "Tuesday", high: 14, low: 8, condition: "Rainy" },
      { day: "Wednesday", high: 13, low: 7, condition: "Cloudy" },
      { day: "Thursday", high: 15, low: 9, condition: "Cloudy" },
      { day: "Friday", high: 16, low: 10, condition: "Sunny" },
      { day: "Saturday", high: 17, low: 11, condition: "Sunny" },
    ],
  },
  {
    city: "Sydney",
    temp: 26,
    condition: "Sunny",
    humidity: 65,
    wind: 22,
    windDeg: 135,
    forecast: [
      { day: "Monday", high: 27, low: 19, condition: "Sunny" },
      { day: "Tuesday", high: 26, low: 18, condition: "Sunny" },
      { day: "Wednesday", high: 25, low: 17, condition: "Cloudy" },
      { day: "Thursday", high: 24, low: 17, condition: "Cloudy" },
      { day: "Friday", high: 26, low: 18, condition: "Sunny" },
      { day: "Saturday", high: 28, low: 20, condition: "Sunny" },
    ],
  },
  {
    city: "Dubai",
    temp: 40,
    condition: "Sunny",
    humidity: 30,
    wind: 10,
    windDeg: 315,
    forecast: [
      { day: "Monday", high: 41, low: 32, condition: "Sunny" },
      { day: "Tuesday", high: 40, low: 31, condition: "Sunny" },
      { day: "Wednesday", high: 39, low: 30, condition: "Sunny" },
      { day: "Thursday", high: 41, low: 32, condition: "Sunny" },
      { day: "Friday", high: 42, low: 33, condition: "Sunny" },
      { day: "Saturday", high: 43, low: 34, condition: "Sunny" },
    ],
  },
];

const cardsContainer = document.getElementById("cards-container") as HTMLElement;
const citySearch = document.getElementById("city-search") as HTMLInputElement;
const forecastTitle = document.getElementById("forecast-title") as HTMLElement;
const forecastBody = document.getElementById("forecast-body") as HTMLElement;
const windArrow = document.getElementById("wind-arrow") as HTMLElement;
const themeToggle = document.getElementById("theme-toggle") as HTMLButtonElement;
const clock = document.getElementById("clock") as HTMLElement;

function renderCard(city: WeatherCity, unit: string = "°C"): HTMLDivElement {
  const { city: cityName, temp, condition, humidity, wind } = city;

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-city", cityName);

  card.innerHTML = `
    <h3 class="city-name">${cityName}</h3>
    <p class="temperature">${temp}${unit}</p>
    <p class="condition">${condition}</p>
    <p class="humidity">Humidity: ${humidity}%</p>
    <p class="wind">Wind: ${wind} km/h</p>
  `;

  card.addEventListener("click", (): void => {
    const allDivs = document.getElementsByTagName("div");

    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].classList.remove("active");
    }

    card.classList.add("active");

    const found = findCity(cityName);

    if (found !== undefined) {
      renderForecast(found);
    }
  });

  return card;
}

function renderAllCards(data: WeatherCity[]): void {
  cardsContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const card = renderCard(data[i]);
    cardsContainer.appendChild(card);
  }
}

renderAllCards(weatherData);

function findCity(name: string): WeatherCity | undefined {
  let result: WeatherCity | undefined = undefined;

  for (let i = 0; i < weatherData.length; i++) {
    if (weatherData[i].city === name) {
      result = weatherData[i];
      break;
    }
  }

  return result;
}

function renderForecast(city: WeatherCity): void {
  forecastTitle.innerText = `Weekly Forecast — ${city.city}`;
  forecastBody.innerHTML = "";

  const { forecast, windDeg } = city;

  for (let i = 0; i < forecast.length; i++) {
    const row = document.createElement("tr");

    if (i % 3 === 0) {
      const weekCell = document.createElement("td");
      weekCell.setAttribute("rowspan", "3");
      weekCell.textContent = i === 0 ? "Week 1" : "Week 2";
      row.appendChild(weekCell);
    }

    const dayCell = document.createElement("td");
    dayCell.textContent = forecast[i].day;

    const highCell = document.createElement("td");
    highCell.textContent = `${forecast[i].high}°C`;

    const lowCell = document.createElement("td");
    lowCell.textContent = `${forecast[i].low}°C`;

    const conditionCell = document.createElement("td");
    conditionCell.textContent = forecast[i].condition;

    row.appendChild(dayCell);
    row.appendChild(highCell);
    row.appendChild(lowCell);
    row.appendChild(conditionCell);

    forecastBody.appendChild(row);
  }

  windArrow.style.transform = `rotate(${windDeg}deg)`;

  const firstRow = forecastBody.querySelector("tr") as Element | null;

  if (firstRow !== null && firstRow.nextElementSibling !== null) {
    (firstRow.nextElementSibling as HTMLElement).classList.add("highlight-row");
  }
}

function updateClock(): void {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

themeToggle.addEventListener("click", (): void => {
  document.body.classList.toggle("light-mode");

  const bodyChildren = document.body.children;
  for (let i = 0; i < bodyChildren.length; i++) {
    console.log(bodyChildren[i].tagName);
  }

  if (document.body.classList.contains("light-mode")) {
    themeToggle.innerText = "Dark Mode";
  } else {
    themeToggle.innerText = "Light Mode";
  }
});

citySearch.addEventListener("input", (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const query = target.value.toLowerCase();

  const filteredData = weatherData.slice(0, weatherData.length).filter((city) => {
    return city.city.toLowerCase().includes(query);
  });

  renderAllCards(filteredData);
});

function getTopCities(n: number): WeatherCity[] {
  const top = weatherData.slice(0, n);
  top.pop();
  return top;
}

console.log(getTopCities(4));