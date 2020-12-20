import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailsPage from './routes/RestaurantDetailsPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/restaurants/:id'
            component={RestaurantDetailsPage}
          />
          <Route exact path='/restaurants/:id/update' component={UpdatePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
