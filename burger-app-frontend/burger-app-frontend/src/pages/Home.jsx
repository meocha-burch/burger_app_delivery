import React from "react";
import styled, { keyframes } from "styled-components";
import burger from "../assets/main-burger.jpg";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeContainer = styled.div`
  background-color: black;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  color: white;
  font-family: "Poppins", sans-serif;
`;

const Image = styled.img`
  width: 40%;
  max-width: 350px;
  animation: ${fadeIn} 1.5s ease-in-out;  // Apply fade-in animation here
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Tagline = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2;
`;

const Button = styled.button`
  background-color: #ffcc00;
  color: black;
  padding: 12px 24px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: bold;

  &:hover {
    background-color: #ffaa00;
    transform: scale(1.05);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Content>
        <Tagline>Welcome to Burger Quest 🍔<br />The Ultimate Burger Experience</Tagline>
        <Button>Order Now</Button>
      </Content>
      <Image src={burger} alt="Delicious Burger" />
    </HomeContainer>
  );
};

export default Home;
