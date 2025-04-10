const list = document.querySelector(".ajax-section .cities");
const form = document.querySelector(".weather-form");
const input = document.getElementById("city-input");

list.style.display = "none";


const displayWeather = (city) => {

  const url = `http://localhost:3000/weather?city=${city}`; 
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Grad nije pronađen");
      return response.json();
    })
    .then((data) => {
      const { main, name, sys, weather, rain } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const humidity = main.humidity;
      const rainVolume = rain && rain["1h"] ? `${rain["1h"]} mm u zadnjem satu` : "Nema padavina";

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
      <p>Vlažnost: ${humidity}%</p>
      <p>Padavine: ${rainVolume}</p>
    `;

      li.innerHTML = markup;

      list.innerHTML = "";
      list.appendChild(li);

      list.style.opacity = 0;
      list.style.display = "block";
      setTimeout(() => {
        list.style.transition = "opacity 0.5s ease-in";
        list.style.opacity = 1;
      }, 50);
    })
    .catch((error) => {
      console.error("Greška:", error);
      list.style.display = "block";
      list.innerHTML = `<li class="city">⚠️ Grad nije pronađen. Pokušaj ponovo.</li>`;
    });
};

//event listener za slanje forme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    displayWeather(city);
    input.value = ""; 
  } else {
    list.style.display = "block";
    list.innerHTML = `<li class="city">⚠️ Molimo unesite ime grada!</li>`;
  }
});
