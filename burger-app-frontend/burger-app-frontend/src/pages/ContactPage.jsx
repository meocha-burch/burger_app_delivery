import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ContactContainer = styled.div`
  padding: 40px 10%;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission status
  const [responseMessage, setResponseMessage] = useState(""); // For success/failure messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    try {
      // Send form data to the backend (change the URL to your actual API endpoint)
      const response = await axios.post("http://your-backend-url/api/contact", formData);
      
      // Handle successful submission
      if (response.status === 200) {
        setResponseMessage("Thank you for contacting us! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" }); // Clear the form fields
      } else {
        setResponseMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error submitting contact form:", error);
      setResponseMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </SubmitButton>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </FormContainer>
    </ContactContainer>
  );
};

export default ContactPage;
