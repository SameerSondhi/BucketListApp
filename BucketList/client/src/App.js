import React from 'react';
import Places from './components/Places'
import AddPlace from './components/AddPlace'
import PlaceDetail from './components/PlaceDetail'
import PlaceUpdate from './components/PlaceUpdate'
import LoginReg from './components/LoginReg';
import NavBar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
          <Route path="/" element={<LoginReg />} />
          <Route path="/places" element={<Places />} />
          <Route path="/createplace" element={<AddPlace />} />
          <Route path="/details/places/:id" element={<PlaceDetail />} />
          <Route path="/update/places/:id" element={<PlaceUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
