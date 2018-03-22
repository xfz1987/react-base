import React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import MainStore from './stores/index.js'; 
import './common/styles/main.css';
import http from './common/utils/http.js';
window.http = http;

@observer
class App extends React.Component {
    render() {
        return (
          <div>
             <h1 onClick={()=>{alert(111)}}>{MainStore.user.name}</h1>
             <div className="testImg"></div>
             <img src={require('./common/images/test.png')} />
          </div>
        )
    }
}

render(
    <App />,
    document.getElementById('app')
);