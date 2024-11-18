import {
  cart,
  removeFromCart,
  calculateQuantity,
  updateQuantity,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingProduct = product;
    }
  });
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>
          <input class="quantity-input js-quantity-input" data-product-id="${
            matchingProduct.id
          }" type="number" value="${cartItem.quantity}">
          <span class="link-primary save-quantity-link js-save-link js-save-link-${matchingProduct.id}" data-product-id="${
            matchingProduct.id
          }">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    showCheckoutQuantity();
  });
});

showCheckoutQuantity();
function showCheckoutQuantity() {
  document.querySelector(
    '.js-home-link'
  ).innerHTML = `${calculateQuantity()} items`;
}

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove('is-editing-quantity');
    const newQuantity = document.querySelector(
      `.js-cart-item-container-${productId} .quantity-input`
    ).value;
    if(newQuantity>0 && newQuantity<1000){
      updateQuantity(productId, newQuantity);
    }else{
      alert('qiutity should be between 1 and 999');
    }
    document.querySelector(
      `.js-cart-item-container-${productId} .quantity-label`
    ).innerHTML = newQuantity;
    showCheckoutQuantity();
  });
});

document.querySelectorAll('.js-quantity-input').forEach((link) => {
  link.addEventListener('keydown', (event) => {
    const { productId } = link.dataset;
    if(event.key === 'Enter'){
      document.querySelector(`.js-save-link-${productId}`).click();
    }
  });
});

