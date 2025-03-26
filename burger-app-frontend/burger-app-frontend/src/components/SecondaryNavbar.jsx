import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SecondaryNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondaryNav = styled.nav`
  background-color: #ffcc00;
  padding: 10px 10%;
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  width: 80%;
`;

const SecondaryNavLink = styled(Link)`
  color: black;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const Tagline = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  text-align: center;
  padding: 8px 0;
  font-size: 1rem;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 1px;
`;

const SecondaryNavbar = () => {
  return (
    <SecondaryNavWrapper>
      <SecondaryNav>
        <SecondaryNavLink to="/deals">Login</SecondaryNavLink>
        <SecondaryNavLink to="/about">About</SecondaryNavLink>
        <SecondaryNavLink to="/careers">Signup</SecondaryNavLink>
      </SecondaryNav>
      <Tagline>🔥 Fresh Ingredients, Legendary Taste. Order Now! 🍔</Tagline>
    </SecondaryNavWrapper>
  );
};

export default SecondaryNavbar;
