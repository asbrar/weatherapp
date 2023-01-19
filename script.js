let weather = {
    apiKey: "8df73f90eb77d181253f6a1149915ece",
    fetchWeather: function (city) {
      fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&appid="+
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Invalid city.");
            throw new Error("Invalid city.");
          }
          return response.json();
        })
        .then((dataset) => this.fetchcity(dataset));
    },

    fetchcity: function (dataset) {
        fetch(
            
            "https://api.openweathermap.org/data/2.5/weather?lat="+dataset[0].lat+"&lon="+dataset[0].lon+"&units=imperial&appid="+
            this.apiKey
        )
          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Denver");