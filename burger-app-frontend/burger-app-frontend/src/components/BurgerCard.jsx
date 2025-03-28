import React from 'react'; // Add this if needed
import PropTypes from 'prop-types'; // Import PropTypes for validation

const BurgerCard = ({ image, name, price, onAddToCart }) => {
  return (
    <div className="burger-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

BurgerCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default BurgerCard;