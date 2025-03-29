import React, { useState } from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContactTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffcc00;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ContactForm = styled.form`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #ffcc00;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: none;
  &:focus {
    outline: 2px solid #ffcc00;
  }
`;

const SubmitButton = styled.button`
  background-color: #ffcc00;
  color: black;
  font-size: 1.2rem;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  
  &:hover {
    background-color: #e6b800;
  }
`;

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send message to an API or email)
    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Us</ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextArea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default ContactPage;
