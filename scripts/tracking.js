import { getProduct, loadProductsFetch } from '../data/products.js';
import { getOrder } from '../data/orders.js';
import { renderHeader } from './components/header.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  renderHeader();
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const order = getOrder(orderId);
  const product = getProduct(productId);

  let estimatedDeliveryTime;
  let quantity;
  order.products.forEach((productItem) => {
    if (productItem.productId === productId) {
      estimatedDeliveryTime = dayjs(productItem.estimatedDeliveryTime).format(
        'dddd, MMMM D'
      );
      quantity = productItem.quantity;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  document.querySelector('.js-order-tracking').innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
  
      <div class="delivery-date">
        Arriving on ${estimatedDeliveryTime}
      </div>
  
      <div class="product-info">
        ${product.name}
      </div>
  
      <div class="product-info">
        Quantity: ${quantity}
      </div>
  
      <img class="product-image" src="${product.image}">
  
      <div class="progress-labels-container">
        <div class="progress-label ${
          percentProgress < 50 ? 'current-status' : ''
        }">
          Preparing
        </div>
        <div class="progress-label ${
          percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''
        }">
          Shipped
        </div>
        <div class="progress-label ${
          percentProgress >= 100 ? 'current-status' : ''
        }">
          Delivered
        </div>
      </div>
  
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
  `;
}

loadPage();
