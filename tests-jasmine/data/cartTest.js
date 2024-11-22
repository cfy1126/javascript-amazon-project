import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    // 不改变真实代码设置的本地存储
    spyOn(localStorage, 'setItem');
    // 模拟真实代码设置的本地存储，返回空数组
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    // 检查上面的代码调用了多少次localStorage.setItem
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    // 不改变真实代码设置的本地存储
    spyOn(localStorage, 'setItem');
    // 模拟真实代码设置的本地存储，返回空数组
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    // 检查上面的代码调用了多少次localStorage.setItem
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});
