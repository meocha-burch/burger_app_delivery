import React from 'react'; // Ensure React is imported for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from context

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Access the user from the context

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Return the children if authenticated
};

// PropTypes for validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed and is a valid React node
};

export default PrivateRoute;
