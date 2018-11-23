import React, { Component } from 'react';
import Header from '../../components/Header';
import Sidebar from '../Sidebar';

class Admin extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar/>
            </div>
        );
    }
}

export default Admin;
