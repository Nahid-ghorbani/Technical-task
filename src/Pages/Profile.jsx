import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

function Profile() {
  const [theme, setTheme] = useState("light");
  const [userName, setUserName] = useState("");
  const [saveBtnText, setSaveBtnText] = useState("Save");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { userName, theme } = JSON.parse(storedUserData);
      setUserName(userName);
      setTheme(theme);
    } else {
      const defaultUserName = prompt("Please enter your name:");
      setUserName(defaultUserName || "");
    }
  }, []);

  useEffect(() => {
    function saveData() {
      const userData = { userName, theme };
      localStorage.setItem("userData", JSON.stringify(userData));
      setSaveBtnText("Saved!");
      setIsDirty(false);
      setTimeout(() => setSaveBtnText("Save"), 1000);
    }

    if (isDirty) {
      saveData();
    }
  }, [isDirty, userName, theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setIsDirty(true);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    setIsDirty(true);
  };

  const handleSaveData = () => {
    const userData = { userName, theme };
    localStorage.setItem("userData", JSON.stringify(userData));
    setSaveBtnText("Saved!");
    setTimeout(() => setSaveBtnText("Save"), 1000);
  };

  return (
    <Container>
      <h1>Welcome, {userName || "guest"}</h1>

      <input
        id="name-input"
        placeholder="Enter Your Name!"
        value={userName}
        onChange={handleNameChange}
      />
      <button onClick={handleSaveData}>{saveBtnText}</button>
      <br />

      <label htmlFor="theme-select">Choose a theme</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </Container>
  );
}

export default Profile;
