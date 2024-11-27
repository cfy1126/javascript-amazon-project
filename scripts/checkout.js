import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';

// loadCartFetch();

async function loadPage1() {
  try {
    // throw 'error1';

    // await loadProductsFetch();
    // await loadCartFetch();
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log('Unexpected error. Please try again later.', error);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage1();

// function loadPage2(){
//   return new Promise((resolve)=>{
//     console.log('load page');
//     resolve();
//   })
// }

// console.log(loadPage1());
// console.log(loadPage2());

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   }),
// ]).then((values) => {
//   console.log(values);
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

/*loadProductsFetch().then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  }),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
/*

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve('value2');
      });
    });
  })
  .then((value2) => {
    console.log(value2);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

/*
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
})
*/
