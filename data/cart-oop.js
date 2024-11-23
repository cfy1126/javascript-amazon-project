import { validDeliveryOption } from './deliveryOptions.js';

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1',
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2',
        },
      ];
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, updateQuantity) {
      let matchingProduct;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingProduct = cartItem;
        }
      });
      if (!matchingProduct) {
        this.cartItems.push({
          productId,
          quantity: updateQuantity,
          deliveryOptionId: '1',
        });
      } else {
        matchingProduct.quantity += updateQuantity;
      }
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    calculateQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },

    getCartProcut(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      return matchingItem;
    },

    updateQuantity(productId, newQuantity) {
      const cartProduct = this.getCartProcut(productId);
      cartProduct.quantity = newQuantity;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const cartProduct = this.getCartProcut(productId);
      if (!cartProduct) {
        return;
      }
      if (!validDeliveryOption(deliveryOptionId)) {
        return;
      }
      cartProduct.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}
const cart = Cart('cart');
const businessCart = Cart('cart-oop');



console.log(cart);
console.log(businessCart);

console.log(cart instanceof Cart);


