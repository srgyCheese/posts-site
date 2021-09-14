import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { inputLogin, login, setErrors } from '../redux/auth/actions';

const Login = () => {
    useDocumentTitle('Вход')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const submitHandler = async e => {
        e.preventDefault()
        const validationErrors = []

        if (auth.form.login === '') {
            validationErrors.push('Введите логин')
        }

        if (validationErrors.length !== 0) {
            dispatch(setErrors(validationErrors))
            return
        } else {
            dispatch(setErrors(null))
        }

        const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: auth.form.login})
        })

        const data = await res.json()

        const {token} = data

        if (token) {
            localStorage.setItem('token', token)
    
            dispatch(login(token))
        }
    }

    return (
        <div className="container">
            <div className="card mt-5 mx-auto" style={{maxWidth: '500px'}}>
                <div className="card-header">
                    Вход
                </div>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        {auth.form.errors && <div class="alert alert-danger" role="alert">
                                <ul className="m-0">
                                    {auth.form.errors.map(err => (
                                        <li key={err}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <h5 className="card-title">Войдите в аккаунт</h5>
                        <div className="form-group mb-3">
                            <input value={auth.form.login} onChange={e => dispatch(inputLogin(e.target.value))} type="text" placeholder="Введите логин"  className='form-control' />
                        </div>
                        <input type='submit' className="btn btn-primary" value="Войти" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;