import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Admin from './pages/Admin';
import Mid from './pages/Mid';
import Login from './pages/Login';


function App() {
  return (
    <div className="app-shell">
      {/* <header className="topbar">
        <h1>Meeting Room Dashboard</h1>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/Home">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header> */}

      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Mid" element={<Mid />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
