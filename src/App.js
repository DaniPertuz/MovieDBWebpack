import './App.scss';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';

function App() {
    localStorage.setItem('favorites', JSON.stringify([]));
    return (
        <Provider store={store}>
            <div className="app">
                <AppRouter />
            </div>
        </Provider>
    );
}

export default App;