import React from 'react'
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, AuthContainer, Home, Details, SearchPage, Person } from './components';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:media_type/:id" element={<Details />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
