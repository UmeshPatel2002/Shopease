// models/Cart.js
// const mongoose = require('mongoose');
import mongoose, {Schema} from "mongoose";


const CartItemSchema = new Schema({
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
    },
   quantity:{ 
    type: Number, 
    required: true, 
    default: 1, 
   }
});

const cartSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
    items: [CartItemSchema]
});

export const Cart = mongoose.model('Cart', cartSchema);
