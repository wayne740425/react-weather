import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import WeatherCard from "./component/WeatherCard";
import WeatherSetting from "./component/WeatherSetting";
import Page from "./Page";

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const storageLat = localStorage.getItem("lat");
  const storageLng = localStorage.getItem("lng");
  const [currentTheme, setCurrentTheme] = useState(theme.light);
  const [currentPage, setCurrentPage] = useState(Page.WeatherCard);
  const [currentLocation, setCurrentLocation] = useState({
    lat: storageLat || 121.5490878,
    lng: storageLng || 25.0517899,
  });

  useEffect(() => {
    localStorage.setItem("lat", currentLocation.lat);
    localStorage.setItem("lng", currentLocation.lng);
  }, [currentLocation]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        {currentPage === Page.WeatherCard && (
          <WeatherCard
            currentLocation={currentLocation}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === Page.WeatherSetting && (
          <WeatherSetting
            currentLocation={currentLocation}
            setCurrentPage={setCurrentPage}
            setCurrentLocation={setCurrentLocation}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
