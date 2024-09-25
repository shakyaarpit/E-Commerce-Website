
import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      state.push(action.payload);
    },
    deleteForItem(state, action){
      return state.filter(item => item.id != action.payload.id)
    }
  }
})

export const {addToCart, deleteForItem} = CartSlice.actions;
export default CartSlice.reducer;
