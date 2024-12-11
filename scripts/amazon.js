import { addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { renderHeader, handleSearchButtonClick } from './components/header.js';

renderHeader();
handleSearchButtonClick();
loadProducts(renderProductsGrid);

export function renderProductsGrid() {
  let productsListHTML = '';
  const url = new URL(window.location.href);
  const searchParam = url.searchParams.get('search');
  let filteredProducts = products;

  if(searchParam){
    filteredProducts = products.filter((product)=>{
      let matchingKeyword = false;
      product.keywords.forEach((keyword)=>{
        if(keyword.toLowerCase().includes(searchParam.toLowerCase())){
          matchingKeyword = true;
        }
      });
      return product.name.toLowerCase().includes(searchParam.toLowerCase()) || matchingKeyword;
    })
  }
  filteredProducts.forEach((product) => {
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
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
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
  
  
            ${product.extraInfoHTML()}
  
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
      const quantitySelect = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const updateQuantity = Number(quantitySelect.value);
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
      renderHeader();
    });
  });
}
