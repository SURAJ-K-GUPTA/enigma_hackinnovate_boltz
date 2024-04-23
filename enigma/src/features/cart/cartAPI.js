// A mock function to mimic making an async request for data
export function fetchCart(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/cart?userId='+userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserIdandProductId(userId, productId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`http://localhost:8080/cart?userId=${userId}&productId=${productId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    if(data){}
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}
export function deleteItemFromProductId(userId, productId) {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await fetchItemsByUserIdandProductId(userId, productId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    // resolve({ status: 'success' });
    //   const response = await fetch(`http://localhost:8080/cart?userId=${userId}&productId=${productId}`);
    //   const items = response.data;
    //   for (let item of items) {
    //     await deleteItemFromCart(item.id);
    //   }

      // if (!response.ok) {
      //   // If response status is not ok, reject with the status text
      //   throw new Error(`Failed to delete item from cart. ${response.statusText}`);
      // }

      // No need to parse response data for DELETE requests
      resolve({ data: { userId, productId } });
    } catch (error) {
      // Reject with the error
      reject(error);
    }
  });
}


export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: 'success' });
  });
}
