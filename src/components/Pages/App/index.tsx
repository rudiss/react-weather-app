/* eslint-disable camelcase */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Geocode from 'react-geocode';

import SearchCity from '../../Molecules/SearchCity/SearchCity';
import WeatherResult from '../../Organisms/WeatherResult';
import NotFound from '../../Molecules/CityNotFound';
import { WeatherContainer, AppTitle } from './styles';
import { days, months } from '../../../util/dates';
import { forecastAPI, initGeocode, weatherAPI } from '../../../services/APIs';

type WeatherInfoProps = {
  error: boolean;
  weatherInfo: {
    city: string;
    country: string;
    date: string;
    description: string;
    main: string;
    temp: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    wind: number;
    highestTemp: number;
    lowestTemp: number;
    forecast: any[];
  } | null;
};

initGeocode();

const App: React.FC = () => {
  const [weatherState, setWeatherState] = useState<WeatherInfoProps>({
    weatherInfo: null,
    error: false,
  });
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();
  const searchCity = (searchRef.current as unknown) as HTMLInputElement;

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setCity(e.target.value);
    setWeatherState({
      ...weatherState,
    });
  };

  const handleSearchCity = useCallback(() => {
    if (!searchCity) return;
    setAddress('');

    setIsLoading(true);
    Promise.all([fetch(weatherAPI(searchCity?.value)), fetch(forecastAPI(searchCity?.value))])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText);
      })
      .then(([data1, data2]) => {
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()}
        ${months[currentDate.getMonth()]}`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const weatherPayload = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        };
        setWeatherState({
          ...weatherState,
          weatherInfo: weatherPayload,
          error: false,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setWeatherState({
          ...weatherState,
          error: true,
          weatherInfo: null,
        });
        setIsLoading(false);
      });
  }, [searchCity]);

  const handleUserPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const LatLong = await Geocode.fromLatLng(
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
      );
      const { formatted_address } = LatLong.results[0];
      const { long_name } = LatLong.results[0].address_components[3];
      setCity(long_name);
      setIsLoading(false);
      handleSearchCity();
      setAddress(formatted_address);
    });
  }, [handleSearchCity]);

  useEffect(() => {
    handleUserPosition();
  }, [handleUserPosition]);

  return (
    <React.Fragment>
      <AppTitle showLabel={(weatherState.weatherInfo || weatherState.error) && true}>
        React Weather APP
      </AppTitle>
      <WeatherContainer>
        <AppTitle secondary showResult={(weatherState.weatherInfo || weatherState.error) && true}>
          React Weather APP
          <small>Use sua localização atual ou utilize campo de busca abaixo =D</small>
        </AppTitle>

        <SearchCity
          searchRef={searchRef}
          value={city}
          isLoading={isLoading}
          showResult={(weatherState.weatherInfo || weatherState.error) && true}
          change={handleInputChange}
          submit={handleSearchCity}
        />

        {weatherState.weatherInfo && (
          <WeatherResult address={address} weather={weatherState.weatherInfo} />
        )}
        {weatherState.error && <NotFound />}
      </WeatherContainer>
    </React.Fragment>
  );
};

export default App;
