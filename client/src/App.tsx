import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import TheaterList from './components/TheaterList';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Route path='/' exact component={MovieList} />
      <Route path='/movies' component={MovieList} />
      <Route path='/theaters' component={TheaterList} />
    </Router>
  );
}

export default App;
