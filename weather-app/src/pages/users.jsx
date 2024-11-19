import React, { useEffect, useState } from "react"
import { getUsers } from "../users";
import WeatherNavbar from "../navbar"

function Users() {
  const [users, setUsers] = useState([]); // State to store users data

  // Fetch all users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(); // Get users data
      console.log("Users data:", usersData); // Log the users data to inspect
      setUsers(usersData); // Set the users data in state
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once after the component mounts


  return (
    <div className="users">
      <WeatherNavbar />
      <div id="displayUsers">
        <h2>Users List</h2>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} {user.surname} - {user.email} - {user.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>

  );
}

export default Users;
