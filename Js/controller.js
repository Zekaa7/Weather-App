const container = document.querySelector(`.container`);
const search = document.querySelector(".search-box button");
const apiKey = `3ce96e879b738fc371f3b2cdbbafdc19`;
const inputForLocation = document.getElementById("locationInput");
const notFound = document.querySelector(".not-found");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const section = document.querySelector(".section");

const switchStyle = function () {
  notFound.classList.toggle(`hidden`);
  weatherBox.classList.toggle("hidden");
  weatherDetails.classList.toggle("hidden");
};

const kelvToCels = function (tempK) {
  return tempK - 273.15;
};

const mphToKmH = function (speedMph) {
  return 1.61 * speedMph;
};

const windSpeed = function (mph) {
  return mph * 3.6;
};

search.addEventListener("click", function () {
  const searchLocation = inputForLocation.value;
  inputForLocation.value = ""; // Opciono, briše unos iz polja za unos

  findCity(searchLocation);
  section.innerHTML = ``;
});

const findCity = async function (location) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );
    const getData = await data.json();
    //Check if conty exist, and render a nice picture of error.
    if (getData.cod == `404`) {
      container.style.height = `605px`;
      notFound.classList.remove(`hidden`);
      section.classList.add(`hidden`);
      throw new Error(`Country doesn't exist!`);
    }
    container.style.height = `405px`;
    notFound.classList.add(`hidden`);
    section.classList.remove(`hidden`);

    console.log(getData);
    const { temp } = getData.main;
    const tempC = Math.round(kelvToCels(temp));
    const countryName = getData.name;
    const { speed } = getData.wind;
    const windS = windSpeed(speed).toFixed(1);

    const html = `
    <div class="weather-box">
        <img src="" alt="" />
        <p class="temperature">${tempC} °C</p>
        <p class="description">${countryName}</p>
      </div>

      <div class="weather-details">
        <div class="humidity">
          <i class="fa-solid fa-water"></i>
          <div class="text">
            <span>${getData.main.humidity} (THI)</span>
            <p>Hymidity</p>
          </div>
        </div>
        <div class="wind">
          <i class="fa-solid fa-wind"></i>
          <div class="text">
            <span>${windS} km/h</span>
            <p>Wind Speed</p>
          </div>
        </div>
    `;
    section.insertAdjacentHTML(`beforeend`, html);
    // container.innerHTML = "";
  } catch (err) {
    console.error(err);
  }
};
