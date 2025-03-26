import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 250px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BurgerImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const BurgerName = styled.h3`
  margin: 10px 0;
  font-size: 20px;
`;

const BurgerPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ff6600;
`;

const OrderButton = styled.button`
  background-color: #ff6600;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #e65c00;
  }
`;

const BurgerCard = ({ image, name, price, onAddToCart }) => {
  return (
    <Card>
      <BurgerImage src={image} alt={name} />
      <BurgerName>{name}</BurgerName>
      <BurgerPrice>${price}</BurgerPrice>
      <OrderButton onClick={() => onAddToCart && onAddToCart({ name, price })}>
        Order Now
      </OrderButton>
    </Card>
  );
};

export default BurgerCard;

