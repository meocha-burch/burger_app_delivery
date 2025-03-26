import React from "react";
import styled from "styled-components";

const TextNavbarContainer = styled.div`
  background-color: orange;
  color: #333;  /* Dark gray text */
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const TextNavbar = () => {
  return (
    <TextNavbarContainer>
      🍔 Welcome to Burger Quest - Best Burgers in Town! 🚀 Order Now & Enjoy! 🍟
    </TextNavbarContainer>
  );
};

export default TextNavbar;
