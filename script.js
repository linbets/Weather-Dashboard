var apiKey = "05c2e018e375e16134aeb40d1d02fa6c";

document.querySelector("#form").addEventListener("submit", function(event) {
  event.preventDefault();
  //get user input
  var cityName = document.querySelector("#search").value;
  //show current weather
  showCurrentWeather(cityName);
  //show forecast weather
  showForecast(cityName);
  createButton(cityName)
});

var showCurrentWeather = function(cityName) {
  var query = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(query).then(function(res) {
    return res.json();
  }).then(function(data) {
    console.log(data);

    var template = `
    <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
      <div class="card-body">
      <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h4 class="card-title">${data.name}</h4>
        <p class="card-text">Temp: ${data.main.temp} F</p>
        <p class="card-text">Humidity: ${data.main.humidity} %</p>
        <p class="card-text">Wind Speed: ${data.wind.speed} mph</p>
      </div>
    </div>
    `;

    document.querySelector(".current").innerHTML = template;
  });
}

var showForecast = function(cityName) {
  var query = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(query).then(function(res) {
    return res.json();
  }).then(function(data) {
    console.log(data);

    var filtedData = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

    console.log(filtedData);

    var template = ""
    
    filtedData.forEach((item) => {
      template +=`
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
          <div class="card-body">
          <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png">
            <h4 class="card-title">${item.dt_txt}</h4>
            <p class="card-text">Temp: ${item.main.temp} F</p>
            <p class="card-text">Humidity: ${item.main.humidity} %</p>
            <p class="card-text">Wind Speed: ${item.wind.speed} mph</p>
          </div>
        </div>
      `;
    });

    document.querySelector(".forecast").innerHTML = template;
  });
}

var createButton = function(cityName) {
  var btn = document.createElement("button");
  btn.classList.add("city-btn");
  btn.textContent = cityName

  document.querySelector(".btn-container").append(btn);
}

document.querySelector(".btn-container").addEventListener("click", function(event) {
  if (event.target.className.includes("city-btn")) {
    var cityName = event.target.textContent;
      //show current weather
  showCurrentWeather(cityName);
  //show forecast weather
  showForecast(cityName);
  }
});