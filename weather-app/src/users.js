function getUsers() {
  const API_URL = 'http://localhost:3000/api/v1/users'; // API endpoint for fetching users

  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON data from the response
    })
    .then((data) => {
      console.log('Fetched users:', data); // Log fetched users data to inspect it
      return Array.isArray(data) ? data : []; // Ensure it's always an array
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      return []; // Return an empty array on error
    });
}

export { getUsers };
