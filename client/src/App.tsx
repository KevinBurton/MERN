import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navigation/Navbar';
import { MovieList } from './components/Movie/MovieList';
import TheaterList from './components/Theater/TheaterList';
import { CreditCardEntry } from './components/CreditCardEntry/CreditCardEntry';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Route path='/' exact component={MovieList} />
      <Route path='/movies' component={MovieList} />
      <Route path='/theaters' component={TheaterList} />
      <Route path='/credit-card' component={CreditCardEntry} />
    </Router>
  );
}

export default App;
