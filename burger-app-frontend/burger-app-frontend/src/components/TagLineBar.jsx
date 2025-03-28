import React from "react";
import styled from "styled-components";

const TaglineWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Tagline = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  text-align: center;
  padding: 12px 0; /* Increased padding for more emphasis */
  font-size: 1.4rem; /* Increased font size for better readability */
  font-style: italic;
  font-weight: 600; /* Bold for more emphasis */
  letter-spacing: 2px; /* Adjusted letter-spacing for better legibility */
  text-transform: uppercase; /* Optional: makes the text all uppercase */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for added emphasis */
`;

const TaglineBar = () => {
  return (
    <TaglineWrapper>
      <Tagline>
        🔥 Fresh Ingredients, Legendary Taste. Order Now! 🍔
      </Tagline>
    </TaglineWrapper>
  );
};

export default TaglineBar;
