import { useState } from "react";
import styled from "@emotion/styled";
import Page from "../Page";
import { useNavigate } from "react-router-dom";

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const WeatherSetting = (props) => {
  const navigate = useNavigate()
  const { currentLocation, setCurrentLocation } = props;
  const [lat, setLat] = useState(currentLocation.lat);
  const [lng, setLng] = useState(currentLocation.lng);

  const handleSave = () => {
    let isSuccess = true;
    if (lng < -180 || lng > 180) {
      isSuccess = false;
    }
    if (lat < -90 || lat > 90) {
      isSuccess = false;
    }
    if (isSuccess) {
      setCurrentLocation({
        lat: lat,
        lng: lng,
      });
      navigate("/")
    } else {
      alert(`儲存失敗：您輸入數值並非在有效範圍`);
    }
  };

  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>

      <StyledLabel htmlFor="lat">經度</StyledLabel>
      <StyledInput
        id="lat"
        name="lat"
        type="number"
        step="0.0000001"
        min="-180"
        max="180"
        maxlength="12"
        value={lat}
        onChange={(input) => {
          const { value } = input.target;
          setLat(value);
        }}
      />

      <StyledLabel htmlFor="lng">緯度</StyledLabel>
      <StyledInput
        id="lng"
        name="lng"
        type="number"
        step="0.0000001"
        min="-90"
        max="90"
        maxlength="11"
        value={lng}
        onChange={(input) => {
          const { value } = input.target;
          setLng(value);
        }}
      />
      
      <ButtonGroup>
        <Back onClick={() => navigate("/")}>返回</Back>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;
