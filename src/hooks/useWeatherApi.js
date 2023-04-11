import { useState, useCallback } from "react";

const requestOptions = {
  method: "GET",
  headers: {
    "x-api-key":
      "d5ca4d288120852d0d6550795dd2c6c5ca25de1299cfc771a05eb2e0643cf705",
  },
};

const fetchCurrentWeather = (currentLocation) => {
  return fetch(
    "https://api.ambeedata.com/weather/latest/by-lat-lng?lat=" +
      currentLocation.lat +
      "&lng=" +
      currentLocation.lng,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const { time, temperature, windSpeed, summary } = data.data;

      // 將華氏溫度轉為攝氏溫度
      const temperatureC = Math.round((((temperature - 32) * 5) / 9) * 10) / 10;

      return {
        observationTime: time * 1000,
        description: summary,
        temperature: temperatureC,
        windSpeed: windSpeed,
      };
    });
};

const fetchForecastWeather = (currentLocation) => {
  return fetch(
    "https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=" +
      currentLocation.lat +
      "&lng=" +
      currentLocation.lng,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const { humidity } = data.data.forecast[0];

      return {
        humid: humidity,
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: 0,
    locationName: "臺北市",
    description: "-",
    temperature: 0.0,
    windSpeed: 0.0,
    humid: 0,
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(currentLocation),
        fetchForecastWeather(currentLocation),
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };

    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, []);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
