import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Unitee from './pages/Unitee';
import Admin from './Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Unitee />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
