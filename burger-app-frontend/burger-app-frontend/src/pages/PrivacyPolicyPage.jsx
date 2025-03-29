import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PrivacyPolicyPage = () => {
  return (
    <PrivacyContainer>
      <Title>Privacy Policy</Title>
      <Paragraph>
        Burger Quest is committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your personal information when you visit our website.
      </Paragraph>
      <Paragraph>
        We may collect personal information such as your name, email address, and payment details when you use our services, place an order, or contact us. We will only use this information for the purposes of providing our services, processing orders, and communicating with you about your requests.
      </Paragraph>
      <Paragraph>
        We do not sell, rent, or share your personal information with third parties unless required by law or with your explicit consent.
      </Paragraph>
      <Paragraph>
        Burger Quest takes all necessary steps to protect your personal information using secure encryption technologies. However, no method of transmission over the internet is completely secure, so we cannot guarantee absolute security.
      </Paragraph>
      <Paragraph>
        By using our website, you consent to the collection and use of your information in accordance with this privacy policy. If you do not agree with any part of this policy, please refrain from using our services.
      </Paragraph>
    </PrivacyContainer>
  );
};

export default PrivacyPolicyPage;
