import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="https://u0kjui3jw6.execute-api.us-west-1.amazonaws.com/default/iot_f" method="GET">
          <input type="text" name="search_query" />
          <button type="submit">
            Submit
          </button>
        </form>

      </header>
    </div>
  );
}

export default App;
