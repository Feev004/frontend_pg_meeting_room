import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Admin() {
  const navigate = useNavigate();
  async function backLogin() {
    navigate("/");
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={backLogin}>Exit</button>
    </div>
  );
}

export default Admin;
