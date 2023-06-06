import React from "react";
import styled from "styled-components";

const TopBar = styled.div`
  grid-column: 1/3;
  grid-row: 1;
  border: #000 solid 0.5px;
  text-align: center;
`;

function Topbar() {
  return <TopBar>Topbar</TopBar>;
}

export default Topbar;
