import React, { Component } from 'react';
import { renderQrImage } from '../../utils/generateQR';

class App extends Component {

    render() {
        return (
            <div>
                <h1>App</h1>
                {renderQrImage('Hello World!', 350)}
            </div>
        );
    }
}

export default App;
