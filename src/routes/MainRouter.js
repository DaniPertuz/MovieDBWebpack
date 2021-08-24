import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Movies from '../components/Movies';
import Series from '../components/Series';
import Header from '../components/Header';
import Favorites from '../components/Favorites';

const MainRouter = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route
                    exact path="/"
                    component={Movies}
                />
                <Route
                    exact path="/series"
                    component={Series}
                />
                <Route
                    exact path="/favorites"
                    component={Favorites}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default MainRouter;