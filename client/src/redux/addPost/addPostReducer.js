import { EditorState } from "draft-js"
import { ERRORS, INPUT_FIELD, CLEAR } from "./types"

const initialState = {
    title: '',
    content: EditorState.createEmpty(),
    errors: null
}

const addPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_FIELD:
            return {...state, [action.payload.field]: action.payload.content}
        case ERRORS:
            return {...state, errors: action.payload.errors}
        case CLEAR:
            return initialState
        default:
            return state
    }
}

export default addPostReducer