import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/delivery-logo.jpg"; // Ensure the path is correct

const NavbarContainer = styled.nav`
  background-color: black;
  padding: 15px 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
`;

const Logo = styled.img`
  width: 120px;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffcc00;
    transform: scale(1.1);
  }
`;

const CartBadge = styled.span`
  background: red;
  color: white;
  font-size: 12px;
  padding: 3px 7px;
  border-radius: 50%;
  margin-left: 5px;
`;

const Navbar = ({ cartCount }) => {
  return (
    <NavbarContainer>
      <Logo src={logo} alt="Burger Quest Logo" />
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">
          Cart {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
        </NavLink>
        <NavLink to="/order">Order</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
