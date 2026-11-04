import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import Country from "./components/Country";
import CountryRow from "./components/CountryRow";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleShowClick = (country) => {
    setSearch(country.name.common);
  };

  const renderCountries = () => {
    const filteredCountries = search
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()),
        )
      : countries;

    if (filteredCountries.length === 0) {
      return <p>No matches found</p>;
    }
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return <Country country={country} />;
    }

    return filteredCountries.map((country) => (
      <CountryRow
        key={country.name.common}
        country={country}
        handleShow={handleShowClick}
      />
    ));
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <SearchForm search={search} handleSearchChange={handleSearchChange} />
      {renderCountries()}
    </div>
  );
};

export default App;
