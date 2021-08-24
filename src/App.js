import { Provider } from 'react-redux';
import './App.scss';
import Main from './components/Main';
import { store } from './redux/store/store';

function App() {
    window.$favorites = [];
    return (
        <Provider store={store}>
            <div className="app">
                <Main />
            </div>
        </Provider>
    );
}

export default App;