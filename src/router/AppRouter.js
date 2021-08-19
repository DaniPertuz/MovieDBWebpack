import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Favorites from '../components/Favorites';
import Header from '../components/Header';
import Movies from '../components/Movies';
import Series from '../components/Series';

const AppRouter = () => {
    return (
        <Router>
            <Header />
            <div>
                <Switch>
                    <Route exact path="/" component={Movies} />
                    <Route exact path="/series" component={Series} />
                    <Route exact path="/favorites" component={Favorites} />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;