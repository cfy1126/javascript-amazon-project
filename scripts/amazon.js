import { cart, addToCart, calculateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsListHTML = '';
products.forEach((product) => {
  productsListHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
  `;
});
document.querySelector('.js-products-grid').innerHTML = productsListHTML;
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  let timeoutId = 0;
  button.addEventListener('click', (event) => {
    const { productId } = event.target.dataset;
    // 产品数量选择器
    const updateQuantity = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;
    // “Added”消息
    const addedMessageElement = document.querySelector(
      `.js-added-message-${productId}`
    );
    addedMessageElement.classList.add('added-to-cart-visible');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      addedMessageElement.classList.remove('added-to-cart-visible');
    }, 2000);
    // 更新购物车
    addToCart(productId, updateQuantity);
    showCartQuantity();
  });
});
showCartQuantity();
// 显示购物车数量
function showCartQuantity() {
  document.querySelector('.js-cart-quantity').innerText =
    calculateQuantity(cart);
}
