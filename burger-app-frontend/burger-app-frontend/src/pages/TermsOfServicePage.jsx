import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
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

const TermsOfServicePage = () => {
  return (
    <TermsContainer>
      <Title>Terms of Service</Title>
      <Paragraph>
        By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Burger Quest's relationship with you in relation to this website.
      </Paragraph>
      <Paragraph>
        The content of the pages of this website is for your general information and use only. It is subject to change without notice.
      </Paragraph>
      <Paragraph>
        Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
      </Paragraph>
      <Paragraph>
        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.
      </Paragraph>
      <Paragraph>
        Please read these terms carefully. If you disagree with any of the terms and conditions, please discontinue your use of this website.
      </Paragraph>
    </TermsContainer>
  );
};

export default TermsOfServicePage;
