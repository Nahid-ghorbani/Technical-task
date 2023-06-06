import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Submit = styled.button`
  width: 5rem;
  height: 2.5rem;
  background-color: #d0d0d0;
  border-radius: 5px;
  border: none;
`;

const Input = styled.input`
  width: 50%;
  height: 2.2rem;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  margin: 0 5px;
`;

const Form = styled.form`
  text-align: center;
  height: 4rem;
  width: 100%;
  margin: 3rem auto;
`;

const Column = styled.div`
  text-align: center;
  height: 4rem;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

const Item = styled.div`
  margin: 0.5rem auto;
  padding: 0.5rem;
  font-size: 5rem;
`;

const Wind = styled.div`
  margin: 0.5rem auto;
  padding: 0.5rem;
  font-size: 3rem;
`;

const Unit = styled.span`
  font-size: 2rem;
  position: relative;
  top: -2rem;
`;

const Speed = styled.span`
  font-size: 2rem;
`;

function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [city, setCity] = useState("Tehran");

  useEffect(() => {
    let city_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`;
    axios.get(city_URL).then((res) => {
      console.log(res.data);
      let Latitude = res.data.results[0].latitude;
      let Longitude = res.data.results[0].longitude;
      let weather_URL = `https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&current_weather=true`;

      axios
        .get(weather_URL)
        .then((res) => {
          setTemperature(Math.round(res.data.current_weather.temperature));
          setWind(Math.round(res.data.current_weather.windspeed));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label>
          <Input
            type="text"
            name="city"
            placeholder="Enter city name"
            defaultValue={city}
          />
        </label>
        <Submit type="submit">Submit</Submit>
      </Form>

      {temperature !== null && (
        <Column>
          <p>
            <Item>
              {temperature} <Unit>°C</Unit>
            </Item>
            <div>Current Temperature</div>
          </p>
          <p>
            <Item>
              {" "}
              {wind} <Speed>m/s</Speed>
            </Item>
            <div>Wind Speed</div>
          </p>
        </Column>
      )}
    </div>
  );
}

export default Weather;
