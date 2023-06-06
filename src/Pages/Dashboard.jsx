import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Time = styled.div`
  display: block;
  margin: 10rem auto 1rem;
  text-align: center;
  font-size: 5rem;
`;

const Message = styled.div`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 3rem;
`;

const getTime = (format) => {
  const date = new Date();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (format === "12") {
    let time = "AM";
    if (hour >= 12) {
      time = "PM";
    }
    return `${hour % 12}:${minutes} ${time}`;
  } else {
    return `${hour}:${minutes}`;
  }
};

const Dashboard = () => {
  const [time, setTime] = useState(getTime());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const hour = new Date().getHours() + timezoneOffset;

    if (hour > 3 && hour < 12) {
      setMessage("Good Morning !");
    } else if (hour >= 12 && hour <= 18) {
      setMessage("Good Afternoon !");
    } else {
      setMessage("Good Evening !");
    }
  }, []);

  return (
    <>
      <Time>{time}</Time>
      <Message>{message}</Message>
    </>
  );
};

export default Dashboard;
