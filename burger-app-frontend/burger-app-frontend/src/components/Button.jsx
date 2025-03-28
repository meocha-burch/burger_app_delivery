import React from 'react'; // Add this if needed
import PropTypes from 'prop-types'; // Import PropTypes for validation

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,  // Can accept any renderable content like string, number, or element
  onClick: PropTypes.func.isRequired,   // Expects a function to handle clicks
};

export default Button;
