const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //destructuring properties

  const { cityInfo, weather } = data;
  console.log(data);
  details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  //update img and icon
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc;

  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityInfo = await getCity(city);
  const weather = await getWeather(cityInfo.Key);

  return { cityInfo, weather };
};

cityForm.addEventListener("submit", (e) => {
  // prevent reload
  e.preventDefault();
  // get City
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update html

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
