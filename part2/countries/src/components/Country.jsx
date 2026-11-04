import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital[0];
  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital},${country.cca2}&APPID=${apiKey}&units=metric`,
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      });
  }, [country]);

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />

      {weather && (
        <>
          <h3>Weather in {capital}</h3>
          <p>temperature: {weather?.main?.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt=""
          />
          <p>wind: {weather?.wind?.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Country;
