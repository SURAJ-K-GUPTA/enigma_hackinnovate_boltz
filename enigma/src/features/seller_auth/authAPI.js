// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function createSeller(sellerData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/shops', {
      method: 'POST',
      body: JSON.stringify(sellerData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of seller (not password)
    resolve({ data });
  });
}

export function updateSeller(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/sellers/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of seller (not password)
    resolve({ data });
  });
}

export function loginSeller(sellerData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/sellers?phoneNumber=${sellerData.phoneNumber}`);
      const data = await response.json();

     // Assuming data is an array, find the seller with the matching phone number
     const matchingSeller = data.find((seller) => seller.phoneNumber === sellerData.phoneNumber);

     if (matchingSeller && matchingSeller.password === sellerData.password) {
       // Resolve with the seller data
       resolve({ data: matchingSeller });
     } else {
      // TODO: on the server, it will only return some info of the seller (not the password)
      reject({ error: 'Unauthorized' });
    }
  } catch (error) {
    // Handle other errors (e.g., network issues, server down)
    reject(error);
  }
});
}

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove seller session info
    resolve({ data: 'success' });
  });
}


