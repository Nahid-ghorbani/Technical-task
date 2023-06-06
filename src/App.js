import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Todos from "./Pages/Todos";
import Weather from "./Pages/Weather";

import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/Topbar";

const Container = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-rows: 10vh 90vh;
  gap: 0;
`;

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 2/3;
  border: #000 solid 0.5px;
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Topbar />
        <Sidebar />
        <Wrapper>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Wrapper>
      </Container>
    </BrowserRouter>
  );
}

export default App;
