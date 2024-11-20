import {
  cart,
  removeFromCart,
  calculateQuantity,
  updateQuantity,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
    <div class="delivery-date js-delivery-date-${
      matchingProduct.id
    }" data-product-id="${matchingProduct.id}">
      
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
          <input class="quantity-input js-quantity-input-${
            matchingProduct.id
          }" data-product-id="${matchingProduct.id}" type="number" value="${
    cartItem.quantity
  }">
          <span class="link-primary save-quantity-link js-save-link js-save-link-${
            matchingProduct.id
          }" data-product-id="${matchingProduct.id}">Save</span>
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
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateStirng = deliveryDate.format('dddd, MMMM D');
    const priceStirng =
      option.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(option.priceCents)}-Shipping`;
    const isChecked = cartItem.deliveryOptionId === option.id ? 'checked' : '';
    deliveryOptionsHTML += `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked}
          data-delivery-date="${dateStirng}"
          data-product-id="${matchingProduct.id}"
          class="delivery-option-input js-delivery-option-input-${matchingProduct.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateStirng}
          </div>
          <div class="delivery-option-price">
            ${priceStirng}
          </div>
        </div>
      </div>
`;
  });
  return deliveryOptionsHTML;
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.delivery-date').forEach((data) => {
  const { productId } = data.dataset;
  const shippingRadio = document.querySelector(
    `.js-delivery-option-input-${productId}:checked`
  );
  const { deliveryDate } = shippingRadio.dataset;
  data.innerHTML = `Delivery date: ${deliveryDate}`;
});

document.querySelectorAll('.delivery-option-input').forEach((input) => {
  input.addEventListener('change', () => {
    const { productId, deliveryDate } = input.dataset;
    document.querySelector(
      `.js-delivery-date-${productId}`
    ).innerHTML = `Delivery date: ${deliveryDate}`;
  });
});

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
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    if (newQuantity > 0 && newQuantity < 1000) {
      updateQuantity(productId, newQuantity);
    } else {
      alert('qiutity should be between 1 and 999');
      quantityInput.value = cart.find(
        (cartItem) => cartItem.productId === productId
      ).quantity;
      return;
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
    if (event.key === 'Enter') {
      document.querySelector(`.js-save-link-${productId}`).click();
    }
  });
});
