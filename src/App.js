import './App.scss';
import Main from './components/Main';

function App() {
    window.$favorites = [];
    return (
        <div className="app">
            <Main />
        </div>
    );
}

export default App;