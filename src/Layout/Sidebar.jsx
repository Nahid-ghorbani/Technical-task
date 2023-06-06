import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
`;

const SideBar = styled.div`
  grid-column: 1;
  grid-row: 2/3;
  border: #000 solid 0.5px;
  text-align: center
`;

function Sidebar() {
  return (
    <SideBar>
      <NavLink to="/dashboard"> Dashboard </NavLink>
      <NavLink to="/todos"> Todos </NavLink>
      <NavLink to="/weather"> Weather </NavLink>
      <NavLink to="/profile"> Profile </NavLink>
    </SideBar>
  );
}

export default Sidebar;
