import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import AddPost from './components/AddPost'
import Loader from './components/Loader'
import Login from './components/Login'
import Main from './components/Main'
import SinglePost from './components/SinglePost'
import useAuth from './hooks/useAuth'

const Routes = () => {
    const {ready, token} = useAuth()

    if (!ready) {
        return <Loader className="mx-auto" />
    }

    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route path="/add-post">
                {!!token 
                    ? <AddPost />
                    : <Redirect to='/login' />
                }
            </Route>
            <Route path="/login">
                {!!token
                    ? <Redirect to='/' />
                    : <Login />
                }
            </Route>
            <Route path='/post/:id'>
                <SinglePost />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default Routes