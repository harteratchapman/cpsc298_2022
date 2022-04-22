import {useState, useEffect, useContext} from "react";

import logo from './logo.svg';

import './App.css';
import * as axios from 'axios';

class CpscApi {
    constructor(url) {
      this.url = url;
    }

    get_device_list(device_id) {
        console.log("get_device_list: "+device_id);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        console.log("get_device_sending: "+JSON.stringify(requestOptions));
        //const promise = axios.get(this.url+"/device/?device_id="+device_id, requestOptions);
        const promise = axios.get(this.url+"/device/"+device_id, requestOptions);
        const datePromise = promise.then((response) => response.data);

        return datePromise;
    }

    create_device(serial_number, description) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({'serial_number': serial_number,
                              'description': description })
    };
    console.log("Sending POST request to "+this.url+"/device/42");
    const promise = axios.post(this.url+"/device/42", requestOptions);
    const datePromise = promise.then((response) => response.data);
    return datePromise;
    }

  }


function App() {
  const [cpscapi, setCpscApi] = useState(null);
  const [apiUrl, setAPIUrl] = useState('https://u0kjui3jw6.execute-api.us-west-1.amazonaws.com/default/iot_f')
  const [serialNumber, setSerialNumber] = useState('')
  const [description, setDescription] = useState('')

  const handleSerialNumberChange = event => {
    setSerialNumber(event.target.value);
  }
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    cpscapi.create_device(serialNumber, description).then(data => {
      console.log('create_device done: '+ JSON.stringify(data));
    });
  };
  
  useEffect(() => {
    console.log("Use effect called: " + apiUrl);
    var newcpscapi = new CpscApi(apiUrl);
    setCpscApi(newcpscapi);
    newcpscapi.get_device_list('939').then(data => {
      console.log('get_device_list received: '+ JSON.stringify(data));
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          Serial Number: <input type="text" name="serial_number" onChange={handleSerialNumberChange} value={serialNumber}/><br/>
          Description: <input type="text" name="description" onChange={handleDescriptionChange} value={description}/>
          <button type="submit">
            Create New Device
          </button>
        </form>

      </header>
    </div>
  );
}

export default App;
