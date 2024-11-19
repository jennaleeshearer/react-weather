// Fetch all users from the API
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

// Fetch the currently logged-in user's data
async function getLoggedInUser() {
  const API_URL = 'http://localhost:3000/api/v1/me';

  try {
    const response = await fetch(API_URL + "?uid=" + localStorage.getItem('authToken'), {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch logged-in user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    throw error;
  }
}

// Export the functions
export { getUsers, getLoggedInUser };
