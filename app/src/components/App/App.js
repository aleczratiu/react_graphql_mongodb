import React, { Component } from 'react';
import { renderQrImage } from '../../utils/generateQR';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Are you lost?</h1>
                {renderQrImage('https://7cf2a576.ngrok.io/eventdisplay/5bf8cbf1dac5ac00327cd2ed', 350)}
            </div>
        );
    }
}

export default App;
