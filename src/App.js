import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import MenuDetail from './components/MenuDetail';
import Favorites from './components/Favorites';
import Messages from './components/Messages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu/:day" element={<MenuDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/messages" element={<Messages />} />
          {/* optional profile route placeholder */}
          <Route path="/profile" element={<div style={{padding:20}}>Perfil (em construção)</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
