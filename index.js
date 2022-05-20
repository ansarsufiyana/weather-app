//  // fetching weather api from openweather.org
let weather = {
  apikey: "45fe15572d2ef49cfe33e837652bff53",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  // // intigrating the data from api into our displayed weather theme
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerHTML = " Weather in " + name;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600×900/?" + name + "')" 
    

  }, 
  // // setting up search bar to allow user to search loction 
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
 // // adding click event
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// // adding key enter event
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// //defualt loction set to locial area pakistan
weather.fetchWeather("pakistan");
