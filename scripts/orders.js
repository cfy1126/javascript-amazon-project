import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { addToCart } from '../data/cart.js';
import { renderHeader } from './components/header.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  renderHeader();
  await loadProductsFetch();
  let ordersSummaryHTML = '';
  orders.forEach((orderItem) => {
    const orderTimeString = dayjs(orderItem.orderTime).format('MMMM D');
    ordersSummaryHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orderItem.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.id}</div>
          </div>
        </div>
  
      <div class="order-details-grid">
        ${productsListHTML(orderItem.products, orderItem.id)}
      </div>
    </div>
    `;
  });
  function productsListHTML(orderProducts, orderId) {
    let productsListHTML = '';
    orderProducts.forEach((product) => {
      const matchingProduct = getProduct(product.productId);
      productsListHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}" />
        </div>
  
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">Arriving on: ${dayjs(
            product.estimatedDeliveryTime
          ).format('MMMM D')}</div>
          <div class="product-quantity">Quantity: ${product.quantity}</div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${
            matchingProduct.id
          }">
            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
  
        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${
        matchingProduct.id
      }">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return productsListHTML;
  }
  document.querySelector('.js-orders-grid').innerHTML = ordersSummaryHTML;

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId);
      button.innerHTML = 'Added';
      setTimeout(()=>{
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png" />
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000)
      renderHeader();
    });
  });
}

loadPage();
