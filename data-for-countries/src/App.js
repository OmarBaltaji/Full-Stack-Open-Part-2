import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});
  const api_key = process.env.REACT_APP__WEATHER_API_KEY;

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => {
      console.log(res.data);
      setCountries(res.data);
    });
  }, []);

  const onChangeHandler = (event) => {
    const typedCountryLowerCase = event.target.value.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));;
    const countriesToFilter = countries.filter(country => country.name.common.includes(typedCountryLowerCase));
    setFilteredCountries(countriesToFilter);

    if(!typedCountryLowerCase) {
      setFilteredCountries([]);
    }
  }

  const commonCountryDetails = (country) => (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map((lang) => <li key={lang[0]}>{lang[1]}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt="country's flag" />
      </div>
    </>
  );

  const showMoreDetails = (code) => {
    const element = document.getElementById(code);
    if(element.style.display === 'none') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  };

  const getWeatherInfo = (capitalCoordinates) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalCoordinates[0]}&lon=${capitalCoordinates[1]}&appid=${api_key}&units=metric`)
    .then(res => {
      console.log(res.data);
      setWeatherInfo(res.data);
    });
  }

  return (
    <div>
      <div>
        <span>Find countries</span> &nbsp;
        <input onChange={onChangeHandler} />
      </div>
      <div>
      {
        filteredCountries.length === 0 ?
        <span>No countries found</span>
        :
        (filteredCountries.length === 1 ?
          filteredCountries.map(country =>
            <div key={country.cca2}>
              {commonCountryDetails(country)}
              <h2>Weather in {country.capital}</h2>
              {getWeatherInfo(country.capitalInfo.latlng)}
              {
                weatherInfo && Object.keys(weatherInfo).length > 0 ? 
                  <div>
                    <span>temperature {weatherInfo.main.temp} Celcius</span>
                    <div>
                      <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="weather icon" />
                    </div>
                    <span>wind {weatherInfo.wind.speed} m/s</span>
                  </div>
                :
                null
              }
            </div>
          )
          :
          (filteredCountries.length > 10 
            ? 
            <span>Too many matches, specify another filter</span>
            :
            filteredCountries.map(country => 
              <div key={country.cca2}>
                {country.name.common} &nbsp;
                <button onClick={() => showMoreDetails(country.cca2)}>Show</button>
                <div id={country.cca2} style={{ display: "none" }}>
                  {commonCountryDetails(country)}
                </div> 
                <br />
              </div>
            )
          )
        )
      }
      </div>
    </div>
  );
}

export default App;
