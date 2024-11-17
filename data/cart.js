export const cart = [];

export function addToCart(productId) {
  let productIndex = -1;
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart[index].quantity++;
      productIndex = index;
    }
  });
  if (productIndex === -1) {
    cart.push({
      productId,
      quantity: 1,
    });
  }
}