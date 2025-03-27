import React from "react";
import styled from "styled-components";
import BurgerImage from "../assets/classic-cheeseburger.jpg"; // Replace with actual image paths
import DeluxeBurger from "../assets/deluxe-burger.jpg";
import VeggieBurger from "../assets/veggie-burger.jpg";
import FriesImage from "../assets/fries.jpg";
import CheeseFries from "../assets/cheese-fries.jpg";
import DrinkImage from "../assets/soft-drink.jpg";
import MilkShake from "../assets/chocolate-shake.jpg";
import IceCreamImage from "../assets/ice-cream.jpg";
import ChocolateIceCream from "../assets/choco-icecream.jpg";


const MenuContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
`;

const MenuTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Category = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 3px solid #ffcc00;
  display: inline-block;
  padding-bottom: 5px;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const MenuItem = styled.div`
  background: #222;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: white;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #ffcc00;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background-color: #ffcc00;
  color: black;
  border: none;
  padding: 8px 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #e6b800;
  }
`;

const Menu = ({ addToCart }) => {
  const menuItems = [
    { name: "Classic Cheeseburger", price: 8.99, image: BurgerImage },
    { name: "BBQ Bacon Burger", price: 10.99, image: DeluxeBurger },
    { name: "Veggie Delight", price: 7.99, image: VeggieBurger },
    { name: "Classic Fries", price: 3.99, image: FriesImage },
    { name: "Cheese Fries", price: 4.99, image: CheeseFries },
    { name: "Soft Drink", price: 1.99, image: DrinkImage },
    { name: "Chocolate Milkshake", price: 4.99, image: MilkShake },
    { name: "Vanilla Ice Cream", price: 3.49, image: IceCreamImage },
    { name: "Chocolate Ice Cream", price: 3.49, image: ChocolateIceCream },
  ];

  return (
    <MenuContainer>
      <MenuTitle>Our Menu</MenuTitle>

      <Category>
        <CategoryTitle>Burgers</CategoryTitle>
        <MenuGrid>
          {menuItems.slice(0, 3).map((item, index) => (
            <MenuItem key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              <AddToCartButton onClick={() => addToCart(item)}>Add to Cart</AddToCartButton>
            </MenuItem>
          ))}
        </MenuGrid>
      </Category>

      <Category>
        <CategoryTitle>Fries</CategoryTitle>
        <MenuGrid>
          {menuItems.slice(3, 5).map((item, index) => (
            <MenuItem key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              <AddToCartButton onClick={() => addToCart(item)}>Add to Cart</AddToCartButton>
            </MenuItem>
          ))}
        </MenuGrid>
      </Category>

      <Category>
        <CategoryTitle>Drinks</CategoryTitle>
        <MenuGrid>
          {menuItems.slice(5, 7).map((item, index) => (
            <MenuItem key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              <AddToCartButton onClick={() => addToCart(item)}>Add to Cart</AddToCartButton>
            </MenuItem>
          ))}
        </MenuGrid>
      </Category>

      <Category>
        <CategoryTitle>Ice Cream</CategoryTitle>
        <MenuGrid>
          {menuItems.slice(7).map((item, index) => (
            <MenuItem key={index}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              <AddToCartButton onClick={() => addToCart(item)}>Add to Cart</AddToCartButton>
            </MenuItem>
          ))}
        </MenuGrid>
      </Category>
    </MenuContainer>
  );
};

export default Menu;
