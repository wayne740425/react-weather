import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import WeatherCard from "./component/WeatherCard";
import WeatherSetting from "./component/WeatherSetting";
import Page from "./Page";
import { Routes, Route, Outlet } from "react-router-dom";

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
  const storageLat = localStorage.getItem("storageLat");
  const storageLng = localStorage.getItem("storageLng");
  const [currentTheme, setCurrentTheme] = useState(theme.light);
  const [currentLocation, setCurrentLocation] = useState({
    lat: storageLat || 25.0517899,
    lng: storageLng || 121.5490878,
  });

  useEffect(() => {
    localStorage.setItem("storageLat", currentLocation.lat);
    localStorage.setItem("storageLng", currentLocation.lng);
  }, [currentLocation]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Outlet />
            </Container>
          }
        >
          <Route
            index
            element={<WeatherCard currentLocation={currentLocation} />}
          />
          <Route
            path={Page.WeatherSetting}
            element={
              <WeatherSetting
                currentLocation={currentLocation}
                setCurrentLocation={setCurrentLocation}
              />
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
