import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch("http://192.168.201.43:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/Home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ Server ไม่ได้");
    }
  }

  return (
    <div className="login-box">
      <h1>Login</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className="footer">
        Don't have an account?
        <a href="#">Register</a>
      </div>
    </div>
  );
}

export default Login;
