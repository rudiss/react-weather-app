import React from 'react';
import SmallLabel from '../../Atoms/SmallLabel';
import Text from '../../Atoms/Text';
import { ForecastWrapper, WeatherIcon } from './styles';

type ForecastHourProps = {
  temp: number;
  month: string;
  day: string;
  hour: number;
  icon: string;
};

const ForecastHour: React.FC<ForecastHourProps> = ({ temp, month, day, hour, icon }) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <Text align="center">
        {day}/{month}
      </Text>
      <Text align="center">{hour}:00</Text>
      <WeatherIcon src={iconUrl} />
      <SmallLabel align="center" weight="400">
        {temp}&#176;
      </SmallLabel>
    </ForecastWrapper>
  );
};

export default ForecastHour;
