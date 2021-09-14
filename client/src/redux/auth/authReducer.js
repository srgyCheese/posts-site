import { ERRORS, INPUT_LOGIN, LOGIN, LOGOUT, SET_READY } from "./types"

const initialState = {
    token: null,
    ready: false,
    form: {
        login: '',
        errors: null
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, token: action.payload.token}
        case LOGOUT:
            return {...initialState, ready: true}
        case INPUT_LOGIN:
            return {...state, form: {...state.form, login: action.payload.login}}
        case ERRORS:
            return {...state, form: {...state.form, errors: action.payload.errors}}
        case SET_READY:
            return {...state, ready: action.payload.ready}
        default:
            return state
    }
}

export default authReducer