let cities = [
  {name: "Riyadh", country: "SA",ar:"الرياض"},
  {name: "Makkah al Mukarramah", country: "SA",ar:"مكة"},
  {name: "Ḩā'il", country: "SA",ar:"حائل"},
  {name: "Al Qaşīm	", country: "SA",ar:"القصيم"},
  {name: "Dubai", country: "UAE",ar:"دبي"},

];

let selectedCityAr = "الرياض";
let selectedCity = "Riyadh";
let selectedCountry = "SA";



document.getElementById('myDiv').innerHTML = `<h2 id="current-day" id="city">${selectedCityAr}</h2>`;

axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=8`)
  .then((res) => {
   let toDay = res.data.data.date.hijri.weekday.ar;
   let day = res.data.data.date.hijri.day;
   let month = res.data.data.date.hijri.month.ar;
   let year = res.data.data.date.hijri.year;

    document.getElementById("toDay").innerHTML = toDay +" " + day +" " + month +" " +  year ;
    let times = res.data.data.timings;

     document.getElementById("fajr").innerHTML = times.Fajr;
     document.getElementById("sunrise").innerHTML = times.Sunrise;
     document.getElementById("dhuhr").innerHTML = times.Dhuhr;
     document.getElementById("asr").innerHTML = times.Asr;
     document.getElementById("maghrib").innerHTML = times.Maghrib;
     document.getElementById("isha").innerHTML = times.Isha;
    
  })
  .catch((error) => console.error('Error fetching data:', error));




function chooseCity(cityName) {
  const city = cities.find(city => city.name === cityName);
  
  if (city) {
    selectedCity = city.name;
    selectedCountry = city.country;
    selectedCityAr = city.ar;

    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=8`)
      .then((res) => {
        document.getElementById('myDiv').innerHTML = `<h2 id="current-day" id="city">${selectedCityAr}</h2>`;
        let times = res.data.data.timings;

        document.getElementById("fajr").innerHTML = times.Fajr;
        document.getElementById("sunrise").innerHTML = times.Sunrise;
        document.getElementById("dhuhr").innerHTML = times.Dhuhr;
        document.getElementById("asr").innerHTML = times.Asr;
        document.getElementById("maghrib").innerHTML = times.Maghrib;
        document.getElementById("isha").innerHTML = times.Isha;

      })
      .catch((error) => console.error('Error fetching data:', error));
  } else {
    console.log(`City "${cityName}" not found in the cities array.`);
  }

}



let options = '<option value="" disabled>اختر المدينة</option>';
for (let city of cities) {
  options += `<option value="${city.name}">${city.ar}</option>`;
}


document.getElementById('citySelect').innerHTML = options;

