export const orders = JSON.parse(localStorage.getItem('orders')) || [
  {
    id: '0e3713e6-209f-4bef-a3e2-ca267ad830ea',
    orderTime: '2024-02-27T20:57:02.235Z',
    totalCostCents: 5800,
    products: [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        estimatedDeliveryTime: '2024-03-01T20:57:02.235Z',
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        estimatedDeliveryTime: '2024-03-01T20:57:02.235Z',
      },
    ],
  },
  {
    id: '3d6bbbeb-d430-4ca8-b83c-dd0005f6a934',
    orderTime: '2024-11-29T00:55:48.584Z',
    totalCostCents: 5790,
    products: [
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        estimatedDeliveryTime: '2024-12-02T00:55:48.584Z',
        variation: null,
      },
      {
        productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity: 1,
        estimatedDeliveryTime: '2024-12-06T00:55:48.584Z',
        variation: null,
      },
      {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        estimatedDeliveryTime: '2024-12-06T00:55:48.584Z',
        variation: null,
      },
    ],
  },
];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingItem;
  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingItem = order;
    }
  });
  return matchingItem;
}
