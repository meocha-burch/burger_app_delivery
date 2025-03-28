import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 0.9rem;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
`;

const GoldLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffcc00;
  margin-bottom: 15px;
`;

const FooterLinks = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const CopyrightText = styled.p`
  margin-top: 10px;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <GoldLine />
      <FooterLinks>
        <FooterLink to="/privacy">Privacy Policy</FooterLink>
        <FooterLink to="/terms">Terms of Service</FooterLink>
        <FooterLink to="/contact">Contact Us</FooterLink>
      </FooterLinks>
      <CopyrightText>© {new Date().getFullYear()} Burger Quest. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
