import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import MovieReducer from '../reducers/MovieReducer';
import SerieReducer from '../reducers/SerieReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    movies: MovieReducer,
    series: SerieReducer
});

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
);