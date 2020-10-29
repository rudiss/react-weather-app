import Geocode from 'react-geocode';

const apiKey = process.env.REACT_APP_API_KEY;

export const weatherAPI = (value: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${apiKey}&units=metric&lang=pt_br`;

export const forecastAPI = (value: string) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${apiKey}&units=metric&lang=pt_br`;

export const initGeocode = () => {
  Geocode.setApiKey('AIzaSyCwIEf5gYCVHoYqTOGnlihHY4yWihAnHkw');
  Geocode.setLanguage('pt-BR');
  Geocode.setRegion('pt-BR');
  Geocode.enableDebug();
};
