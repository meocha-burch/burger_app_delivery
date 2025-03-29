import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/delivery-logo.jpg";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext"; // Ensure this matches the export in AuthContext

const NavbarContainer = styled.nav`
  background-color: black;
  padding: 15px 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
`;

const Logo = styled.img`
  width: 120px;
  cursor: pointer;
  align-self: center;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
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

const UserNavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
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
  const navigate = useNavigate(); // Used for Logout redirection
  const authContext = useContext(AuthContext); // Handle undefined context safely
  const user = authContext?.user; // Avoids destructuring error if context is undefined
  const logout = authContext?.logout; // Logout function from context

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate("/login"); // Redirect after logout
    }
  };

  return (
    <NavbarContainer>
      <Logo src={logo} alt="Burger Quest Logo" />
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/order">Order</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>

      {/* User-related links */}
      <UserNavLinks>
        {user && <NavLink to="/profile">Profile</NavLink>}
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </>
        ) : (
          <NavLink as="button" onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            Logout
          </NavLink>
        )}
      </UserNavLinks>
    </NavbarContainer>
  );
};

// PropTypes validation
Navbar.propTypes = {
  cartCount: PropTypes.number,
};

// Default props
Navbar.defaultProps = {
  cartCount: 0,
};

export default Navbar;
