// A mock function to mimic making an async request for data
export function fetchShopById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`http://localhost:8080/shops/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchShopsByFilters(filter, sort, pagination, admin) {
  let queryString = '';

    if (Object.keys(filter).length === 0) {
      queryString = ''
    } else {
      queryString += `location.city=${filter.city}&`;
      
    }
  
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  if(admin){
    queryString += `admin=true&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
console.log("querystring",queryString)
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/shops?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    // TODO: on server it will only return some info of shop (not password)
    resolve({ data:{shops: data, totalItems: +totalItems} });
  });
}

export function fetchLocations() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/locations');
    const data = await response.json();
    resolve({ data });
  });
}