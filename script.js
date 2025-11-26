document.addEventListener('DOMContentLoaded', function(){
  const cityinput = document.getElementById('city-input');
  const weatherbtn = document.getElementById('get-weather-btn');
  const citynamedisplay = document.getElementById('city-name');
  const temperaturedisplay = document.getElementById('temperature');
  const descdisplay = document.getElementById('description');
  const errormsgdisplay = document.getElementById('error-message');
  const weatherinfo = document.getElementById('weather-info');

  const API_KEY = "f93921d9268e7914a377451b17897c9b";

    weatherbtn.addEventListener('click', async function(){
      const city = cityinput.value.trim();
      if (!city) return;

      try {
        const weatherdata = await fetchweatherdata(city);
        displayweatherdata(weatherdata);
      } catch (error) {
        displayerror();
      }

    })


    async function fetchweatherdata(city){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok){
        displayerror();
      } else{
        const data = await response.json();
        return data;
      }
      
    }

    function displayweatherdata(data){
      console.log(data);
      const {name, main, weather} = data;
      citynamedisplay.textContent =  `City : ${name}`;

      temperaturedisplay.textContent = `temperature : ${(main.temp - 273.15).toFixed(2)}∘C`;
      descdisplay.textContent = `Weather : ${weather[0].description}`;

      weatherinfo.classList.remove('hidden');
      errormsgdisplay.classList.add('hidden');

    }

    function displayerror(){
      weatherinfo.classList.add('hidden');
      errormsgdisplay.classList.remove('hidden');
    }
})
