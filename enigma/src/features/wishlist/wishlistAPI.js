// A mock function to mimic making an async request for data
export function fetchWishlist(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
export function addToWishlist(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/wishlist', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchWishlistItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/wishlist?userId='+userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWishlistItemsByUserIdandProductId(userId, productId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`http://localhost:8080/wishlist?userId=${userId}&productId=${productId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateWishlist(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/wishlist/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteWishlistItemFromWishlist(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/wishlist/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    if(data){}
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}
export function deleteWishlistItemFromProductId(userId, productId) {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await fetchWishlistItemsByUserIdandProductId(userId, productId);
    const items = response.data;
    for (let item of items) {
      await deleteWishlistItemFromWishlist(item.id);
    }
    // resolve({ status: 'success' });
    //   const response = await fetch(`http://localhost:8080/wishlist?userId=${userId}&productId=${productId}`);
    //   const items = response.data;
    //   for (let item of items) {
    //     await deleteItemFromWishlist(item.id);
    //   }

      // if (!response.ok) {
      //   // If response status is not ok, reject with the status text
      //   throw new Error(`Failed to delete item from wishlist. ${response.statusText}`);
      // }

      // No need to parse response data for DELETE requests
      resolve({ data: { userId, productId } });
    } catch (error) {
      // Reject with the error
      reject(error);
    }
  });
}


export function resetWishlist(userId) {
  // get all items of user's wishlist - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchWishlistItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteWishlistItemFromWishlist(item.id);
    }
    resolve({ status: 'success' });
  });
}
