// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/users?phoneNumber=${userData.phoneNumber}`);
      const data = await response.json();

     // Assuming data is an array, find the user with the matching phone number
     const matchingUser = data.find((user) => user.phoneNumber === userData.phoneNumber);

     if (matchingUser && matchingUser.password === userData.password) {
       // Resolve with the user data
       resolve({ data: matchingUser });
     } else {
      // TODO: on the server, it will only return some info of the user (not the password)
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
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}


