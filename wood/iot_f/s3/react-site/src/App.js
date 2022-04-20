import {useState, useEffect, useContext} from "react";

import logo from './logo.svg';

import './App.css';

const axios = import('axios');

class CpscApi {
    constructor(url) {
      this.url = url;
    }

    get_device_list() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: '1234' })
        };
        axios.get(this.url)
        .then(response => this.setState({ totalReactPackages: response.data.total }));
    }
  }


function App() {
  const [apiUrl, setAPIUrl] = useState('https://u0kjui3jw6.execute-api.us-west-1.amazonaws.com/default/iot_f')

  useEffect(() => {
    console.log("Use effect called: " + apiUrl);
    var cpscapi = new CpscApi(apiUrl)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form action="https://u0kjui3jw6.execute-api.us-west-1.amazonaws.com/default/iot_f" method="POST">
          Device ID: <input type="text" name="device_id" />
          <button type="submit">
            Submit
          </button>
        </form>

      </header>
    </div>
  );
}

export default App;
