import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Admin() {
  const navigate = useNavigate();
  async function backLogin() {
    navigate("/");
  }

  return (
    <>
      <header data-bs-theme="dark">
      <div class="text-bg-dark collapse" id="navbarHeader" style>
        {/* <div class="text-bg-dark collapse show" id="navbarHeader" style> */}
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4>About</h4>
              <p class="text-body-secondary">
                Add some information about the album below, the author, or any
                other background context. Make it a few sentences long so folks
                can pick up some informative tidbits. Then, link them off to
                some social networking sites or contact information.
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4>Page</h4>
              <ul class="list-unstyled">
                <li><a class='text-white' href='/carousel'>Carousel</a></li>
                <li><a class='text-white' href='/grid'>Grid</a></li>
                <li>
                  <a class='text-white' href='/cheatsheet'>Cheatsheet</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a class='navbar-brand d-flex align-items-center' href='/'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              aria-hidden="true"
              class="me-2"
              viewBox="0 0 24 24"
            >
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              ></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <strong>profile</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
      <div>
        <div style={{ padding: "20px" }}>
          <h2>Meeting Room</h2>

          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Name</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.r_id}>
                  <td>{room.r_id}</td>
                  <td>{room.r_name}</td>
                  <td>{room.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={backLogin}>Exit</button>
      </div>
        </>
  );
}

export default Admin;
