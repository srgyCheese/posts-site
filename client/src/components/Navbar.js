import React from 'react';
import { useHistory } from 'react-router';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const history = useHistory()
    const {logout, token} = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse container">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <div className="nav-link pointer" onClick={() => history.push('/')}>Главная</div>
                    </li>
                    <li className="nav-item active">
                        <div className="nav-link pointer" onClick={() => history.push('/add-post')}>Добавить запись</div>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        {token
                            ? <div className="nav-link pointer" onClick={() => logout()}>Выйти</div>
                            : <div className="nav-link pointer" onClick={() => history.push('/login')}>Вход</div>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;