import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateStirng = calculateDeliveryDate(deliveryOption);
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
    <div class="delivery-date js-delivery-date-${matchingProduct.id}">
      Delivery date: ${dateStirng}
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
      const dateStirng = calculateDeliveryDate(option);
      const priceStirng =
        option.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(option.priceCents)}-Shipping`;
      const isChecked =
        cartItem.deliveryOptionId === option.id ? 'checked' : '';
      deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${option.id}"
      >
        <input type="radio"
          ${isChecked}
          class="delivery-option-input"
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

  document.querySelectorAll('.js-delivery-option').forEach((input) => {
    input.addEventListener('click', () => {
      const { productId, deliveryOptionId } = input.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

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
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      } else {
        alert('qiutity should be between 1 and 999');
        quantityInput.value = cart.find(
          (cartItem) => cartItem.productId === productId
        ).quantity;
      }
    });
  });

  document.querySelectorAll('.quantity-input').forEach((link) => {
    link.addEventListener('keydown', (event) => {
      const { productId } = link.dataset;
      if (event.key === 'Enter') {
        document.querySelector(`.js-save-link-${productId}`).click();
      }
    });
  });
}
