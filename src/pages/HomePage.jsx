import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  async function backLogin() {
    navigate("/");
  }
  return (
    <section className="card">
      <h2>Welcome to the meeting room</h2>
      <p>Book rooms, manage schedules, and keep your team aligned.</p>
      <button onClick={backLogin}>Reserve a room</button>
    </section>
  );
}

export default HomePage;
