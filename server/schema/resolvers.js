const products = require('../models/products');

let cart = [];

const resolvers = {
  Query: {
    products() {
      return products
    },

    product(_, {id}) {
      const product = products.find(val => val.id === +id);
      if(!product){
        throw new Error(`No ID matching ${id}`);
      }
      return product;
    },

    cart() {
      return cart;
    }
  },

  Mutation: {
    addProductToCart(_, { id }){
      const cartItem = cart.find(val => val.id === +id);
      if(cartItem){
        cartItem.quantity += 1;
      } else {
        const product = products.find(val => val.id === +id);
        if(!product){
          throw new Error("Product not found!");
        } else {
          const clonedProduct = {
            ...product,
            quantity: 1
          };
          cart.push(clonedProduct);
        }
        return cart;
      }
    },

    removeProductFromCart(_, { id }){
      const cartItem = cart.find(val => val.id === +id);
      if(!cartItem){
        throw new Error("Product not found!");
      } else {
        cart = cart.filter(val => val.id !== +id);
        return id;
      }
    },

    updateQuantity(_, { id, change }){
      const cartItem = cart.find(val => val.id === +id);
      if(!cartItem){
        throw new Error("Product not found in cart!");
      }
      if (change === 'up') {
        cartItem.quantity += 1;
      } else if (change === 'down' && cartItem.quantity > 0) {
        cartItem.quantity -= 1;
      }
      return cartItem;
    }
  }
};

module.exports = resolvers;