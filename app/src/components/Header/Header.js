import React, { Component } from 'react';
import style from './Header.scss';
class Header extends Component {
    render() {
        return (
            <div className={style.header}>
                <a href="#default" className={style.logo}>Quiz</a>
                <div className={style.headerRight}>
                    <a className={style.active} href="#home">My account</a>
                        <a href="#contact">Notifications</a>
                        <a href="#about">Log out</a>
                    </div>
                </div>
        );
    }
}

export default Header;
