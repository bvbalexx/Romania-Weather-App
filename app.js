

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const tempFeels = document.querySelector(".temp-feels-like");
const sunsettime = document.querySelector(".sunset-time");
const sunrisetime = document.querySelector(".sunrise-time");
const currenttime = document.querySelector(".currenttime");
const timestamp = document.querySelector(".timestamp");

const cardData = [
     { heading:'card 1',
       body:'this is card body 1'
     },
     { heading:'card 2',
       body:'this is card body 2'
     },
     { heading:'card 3',
       body:'this is card body 3'
     },
     { heading:'card 4',
       body:'this is card body 4'
     },
     { heading:'card 5',
       body:'this is card body 5'
     },
     { heading:'card 6',
       body:'this is card body 6'
     },
     { heading:'card 7',
       body:'this is card body 7'
     },
     { heading:'card 8',
       body:'this is card body 8'
     },
     { heading:'card 1',
     body:'this is card body 1'
   },
   { heading:'card 2',
     body:'this is card body 2'
   },
   { heading:'card 3',
     body:'this is card body 3'
   },
   { heading:'card 4',
     body:'this is card body 4'
   },
   { heading:'card 5',
     body:'this is card body 5'
   },
   { heading:'card 6',
     body:'this is card body 6'
   },
   { heading:'card 7',
     body:'this is card body 7'
   },
   { heading:'card 8',
     body:'this is card body 8'
   },
   { heading:'card 1',
   body:'this is card body 1'
 },
 { heading:'card 2',
   body:'this is card body 2'
 },
 { heading:'card 3',
   body:'this is card body 3'
 },
 { heading:'card 4',
   body:'this is card body 4'
 },
 { heading:'card 5',
   body:'this is card body 5'
 },
 { heading:'card 6',
   body:'this is card body 6'
 },
 { heading:'card 7',
   body:'this is card body 7'
 },
 { heading:'card 8',
   body:'this is card body 8'
 },
 { heading:'card 1',
 body:'this is card body 1'
},
{ heading:'card 2',
 body:'this is card body 2'
},
{ heading:'card 3',
 body:'this is card body 3'
},
{ heading:'card 4',
 body:'this is card body 4'
},
{ heading:'card 5',
 body:'this is card body 5'
},
{ heading:'card 6',
 body:'this is card body 6'
},
{ heading:'card 7',
 body:'this is card body 7'
},
{ heading:'card 8',
 body:'this is card body 8'
},
{ heading:'card 1',
body:'this is card body 1'
},
{ heading:'card 2',
body:'this is card body 2'
},
{ heading:'card 3',
body:'this is card body 3'
},
{ heading:'card 4',
body:'this is card body 4'
},
{ heading:'card 5',
body:'this is card body 5'
},
{ heading:'card 6',
body:'this is card body 6'
},
{ heading:'card 7',
body:'this is card body 7'
},
{ heading:'card 7',
body:'this is card body 7'
},
 
 ]


const postContainer = document.querySelector('.card-container');


const weather = {};
weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
    
}



function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
 
    getWeather(latitude,longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = '<p>' + error.message + '</p>';
}




function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    console.log(longitude);
    console.log(latitude);
    fetch(api)
       .then(function(response){
        let data = response.json();
        return data;

       })
       .then(function(data){
           weather.temperature.value = Math.floor(data.main.temp - KELVIN);
           weather.description = data.weather[0].description;
           weather.iconId = data.weather[0].icon;
           weather.city = data.name;
           weather.country = data.sys.country;
           weather.tempFeels = Math.floor(data.main.feels_like-KELVIN);

           weather.sunsettime = data.sys.sunset;
           weather.sunrisetime = data.sys.sunrise;
           weather.timestamp = data.dt;

       }) 

       .then(function(){
        if (weather.temperature.value !== null) {
            displayWeather();
        } else {
          
            console.log("Eroare: Datele meteorologice nu au fost preluate corect.");
        }

       });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`; 
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    tempFeels.innerHTML = `<span>Temperature feels like:</span>${weather.tempFeels}°`;
   
    const j = unixToTimpestamp(weather.sunrisetime);
    sunrisetime.innerHTML = `${j}`;


    const jj = unixToTimpestamp(weather.sunsettime);
    sunsettime.innerHTML = `${jj}`;
    
   
    const y = unixToFullTimpestamp(weather.timestamp);
    timestamp.innerHTML = `${y}`;
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
    
}

tempElement.addEventListener("click", function(){
 if(weather.temperature.value === undefined) return;
 if(weather.temperature.unit == "celsius"){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit=Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
 } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
     weather.temperature.unit = "celsius";
 }

});


function unixToFullTimpestamp(value){
    const milliseconds = value * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}

function unixToTimpestamp(value){
    const milliseconds = value * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat =  dateObject.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    return humanDateFormat;

}


const locations = [
    { latitude: 46.0667, longitude: 23.5833 }, // Alba // https://api.openweathermap.org/data/2.5/weather?lat=46.0667&lon=23.5833&appid=82005d27a116c2880c8f0fcb866998a0
    { latitude: 46.1866, longitude: 21.3126 }, // Arad // SUBCETATE - ARAD
    { latitude: 44.8563, longitude: 24.8691 }, // Argeș  
    { latitude: 46.5713, longitude: 26.9252 }, // Bacău
    { latitude: 47.0723, longitude: 21.9210 }, // Bihor 

    { latitude: 47.75083945835914, longitude: 26.66524428465274 }, // Botosani
    { latitude: 47.13870528030418, longitude: 24.489604144220117 }, // Bistrița-Năsăud // UNIREA - Bistrita
    { latitude: 45.26563214847576, longitude: 27.95933307604263 }, // Brăila // VATRA VECHE - Braila
    { latitude: 45.65892760107142, longitude: 25.584443608066355 }, // Brașov 
    { latitude: 45.137256336937206, longitude: 26.817454483530128 }, // Buzău 

    { latitude: 44.1940123, longitude: 27.3204624 }, // Călărași 
    { latitude: 45.30492006619403, longitude: 21.881976772071074 }, // Caraș-Severin
    { latitude: 46.771283779854144, longitude: 23.62178268972884 }, // Cluj
    { latitude: 44.17634562165707, longitude: 28.65137854034108 }, // Constanța
    { latitude: 45.8612961213569, longitude: 25.78801903559078 }, // Covasna

    { latitude: 44.91217402952682, longitude: 25.455471640287005  }, // Dâmbovița
    { latitude: 44.33099142285639, longitude: 23.78949575492993 }, // Dolj // CRAIOVITA - CRAIOVA
    { latitude: 45.435242019069115, longitude: 28.00475048959197 }, // Galați // OSTROVU AZACLAU - GALATI 
    { latitude: 43.90398913713889, longitude: 25.969978775909485 }, // Giurgiu
    { latitude: 45.069691904291105, longitude: 23.292380164362132 }, // Gorj // ULARI - TARGU JIU

    { latitude: 46.36995177997564, longitude: 25.795173314749707 }, // Harghita // TOPLITA CIUC - MIERCUREA CIUC
    { latitude: 45.865962461254334, longitude: 22.91442470553526 }, // Hunedoara
    { latitude: 44.56281684618394, longitude: 27.361167618103313 }, // Ialomița // BORA - SLOBOZIA
    { latitude: 47.15858933766617, longitude: 27.599854853310518 }, // Iași
    { latitude: 44.425448667488865, longitude: 26.104238835018197 }, // Ilfov

    { latitude: 47.65755174562099, longitude: 23.583912061385277 }, // Maramureș
    { latitude: 44.63704157136818, longitude: 22.659129959357593 }, // Mehedinți
    { latitude: 46.53778220559588, longitude: 24.55208224967066 }, // Mureș
    { latitude: 46.929501893464646, longitude: 26.375018822547087 }, // Neamț  // CINDIA - Piatra Neamt
    { latitude: 44.430496057648654, longitude: 24.371578007209436 }, // Olt
    { latitude: 44.93654850228105, longitude: 26.013324942436807 }, // Prahova

    { latitude: 47.185616025112324, longitude: 23.057019004646357 }, // Sălaj
    { latitude: 47.801933117331004, longitude: 22.86097955672929 }, // Satu Mare
    { latitude: 45.80546884765547, longitude: 45.80546884765547 }, // Sibiu
    { latitude: 47.6640531029425, longitude: 26.278425065115787 }, // Suceava // SCHEIA - SUCEAVA
    { latitude: 43.9750659143215, longitude: 25.32846970623389 }, // Teleorman

    { latitude: 45.74846210046979, longitude: 21.210750421593946 }, // Timis // BESENIC - TIMISOARA
    { latitude: 45.171866154873946, longitude: 28.79126583115165 }, // Tulcea
    { latitude: 45.100490583327925, longitude: 24.368447569925603 }, // Vâlcea // Schitu-Slătioarele - RAMNICU VALCEA
    { latitude: 46.64108446544463, longitude: 27.7280324008453 }, // Vaslui
    { latitude: 45.69534560617086, longitude: 27.18354133499985 }, // Vrancea

];



async function fetchDataForLocations() {
  const locationsData = [];

  for (const location of locations) {
      const { latitude, longitude } = location;
      const apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=82005d27a116c2880c8f0fcb866998a0`;

      try {
          const response = await fetch(apiLink);
          const data = await response.json();
          locationsData.push(data);
      } catch (error) {
          console.error('Eroare la preluarea datelor pentru locația:', location, error);
          // Continuăm cu următoarea locație în caz de eroare
          continue;
      }
    }
  return(locationsData);
 
}


fetchDataForLocations()
.then((locationsData) => {
cardData.forEach((card, index) => {
  const { latitude, longitude } = locations[index];
 const postElement = document.createElement('div');
  postElement.classList.add('card');
  postElement.innerHTML = `  <div class="app-title">
  <p>Weather</p>
</div>
<div class="notification"></div>

<div class="weather-icon">
<img src="icons/${locationsData[index].weather[0].icon}.png" alt="Weather Icon">
</div>
</div>
<div class="temperature-value">
  <p>${Math.floor(locationsData[index].main.temp-KELVIN)}°<span>C</span></p>
</div>

<div class="location" id="name">

    <p>${locationsData[index].name}</p>
</div>





<div class="timestamp">${unixToFullTimpestamp(locationsData[index].dt)}</div>
<div class="temp-feels-like">
  <p>Feels like: ${Math.floor(locationsData[index].main.feels_like-KELVIN)}°<span>C</span></p>
</div>

<div class="sunrise-sunset">
  <p class="sunrise-sunset-text">Sunrise:</p>
  <div class="sunrise-time">${unixToTimpestamp(locationsData[index].sys.sunrise)}</div>
</div>

<div class="sunrise-sunset">
  <p class="sunrise-sunset-text">Sunset:</p>
  <div class="sunset-time">${unixToTimpestamp(locationsData[index].sys.sunset)}</div>
</div>

  `;
 
  if (index === cardMod1) {
    locationsData[index].name = "Arad";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Arad";
    }
  }
  if (index === cardMod2) {
    locationsData[index].name = "Bistrita";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Bistrita";
    }
  }
  if (index === cardMod3) {
    locationsData[index].name = "Braila";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Braila";
    }
  }
  if (index === cardMod4) {
    locationsData[index].name = "Craiova";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Craiova";
    }
  }
  if (index === cardMod5) {
    locationsData[index].name = "Galati";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Galati";
    }
  }
  if (index === cardMod6) {
    locationsData[index].name = "Targu Jiu";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Targu Jiu";
    }
  }
  if (index === cardMod7) {
    locationsData[index].name = "Miercurea-Ciuc";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Miercurea-Ciuc";
    }
  }
  if (index === cardMod8) {
    locationsData[index].name = "Slobozia";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Slobozia";
    }
  }
  if (index === cardMod9) {
    locationsData[index].name = "Bucuresti";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Bucuresti";
    }
  }
  if (index === cardMod10) {
    locationsData[index].name = "Piatra-Neamt";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Piatra-Neamt";
    }
  }
  if (index === cardMod11) {
    locationsData[index].name = "Sibiu";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Sibiu";
    }
  }
  if (index === cardMod12) {
    locationsData[index].name = "Suceava";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Suceava";
    }
  }
  if (index === cardMod13) {
    locationsData[index].name = "Timisoara";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Timisoara";
    }
  }
  if (index === cardMod14) {
    locationsData[index].name = "Ramnicu-Valcea";
    const locationElement = postElement.querySelector('.location p');
    if (locationElement) {
      locationElement.textContent = "Ramnicu-Valcea";
    }
  }
  postContainer.appendChild(postElement);
  displayWeather(latitude, longitude);
});

})
.catch((error) => {
  console.error('Eroare generală:', error);
});

const cardMod1 = 1; 
const cardMod2 = 6; 
const cardMod3 = 7;
const cardMod4 = 16;
const cardMod5 = 17;
const cardMod6 = 19;
const cardMod7 = 20;
const cardMod8 = 22;
const cardMod9 = 24;
const cardMod10 = 29;
const cardMod11 = 33;
const cardMod12 = 34;
const cardMod13 = 36;
const cardMod14 = 38;

const map = L.map('map').setView([45.9432, 24.9668], 6); // Coordonatele centrale ale României și nivelul de zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Încarcă datele geospațiale pentru județele României
fetch('path-to-your-geojson-file.json')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });