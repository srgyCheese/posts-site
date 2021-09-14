import { ERRORS, INPUT_LOGIN, LOGIN, LOGOUT, SET_READY } from "./types";

export const login = token => ({
    type: LOGIN,
    payload: { token }
})

export const logout = () => ({
    type: LOGOUT
})

export const inputLogin = login => ({
    type: INPUT_LOGIN,
    payload: { login }
})

export const setErrors = errors => ({
    type: ERRORS,
    payload: { errors }
})

export const setReady = ready => ({
    type: SET_READY,
    payload: { ready }
})