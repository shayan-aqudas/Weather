const apiKey = "8922098a1b9b8e706612b36ba8556ac3"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const formSubmit = document.getElementById('form');
const searchBox = document.getElementById('input');
const images = document.getElementById('sun-img');
const showWeather = document.getElementById('show-weather');
const errorBox = document.querySelector('.error-box');

async function weatherFetch(city) {
  const response = await fetch(apiUrl+city+"&appid="+`${apiKey}`);
  if(response.status == 404){
    showWeather.style.display = "none";
    errorBox.style.display = "flex";
  }
  else{
    showWeather.style.display = "block";
    errorBox.style.display = "none";
    const data = await response.json();
  document.querySelector('#city-name').innerHTML = data.name;
  let temp = Math.round(data.main.temp)+"°c";
  document.querySelector('#temp').innerHTML = temp;
  let humidity = data.main.humidity+"%";
  document.querySelector('.hume').innerHTML = humidity;
  document.querySelector('#speed').innerHTML = data.wind.speed;
  
  if(data.weather[0].main==="Clouds"){
    images.src = "img/cloudy.png";
  }
  else if(data.weather[0].main==="Drizzle"){
    images.src = "img/drizzle.png"
  }
  else if(data.weather[0].main==="Snow"){
    images.src = "img/snow.png"
  }
  else if(data.weather[0].main==="Haze"){
    images.src = "img/fog.png"
  }
  else if(data.weather[0].main==="Rain"){
    images.src = "img/heavy-rain.png"
  }
  else if(data.weather[0].main==="Mist"){
    images.src = "img/mist.png"
  }
  else{
    images.src = "img/sun.png";
  }
    
  }
  
}

formSubmit.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(searchBox.value == ""){
    showWeather.style.display = "none";
    errorBox.style.display = "flex";
  }
  else{
    localStorage.setItem("city", searchBox.value);
     weatherFetch(searchBox.value);
     searchBox.value = "";
  }
})

if("city" in localStorage){
  weatherFetch(localStorage.city)
}



