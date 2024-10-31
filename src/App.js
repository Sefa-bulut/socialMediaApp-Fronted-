import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import NavBar from './components/NavBar/NavBar';
import Auth from './components/Auth/Auth';

function App() {
  
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users/:userId" element={<User/>}/>
          <Route path="/auth" element= {localStorage.getItem("currentUser") !=null ? <Navigate  to="/"/> :<Auth/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
