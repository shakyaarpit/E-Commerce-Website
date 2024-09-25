import React from "react";
import Hero from "../../Components/Hero/Hero";
import Filter from "../../Components/Filter/Filter";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Track from "../../Components/Track/Track";
import Testimonial from "../../Components/Testimonial/Testimonial";

import { addToCart, deleteForItem } from "../../Redux/CartSlice";

import { useSelector, useDispatch } from "react-redux";


const home = () => {
  const dispach = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  // const addCart = () => {
  //   dispach(addToCart("shirt"))
  // }

  // const deleteCart = () => {
  //   dispach(deleteForItem("shirt"));
  // }

 
  return (
    <div>
      
    <Hero />
    <Filter/>
    <ProductCard/>
    <Track/>
    <Testimonial/>
    </div>
  );
};

export default home;
