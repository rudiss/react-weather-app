/* eslint-disable camelcase */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';

import ForecastHour from '../../Molecules/ForecastHour';
import BigLabel from '../../Atoms/BigLabel';
import MediumLabel from '../../Atoms/MediumLabel';
import SmallLabel from '../../Atoms/SmallLabel';
import Text from '../../Atoms/Text';

import {
  Results,
  LocationWrapper,
  CurrentWeatherWrapper,
  WeatherIcon,
  TemperatureWrapper,
  Temperature,
  WeatherDetailsWrapper,
  WeatherDetail,
  ForecastWrapper,
  Forecast,
} from './styles';

type WeatherResultProps = {
  address: string;
  weather: {
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
  };
};

const WeatherResult: React.FC<WeatherResultProps> = ({
  weather: {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  },
  address,
}) => {
  const forecasts = forecast.map(
    (item: {
      dt: number;
      main: Record<string, number>;
      weather: { icon: string }[];
      dt_txt: string | any;
    }) => (
      <ForecastHour
        key={item.dt}
        temp={Math.floor(item.main.temp * 1) / 1}
        icon={item.weather[0].icon}
        month={item.dt_txt.slice(5, 7)}
        day={item.dt_txt.slice(8, 10)}
        hour={item.dt_txt.slice(11, 13) * 1}
      />
    ),
  );
  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <Results>
      <LocationWrapper>
        <BigLabel>
          {city} {address.length === 0 && `, ${country}`}
        </BigLabel>
        {address.length > 0 && <SmallLabel weight="400">{address}</SmallLabel>}
        <SmallLabel weight="400">{date}</SmallLabel>
      </LocationWrapper>
      <CurrentWeatherWrapper>
        <WeatherIcon>{weatherIcon}</WeatherIcon>
        <TemperatureWrapper>
          <Temperature>{Math.floor(temp)}&#176;</Temperature>
          <SmallLabel weight="400" firstToUpperCase>
            {description}
          </SmallLabel>
        </TemperatureWrapper>
      </CurrentWeatherWrapper>
      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.floor(highestTemp)}&#176;
          </SmallLabel>
          <Text align="center">Máxima</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {wind}km/h
          </SmallLabel>
          <Text align="center">Vento</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunrise}
          </SmallLabel>
          <Text align="center">Nascer do Sol</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {Math.floor(lowestTemp)}&#176;
          </SmallLabel>
          <Text align="center">minima</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {humidity}%
          </SmallLabel>
          <Text align="center">Humidade</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {sunset}
          </SmallLabel>
          <Text align="center">Por do Sol</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
      <ForecastWrapper>
        <MediumLabel weight="400">Previsão</MediumLabel>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

export default WeatherResult;
