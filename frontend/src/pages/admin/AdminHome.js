import axios from "axios";
import React, { useEffect, useState } from "react";
import userimg from "../../images/user.png";
import { Link } from "react-router-dom";

function AdminHome() {
  const baseURL = "http://127.0.0.1:8000";

  const [users, setUsers] = useState([]);

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // function for fetching the users 
  const fetchUsers = (url) => {
    axios
      .get(url)
      .then((response) => {
        if(response.data)
        setUsers(response.data);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  // function for deleting user 
  const deleteUser = (userId) => {
    axios
      .delete(`${baseURL}/api/user/admin/users/delete/${userId}/`)
      .then((response) => {
        console.log('User deleted successfully', response);
        // Fetch users again after deletion
        fetchUsers(`${baseURL}/api/user/admin/users/`);
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchUsers(`${baseURL}/api/user/admin/users/?search=${query}`);
  };


 // calling the function fetch users , when component re rendered 
  useEffect(() => {
    fetchUsers(baseURL + "/api/user/admin/users/");
  }, []);


  // for search 
  useEffect(() => {
    fetchUsers(`${baseURL}/api/user/admin/users/?search=${searchQuery}`);
  }, [searchQuery]);

  return (
    <>
  <div className="container my-5">
    <h2 className="text-center mb-4">User Details</h2>

    <div className="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        className="form-control"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Link className="btn btn-success" to="user/create">
        Create User
      </Link>
    </div>

    <table className="table table-bordered table-striped table-responsive">
      <thead className="bg-warning text-light">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Active Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center">
              No Users Found Matching Your Criteria
            </td>
          </tr>
        )}
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={
                    user.User_Profile
                      ? user.User_Profile.profile_pic
                      : userimg
                  }
                  className="rounded-circle me-2"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                />
                <div>
                  <p className="fw-bold mb-1">{user.first_name}</p>
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
            </td>

            <td>
              <span className="badge bg-primary rounded-pill">
                {user.phone_number}
              </span>
            </td>
            <td>
              <span
                className={`badge rounded-pill ${
                  user.is_active ? 'bg-success' : 'bg-danger'
                }`}
              >
                {user.is_active ? 'Active' : 'Not Active'}
              </span>
            </td>

            <td>
              <Link
                type="button"
                className="btn btn-link btn-sm fw-bold"
                to={`user/update/${user.id}`}
              >
                Edit
              </Link>
              <button
                  type="button"
                  className="btn btn-link btn-sm fw-bold text-danger"
                  onClick={() => deleteUser(user.id)}
                >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${!prevPage ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => fetchUsers(prevPage)}
          >
            Previous
          </button>
        </li>

        <li className={`page-item ${!nextPage ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => fetchUsers(nextPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</>

  );
}

export default AdminHome;