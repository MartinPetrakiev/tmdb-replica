import React from 'react'
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, AuthContainer, Home } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="/auth" element={<AuthContainer />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
